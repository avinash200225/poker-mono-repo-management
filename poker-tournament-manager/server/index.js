const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb } = require('./db/init');
const { syncUsers, syncRoundTransactions, processRoundRecords, startFileWatcher, DEFAULT_PATHS } = require('./services/syncService');
const { login, middleware: authMiddleware, ensureSeedAdmin } = require('./services/authService');

// Dr. Neau formula: Points = LN((TotalPlayers + 1) / FinishPosition)
function drNeauPoints(totalPlayers, position) {
  if (!position || position < 1) return null;
  return Math.log((totalPlayers + 1) / position);
}

// Dr. Neau reworked: prize-pool/avg-spend aware
// Points = (Prizemoney / √(Players · (Buy-in + Rebuys + Add-ons))) · (1 / (1 + Rank))
function drNeauReworkedPoints(prizePool, players, totalSpend, position) {
  if (!position || position < 1 || !players || players < 1) return null;
  const spend = totalSpend || (players * 100); // fallback
  const denom = Math.sqrt(players * spend);
  if (denom <= 0) return null;
  return (prizePool / denom) * (1 / (1 + position));
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve built React app
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuild));

// --- Public API (no auth) ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'poker-tournament-manager' });
});

// Auth login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const result = login(email, password);
  if (!result) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.json(result);
});

// --- Session API (public - for tablet name entry) ---

// Get active tournament so tablets know which tournament to register for
app.get('/api/session/active-tournament', (req, res) => {
  const db = getDb();
  const row = db.prepare(`
    SELECT id, name, status, starting_chips FROM tournaments
    WHERE status = 'active'
    ORDER BY event_date DESC
    LIMIT 1
  `).get();
  if (!row) return res.status(404).json({ error: 'No active tournament' });
  res.json(row);
});

// Register player name/username from tablet (first screen before proceeding)
// Body: { tournament_id, external_uid, display_name, client_ip? }
app.post('/api/session/register-player', (req, res) => {
  const db = getDb();
  const { tournament_id, external_uid, display_name, client_ip } = req.body || {};
  const name = (display_name || '').trim();
  if (!tournament_id || !external_uid || !name) {
    return res.status(400).json({ error: 'tournament_id, external_uid, and display_name required' });
  }
  const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournament_id);
  if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
  if (!['draft', 'active'].includes(tournament.status)) {
    return res.status(400).json({ error: 'Tournament is not open for registration' });
  }
  const startingChips = tournament.starting_chips ?? 0;
  try {
    db.exec('BEGIN');
    const upsertPlayer = db.prepare(`
      INSERT INTO players (external_uid, client_ip, display_name, updated_at)
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(external_uid) DO UPDATE SET
        client_ip = COALESCE(?, client_ip),
        display_name = excluded.display_name,
        updated_at = datetime('now')
    `);
    upsertPlayer.run(external_uid, client_ip || null, name, client_ip || null);
    const player = db.prepare('SELECT id FROM players WHERE external_uid = ?').get(external_uid);
    const existingReg = db.prepare('SELECT id FROM tournament_registrations WHERE tournament_id = ? AND player_id = ?')
      .get(tournament_id, player.id);
    const insertReg = db.prepare(`
      INSERT OR IGNORE INTO tournament_registrations (tournament_id, player_id, starting_chips, current_chips)
      VALUES (?, ?, ?, ?)
    `);
    insertReg.run(tournament_id, player.id, startingChips, startingChips);
    const reg = db.prepare('SELECT id FROM tournament_registrations WHERE tournament_id = ? AND player_id = ?')
      .get(tournament_id, player.id);
    if (reg && !existingReg) {
      db.prepare(`
        INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes)
        VALUES (?, ?, ?, 'starting', 'Tablet check-in')
      `).run(tournament_id, reg.id, startingChips);
    }
    const upsertCheckin = db.prepare(`
      INSERT INTO session_player_checkins (tournament_id, player_id, external_uid, display_name, client_ip)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(tournament_id, external_uid) DO UPDATE SET
        display_name = excluded.display_name,
        client_ip = excluded.client_ip,
        checked_in_at = datetime('now')
    `);
    upsertCheckin.run(tournament_id, player.id, external_uid, name, client_ip || null);
    db.exec('COMMIT');
    res.json({ ok: true, player_id: player.id, display_name: name });
  } catch (e) {
    db.exec('ROLLBACK');
    res.status(500).json({ error: e.message });
  }
});

// Protected routes - skip auth for health, login, and session (tablet registration)
app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path.startsWith('/auth') || req.path.startsWith('/session')) return next();
  return authMiddleware(req, res, next);
});

// --- API (protected) ---

// Players
app.get('/api/players', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT p.*, s.hands_played, s.hands_won, s.total_profit, s.biggest_pot_won, s.favorite_hand, s.last_played_at
    FROM players p
    LEFT JOIN player_stats s ON s.player_uid = p.external_uid
    ORDER BY p.display_name
  `).all();
  res.json(rows);
});

app.get('/api/players/:id', (req, res) => {
  const db = getDb();
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });

  const stats = db.prepare('SELECT * FROM player_stats WHERE player_uid = ?').get(player.external_uid);
  const winningHands = db.prepare(`
    SELECT wh.*, h.timestamp as hand_timestamp, h.game_name
    FROM winning_hands wh
    JOIN hands h ON h.id = wh.hand_id
    WHERE wh.player_uid = ?
    ORDER BY wh.pot_amount DESC
    LIMIT 50
  `).all(player.external_uid);

  res.json({ ...player, stats, winningHands });
});

app.put('/api/players/:id', (req, res) => {
  const db = getDb();
  const { display_name, email, phone, notes } = req.body;
  db.prepare(`
    UPDATE players SET display_name = ?, email = ?, phone = ?, notes = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(display_name ?? '', email ?? '', phone ?? '', notes ?? '', req.params.id);
  res.json({ ok: true });
});

// Tournaments
app.get('/api/tournaments', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT t.*, COUNT(tr.id) as registered_count
    FROM tournaments t
    LEFT JOIN tournament_registrations tr ON tr.tournament_id = t.id
    GROUP BY t.id
    ORDER BY t.event_date DESC
  `).all();
  res.json(rows);
});

app.post('/api/tournaments', (req, res) => {
  const db = getDb();
  const { name, event_date, status, buy_in, starting_chips, blind_structure, tables_count, max_players } = req.body;
  const result = db.prepare(`
    INSERT INTO tournaments (name, event_date, status, buy_in, starting_chips, blind_structure, tables_count, max_players)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name || 'New Tournament',
    event_date || new Date().toISOString().slice(0, 10),
    status || 'draft',
    buy_in ?? 0,
    starting_chips ?? 0,
    blind_structure ? JSON.stringify(blind_structure) : null,
    tables_count ?? 1,
    max_players ?? null
  );
  res.json({ id: result.lastInsertRowid, ok: true });
});

app.put('/api/tournaments/:id', (req, res) => {
  const db = getDb();
  const { name, event_date, status, buy_in, starting_chips, blind_structure, tables_count, max_players } = req.body;
  db.prepare(`
    UPDATE tournaments SET
      name = COALESCE(?, name),
      event_date = COALESCE(?, event_date),
      status = COALESCE(?, status),
      buy_in = COALESCE(?, buy_in),
      starting_chips = COALESCE(?, starting_chips),
      blind_structure = COALESCE(?, blind_structure),
      tables_count = COALESCE(?, tables_count),
      max_players = COALESCE(?, max_players),
      updated_at = datetime('now')
    WHERE id = ?
  `).run(name, event_date, status, buy_in, starting_chips,
    blind_structure ? JSON.stringify(blind_structure) : null,
    tables_count, max_players, req.params.id);
  res.json({ ok: true });
});

app.get('/api/tournaments/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Tournament not found' });
  res.json(row);
});

app.delete('/api/tournaments/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM tournament_registrations WHERE tournament_id = ?').run(req.params.id);
  db.prepare('UPDATE hands SET tournament_id = NULL WHERE tournament_id = ?').run(req.params.id);
  db.prepare('DELETE FROM tournaments WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// Tournament registrations
app.get('/api/tournaments/:id/registrations', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT tr.*, p.display_name, p.external_uid, p.client_ip
    FROM tournament_registrations tr
    JOIN players p ON p.id = tr.player_id
    WHERE tr.tournament_id = ?
    ORDER BY COALESCE(tr.position, 9999) ASC, tr.seat_number
  `).all(req.params.id);
  res.json(rows);
});

app.post('/api/tournaments/:id/registrations', (req, res) => {
  const db = getDb();
  const { player_id, seat_number, table_number, starting_chips } = req.body;
  const chips = starting_chips ?? 0;
  try {
    db.prepare(`
      INSERT OR REPLACE INTO tournament_registrations (tournament_id, player_id, seat_number, table_number, starting_chips, current_chips)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(req.params.id, player_id, seat_number ?? null, table_number ?? null, chips, chips);
    const reg = db.prepare('SELECT id FROM tournament_registrations WHERE tournament_id = ? AND player_id = ?').get(req.params.id, player_id);
    if (reg) {
      db.prepare(`
        INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes)
        VALUES (?, ?, ?, 'starting', 'Initial buy-in')
      `).run(req.params.id, reg.id, chips);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/tournaments/:id/registrations/:regId', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM tournament_registrations WHERE id = ? AND tournament_id = ?').run(req.params.regId, req.params.id);
  res.json({ ok: true });
});

// Update registration: chips, elimination, position
app.patch('/api/tournaments/:id/registrations/:regId', (req, res) => {
  const db = getDb();
  const { current_chips, eliminated_at_round, position, reason } = req.body;
  const reg = db.prepare('SELECT * FROM tournament_registrations WHERE id = ? AND tournament_id = ?').get(req.params.regId, req.params.id);
  if (!reg) return res.status(404).json({ error: 'Registration not found' });

  if (current_chips != null) {
    db.prepare('UPDATE tournament_registrations SET current_chips = ? WHERE id = ?').run(current_chips, req.params.regId);
    db.prepare(`
      INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes)
      VALUES (?, ?, ?, ?, ?)
    `).run(req.params.id, req.params.regId, current_chips, reason || 'hand_result', req.body.notes || '');
  }
  if (eliminated_at_round != null) {
    db.prepare('UPDATE tournament_registrations SET eliminated_at_round = ? WHERE id = ?').run(eliminated_at_round, req.params.regId);
  }
  if (position != null) {
    const totalPlayers = db.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(req.params.id).n;
    const points = drNeauPoints(totalPlayers, position);
    const t = db.prepare('SELECT buy_in, starting_chips, total_prize_pool, total_rebuys, total_addons FROM tournaments WHERE id = ?').get(req.params.id);
    const buyIn = t?.buy_in ?? 0;
    const totalSpend = (totalPlayers * buyIn) + (t?.total_rebuys ?? 0) + (t?.total_addons ?? 0);
    const prizePool = t?.total_prize_pool ?? totalSpend;
    const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend, position);
    db.prepare('UPDATE tournament_registrations SET position = ?, dr_neau_points = ?, dr_neau_reworked_points = ? WHERE id = ?')
      .run(position, points, reworkedPoints, req.params.regId);
  }
  res.json({ ok: true });
});

// Tables (physical tables with tablet serial numbers)
app.get('/api/tables', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM poker_tables ORDER BY name').all();
  res.json(rows);
});

app.post('/api/tables', (req, res) => {
  const db = getDb();
  const { serial_number, name, status, location, tablet_ips, notes } = req.body;
  const result = db.prepare(`
    INSERT INTO poker_tables (serial_number, name, status, location, tablet_ips, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    serial_number || '',
    name || 'Table',
    status || 'inactive',
    location ?? '',
    tablet_ips ? JSON.stringify(Array.isArray(tablet_ips) ? tablet_ips : [tablet_ips]) : null,
    notes ?? ''
  );
  res.json({ id: result.lastInsertRowid, ok: true });
});

app.put('/api/tables/:id', (req, res) => {
  const db = getDb();
  const { serial_number, name, status, location, tablet_ips, notes } = req.body;
  db.prepare(`
    UPDATE poker_tables SET
      serial_number = COALESCE(?, serial_number),
      name = COALESCE(?, name),
      status = COALESCE(?, status),
      location = COALESCE(?, location),
      tablet_ips = ?,
      notes = COALESCE(?, notes),
      updated_at = datetime('now')
    WHERE id = ?
  `).run(
    serial_number,
    name,
    status,
    location,
    tablet_ips ? JSON.stringify(Array.isArray(tablet_ips) ? tablet_ips : [tablet_ips]) : null,
    notes,
    req.params.id
  );
  res.json({ ok: true });
});

app.delete('/api/tables/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM tournament_tables WHERE table_id = ?').run(req.params.id);
  db.prepare('DELETE FROM poker_tables WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// Assign tables to tournament
app.get('/api/tournaments/:id/tables', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT tt.*, pt.serial_number, pt.name as table_name, pt.status
    FROM tournament_tables tt
    JOIN poker_tables pt ON pt.id = tt.table_id
    WHERE tt.tournament_id = ?
    ORDER BY tt.table_number
  `).all(req.params.id);
  res.json(rows);
});

app.post('/api/tournaments/:id/tables', (req, res) => {
  const db = getDb();
  const { table_id, table_number } = req.body;
  try {
    db.prepare(`
      INSERT INTO tournament_tables (tournament_id, table_id, table_number)
      VALUES (?, ?, ?)
    `).run(req.params.id, table_id, table_number ?? null);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Bulk assign tables: { table_ids: [1,2,3] } - selects which tables run this tournament
app.post('/api/tournaments/:id/tables/bulk', (req, res) => {
  const db = getDb();
  const { table_ids } = req.body || {};
  const ids = Array.isArray(table_ids) ? table_ids : [];
  db.prepare('DELETE FROM tournament_tables WHERE tournament_id = ?').run(req.params.id);
  for (let i = 0; i < ids.length; i++) {
    db.prepare(`
      INSERT INTO tournament_tables (tournament_id, table_id, table_number) VALUES (?, ?, ?)
    `).run(req.params.id, ids[i], i + 1);
  }
  res.json({ ok: true });
});

app.delete('/api/tournaments/:id/tables/:ttId', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM tournament_tables WHERE id = ? AND tournament_id = ?').run(req.params.ttId, req.params.id);
  res.json({ ok: true });
});

// Session check-ins (who entered name on tablet for this tournament)
app.get('/api/tournaments/:id/session-checkins', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT spc.id, spc.tournament_id, spc.player_id, spc.external_uid, spc.display_name, spc.client_ip, spc.checked_in_at, spc.created_at
    FROM session_player_checkins spc
    JOIN players p ON p.id = spc.player_id
    WHERE spc.tournament_id = ?
    ORDER BY spc.checked_in_at DESC
  `).all(req.params.id);
  res.json(rows);
});

// Chip history / progression for a registration
app.get('/api/tournaments/:id/registrations/:regId/progression', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM chip_history
    WHERE tournament_id = ? AND registration_id = ?
    ORDER BY created_at
  `).all(req.params.id, req.params.regId);
  res.json(rows);
});

// Hands / Game history
app.get('/api/hands', (req, res) => {
  const db = getDb();
  const tournamentId = req.query.tournament_id;
  const playerUid = req.query.player_uid;
  let sql = `
    SELECT h.*, COUNT(hp.id) as players_count
    FROM hands h
    LEFT JOIN hand_players hp ON hp.hand_id = h.id
    WHERE 1=1
  `;
  const params = [];
  if (tournamentId) { sql += ' AND h.tournament_id = ?'; params.push(tournamentId); }
  if (playerUid) {
    sql += ' AND h.id IN (SELECT hand_id FROM hand_players WHERE player_uid = ?)';
    params.push(playerUid);
  }
  sql += ' GROUP BY h.id ORDER BY h.round_id DESC LIMIT 200';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// Leaderboard / top players by profit
app.get('/api/stats/leaderboard', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT p.id, p.display_name, p.external_uid, s.*
    FROM player_stats s
    JOIN players p ON p.external_uid = s.player_uid
    WHERE s.hands_played > 0
    ORDER BY s.total_profit DESC
    LIMIT 20
  `).all();
  res.json(rows);
});

// Most winning hands (best hands by pot size)
app.get('/api/stats/best-hands', (req, res) => {
  const db = getDb();
  const playerUid = req.query.player_uid;
  let sql = `
    SELECT wh.*, p.display_name
    FROM winning_hands wh
    JOIN players p ON p.external_uid = wh.player_uid
  `;
  const params = [];
  if (playerUid) { sql += ' WHERE wh.player_uid = ?'; params.push(playerUid); }
  sql += ' ORDER BY wh.pot_amount DESC LIMIT 50';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// Sync endpoints
app.post('/api/sync/users', (req, res) => {
  const filePath = req.body?.file_path;
  const result = syncUsers(filePath);
  res.json(result);
});

app.post('/api/sync/rounds', (req, res) => {
  const { file_path, tournament_id } = req.body || {};
  const result = syncRoundTransactions(file_path, tournament_id);
  res.json(result);
});

// Ingest round transactions directly (for game simulator)
app.post('/api/sync/rounds/ingest', (req, res) => {
  const { tournament_id, records } = req.body || {};
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'records array required' });
  }
  const tournamentId = tournament_id ? Number(tournament_id) : null;
  const result = processRoundRecords(records, tournamentId);
  res.json(result);
});

app.get('/api/sync/status', (req, res) => {
  res.json({
    holdem_home: DEFAULT_PATHS.holdemHome,
    conf_holdem: DEFAULT_PATHS.confHoldem,
    conf_users: DEFAULT_PATHS.confUsers,
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  ensureSeedAdmin();
  console.log(`Poker Tournament Manager running at http://localhost:${PORT}`);
  console.log('Default login: admin@tournament.local / admin123');
  // Optional: watch holdem folder for new rounds
  const watchEnv = process.env.WATCH_HOLDEM_PATH;
  if (watchEnv) {
    startFileWatcher(watchEnv);
    console.log('[Sync] File watcher started on', watchEnv);
  }
});
