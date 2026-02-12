const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb } = require('./db/init');
const { syncUsers, syncRoundTransactions, startFileWatcher, DEFAULT_PATHS } = require('./services/syncService');
const { login, middleware: authMiddleware, ensureSeedAdmin } = require('./services/authService');
const { drNeauPoints, drNeauReworkedPoints } = require('./utils/points');

const app = express();
const PORT = process.env.PORT || 3001;
const clientBuild = path.join(__dirname, '..', 'client', 'dist');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
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

// Table lookup by tablet IP: which table/seat is this tablet assigned to?
app.get('/api/session/table-info', (req, res) => {
  const db = getDb();
  const clientIp = req.query.client_ip || req.query.ip;
  if (!clientIp) return res.status(400).json({ error: 'client_ip query param required' });
  const row = db.prepare(`
    SELECT tr.tournament_id, tr.table_number, tr.seat_number, tr.current_chips, tr.status, t.name as tournament_name
    FROM tournament_registrations tr
    JOIN tournaments t ON t.id = tr.tournament_id
    WHERE tr.client_ip = ? AND tr.eliminated_at_round IS NULL AND (tr.status IS NULL OR tr.status = 'active')
    ORDER BY tr.tournament_id DESC
    LIMIT 1
  `).get(clientIp.trim());
  if (!row) return res.status(404).json({ error: 'No table assigned for this tablet IP' });
  res.json({
    tournament_id: row.tournament_id,
    tournament_name: row.tournament_name,
    table_number: row.table_number,
    seat_number: row.seat_number,
    current_chips: row.current_chips,
  });
});

// Protected routes - skip auth for health, login, session (tablet), and simulator setup (for simulation UI)
app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path.startsWith('/auth') || req.path.startsWith('/session') ||
      req.path === '/simulator/setup') return next();
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
  const { name, event_date, status, buy_in, starting_chips, blind_structure, tables_count, max_players,
    total_prize_pool, total_rebuys, total_addons } = req.body;
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
      total_prize_pool = COALESCE(?, total_prize_pool),
      total_rebuys = COALESCE(?, total_rebuys),
      total_addons = COALESCE(?, total_addons),
      updated_at = datetime('now')
    WHERE id = ?
  `).run(name, event_date, status, buy_in, starting_chips,
    blind_structure ? JSON.stringify(blind_structure) : null,
    tables_count, max_players,
    total_prize_pool != null ? Number(total_prize_pool) : null,
    total_rebuys != null ? Number(total_rebuys) : null,
    total_addons != null ? Number(total_addons) : null,
    req.params.id);
  res.json({ ok: true });
});

app.get('/api/tournaments/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Tournament not found' });
  res.json(row);
});

// End tournament: assign final positions by chip rank, mark completed
app.post('/api/tournaments/:id/end', (req, res) => {
  const db = getDb();
  const tid = req.params.id;
  try {
    const t = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tid);
    if (!t) return res.status(404).json({ error: 'Tournament not found' });
    if (t.status === 'completed') return res.status(400).json({ error: 'Tournament already completed' });
    if (t.status === 'cancelled') return res.status(400).json({ error: 'Cannot end cancelled tournament' });

    const totalPlayers = db.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(tid).n;
    if (totalPlayers === 0) {
      db.prepare('UPDATE tournaments SET status = ? WHERE id = ?').run('completed', tid);
      return res.json({ ok: true, status: 'completed' });
    }

    const buyIn = t.buy_in ?? 0;
    const totalSpend = (totalPlayers * buyIn) + (Number(t.total_rebuys) || 0) + (Number(t.total_addons) || 0);
    const prizePool = (t.total_prize_pool != null ? Number(t.total_prize_pool) : null) ?? (totalSpend > 0 ? totalSpend : totalPlayers * Math.max(buyIn, 100));

    const active = db.prepare(`
      SELECT tr.id, tr.current_chips, tr.starting_chips
      FROM tournament_registrations tr
      WHERE tr.tournament_id = ? AND tr.eliminated_at_round IS NULL
        AND (tr.status IS NULL OR tr.status = 'active')
      ORDER BY COALESCE(tr.current_chips, tr.starting_chips, 0) DESC
    `).all(tid);

    let pos = 1;
    for (const reg of active) {
      const points = drNeauPoints(totalPlayers, pos);
      const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend || (totalPlayers * 100), pos);
      db.prepare(`
        UPDATE tournament_registrations
        SET eliminated_at_round = 0, status = 'eliminated', position = ?, dr_neau_points = ?, dr_neau_reworked_points = ?
        WHERE id = ?
      `).run(pos, points, reworkedPoints, reg.id);
      pos++;
    }

    db.prepare('UPDATE tournaments SET status = ? WHERE id = ?').run('completed', tid);
    res.json({ ok: true, status: 'completed' });
  } catch (e) {
    console.error('[End tournament]', e);
    res.status(500).json({ error: e.message || 'Failed to end tournament' });
  }
});

app.delete('/api/tournaments/:id', (req, res) => {
  const db = getDb();
  try {
    db.prepare('DELETE FROM chip_history WHERE tournament_id = ?').run(req.params.id);
    db.prepare('DELETE FROM tournament_registrations WHERE tournament_id = ?').run(req.params.id);
    db.prepare('DELETE FROM session_player_checkins WHERE tournament_id = ?').run(req.params.id);
    db.prepare('DELETE FROM tournament_tables WHERE tournament_id = ?').run(req.params.id);
    db.prepare('UPDATE hands SET tournament_id = NULL WHERE tournament_id = ?').run(req.params.id);
    db.prepare('DELETE FROM tournaments WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Delete failed' });
  }
});

// Tournament registrations
app.get('/api/tournaments/:id/registrations', (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT tr.*, p.display_name, p.external_uid,
      COALESCE(tr.client_ip, p.client_ip) as client_ip
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
  try {
    db.prepare('DELETE FROM tournament_registrations WHERE id = ? AND tournament_id = ?').run(req.params.regId, req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Cash out: save chips, mark cashed_out (player can rejoin later)
app.post('/api/tournaments/:id/registrations/:regId/cash-out', (req, res) => {
  const db = getDb();
  const reg = db.prepare('SELECT * FROM tournament_registrations WHERE id = ? AND tournament_id = ?').get(req.params.regId, req.params.id);
  if (!reg) return res.status(404).json({ error: 'Registration not found' });
  if (reg.eliminated_at_round != null) return res.status(400).json({ error: 'Player already eliminated' });
  const chips = reg.current_chips ?? reg.starting_chips ?? 0;
  db.prepare(`
    UPDATE tournament_registrations SET status = ?, cashed_out_at = datetime('now'), cashed_out_chips = ?, seat_number = NULL, table_number = NULL, client_ip = NULL WHERE id = ?
  `).run('cashed_out', chips, req.params.regId);
  res.json({ ok: true, chips_saved: chips });
});

// Rejoin: set active, assign table/seat, update client_ip
app.post('/api/tournaments/:id/registrations/:regId/rejoin', (req, res) => {
  const db = getDb();
  const { seat_number, table_number, client_ip } = req.body || {};
  const reg = db.prepare('SELECT * FROM tournament_registrations WHERE id = ? AND tournament_id = ?').get(req.params.regId, req.params.id);
  if (!reg) return res.status(404).json({ error: 'Registration not found' });
  const chips = reg.cashed_out_chips ?? reg.current_chips ?? reg.starting_chips ?? 0;
  db.prepare(`
    UPDATE tournament_registrations SET status = ?, seat_number = ?, table_number = ?, client_ip = ?, current_chips = ? WHERE id = ?
  `).run('active', seat_number ?? null, table_number ?? null, client_ip ?? null, chips, req.params.regId);
  if (reg.player_id && client_ip) {
    db.prepare('UPDATE players SET client_ip = ? WHERE id = ?').run(client_ip, reg.player_id);
  }
  res.json({ ok: true });
});

// Update registration: chips, elimination, position, seat, table, status, client_ip
app.patch('/api/tournaments/:id/registrations/:regId', (req, res) => {
  const db = getDb();
  const { current_chips, eliminated_at_round, position, reason, seat_number, table_number, status, client_ip } = req.body;
  const reg = db.prepare('SELECT * FROM tournament_registrations WHERE id = ? AND tournament_id = ?').get(req.params.regId, req.params.id);
  if (!reg) return res.status(404).json({ error: 'Registration not found' });

  if (current_chips != null) {
    db.prepare('UPDATE tournament_registrations SET current_chips = ? WHERE id = ?').run(current_chips, req.params.regId);
    db.prepare(`
      INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes)
      VALUES (?, ?, ?, ?, ?)
    `).run(req.params.id, req.params.regId, current_chips, reason || 'hand_result', req.body.notes || '');
  }
  if (seat_number !== undefined) {
    db.prepare('UPDATE tournament_registrations SET seat_number = ? WHERE id = ?').run(seat_number, req.params.regId);
  }
  if (table_number !== undefined) {
    db.prepare('UPDATE tournament_registrations SET table_number = ? WHERE id = ?').run(table_number, req.params.regId);
  }
  if (eliminated_at_round != null) {
    db.prepare('UPDATE tournament_registrations SET eliminated_at_round = ?, status = ? WHERE id = ?').run(eliminated_at_round, 'eliminated', req.params.regId);
  }
  if (req.body.status !== undefined) {
    db.prepare('UPDATE tournament_registrations SET status = ? WHERE id = ?').run(req.body.status, req.params.regId);
  }
  if (req.body.client_ip !== undefined) {
    db.prepare('UPDATE tournament_registrations SET client_ip = ? WHERE id = ?').run(req.body.client_ip, req.params.regId);
    const reg2 = db.prepare('SELECT player_id FROM tournament_registrations WHERE id = ?').get(req.params.regId);
    if (reg2) {
      db.prepare('UPDATE players SET client_ip = ? WHERE id = ?').run(req.body.client_ip, reg2.player_id);
    }
  }
  if (position != null && position >= 1) {
    const totalPlayers = db.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(req.params.id).n;
    const points = drNeauPoints(totalPlayers, position);
    const t = db.prepare('SELECT buy_in, starting_chips, total_prize_pool, total_rebuys, total_addons FROM tournaments WHERE id = ?').get(req.params.id);
    const buyIn = t?.buy_in ?? 0;
    const totalSpend = (totalPlayers * buyIn) + (Number(t?.total_rebuys) || 0) + (Number(t?.total_addons) || 0);
    const prizePool = (t?.total_prize_pool != null ? Number(t.total_prize_pool) : null) ?? (totalSpend > 0 ? totalSpend : totalPlayers * Math.max(buyIn, 100));
    const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend || (totalPlayers * 100), position);
    db.prepare('UPDATE tournament_registrations SET position = ?, dr_neau_points = ?, dr_neau_reworked_points = ? WHERE id = ?')
      .run(position, points, reworkedPoints, req.params.regId);
  }
  res.json({ ok: true });
});

// Recalculate points for all eliminated players (fixes missing/wrong points)
app.post('/api/tournaments/:id/recalculate-points', (req, res) => {
  const db = getDb();
  const tid = req.params.id;
  const regs = db.prepare(`
    SELECT id, position FROM tournament_registrations
    WHERE tournament_id = ? AND eliminated_at_round IS NOT NULL
    ORDER BY COALESCE(position, 9999) ASC, id ASC
  `).all(tid);
  const totalPlayers = db.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(tid).n;
  const t = db.prepare('SELECT buy_in, total_prize_pool, total_rebuys, total_addons FROM tournaments WHERE id = ?').get(tid);
  const buyIn = t?.buy_in ?? 0;
  const totalSpend = (totalPlayers * buyIn) + (Number(t?.total_rebuys) || 0) + (Number(t?.total_addons) || 0);
  const prizePool = (t?.total_prize_pool != null ? Number(t.total_prize_pool) : null) ?? (totalSpend > 0 ? totalSpend : totalPlayers * Math.max(buyIn, 100));
  let pos = 1;
  for (const r of regs) {
    const position = r.position != null && r.position >= 1 ? r.position : pos;
    if (r.position == null || r.position < 1) {
      db.prepare('UPDATE tournament_registrations SET position = ? WHERE id = ?').run(position, r.id);
    }
    const points = drNeauPoints(totalPlayers, position);
    const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend || (totalPlayers * 100), position);
    db.prepare('UPDATE tournament_registrations SET position = ?, dr_neau_points = ?, dr_neau_reworked_points = ? WHERE id = ?')
      .run(position, points, reworkedPoints, r.id);
    pos = position + 1;
  }
  res.json({ ok: true, updated: regs.length });
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

// Tournament stats overview
app.get('/api/tournaments/:id/stats', (req, res) => {
  const db = getDb();
  const tid = req.params.id;
  const regs = db.prepare(`
    SELECT current_chips, starting_chips, eliminated_at_round, status
    FROM tournament_registrations WHERE tournament_id = ?
  `).all(tid);
  const active = regs.filter((r) => r.eliminated_at_round == null && r.status !== 'cashed_out');
  const totalChips = active.reduce((s, r) => s + (r.current_chips ?? r.starting_chips ?? 0), 0);
  const hands = db.prepare(`
    SELECT COUNT(*) as n FROM hands WHERE tournament_id = ?
  `).get(tid);
  const chipHistory = db.prepare(`
    SELECT reason, SUM(chips) as total FROM chip_history WHERE tournament_id = ?
    GROUP BY reason
  `).all(tid);
  const rebuys = chipHistory.find((c) => c.reason === 'rebuys')?.total ?? 0;
  const addons = chipHistory.find((c) => c.reason === 'add_on')?.total ?? 0;
  res.json({
    totalChips,
    avgStack: active.length ? Math.round(totalChips / active.length) : 0,
    handsPlayed: hands?.n ?? 0,
    rebuys,
    addons,
    activeCount: active.length,
    eliminatedCount: regs.length - active.length,
  });
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

// Ingest round transactions (for simulation / external sync)
app.post('/api/sync/rounds/ingest', (req, res) => {
  const { tournament_id, records } = req.body || {};
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'records array required' });
  }
  const { processRoundRecords } = require('./services/syncService');
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

// Simulator setup: create tables and players to match tournament's max_players and tables_count
app.post('/api/simulator/setup', (req, res) => {
  const db = getDb();
  const { tournament_id } = req.body || {};
  if (!tournament_id) return res.status(400).json({ error: 'tournament_id required' });
  const tid = Number(tournament_id);
  const t = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tid);
  if (!t) return res.status(404).json({ error: 'Tournament not found' });
  const playerCount = t.max_players ?? 8;
  const tableCount = Math.max(1, t.tables_count ?? 1);
  const chips = t.starting_chips ?? 10000;
  const perTable = Math.ceil(playerCount / tableCount);
  const serials = Array.from({ length: tableCount }, (_, i) => String(70 + (i + 1)));
  for (const serial of serials) {
    if (!db.prepare('SELECT id FROM poker_tables WHERE serial_number = ?').get(serial)) {
      db.prepare('INSERT INTO poker_tables (serial_number, name, status) VALUES (?, ?, ?)').run(serial, `Sim Table ${serial}`, 'active');
    }
  }
  const placeholders = serials.map(() => '?').join(',');
  const tableIds = db.prepare(`SELECT id FROM poker_tables WHERE serial_number IN (${placeholders}) ORDER BY serial_number`).all(...serials).map(r => r.id);
  db.prepare('DELETE FROM tournament_tables WHERE tournament_id = ?').run(tid);
  tableIds.forEach((id, i) => db.prepare('INSERT INTO tournament_tables (tournament_id, table_id, table_number) VALUES (?,?,?)').run(tid, id, i + 1));
  for (let uid = 1; uid <= playerCount; uid++) {
    const u = String(uid);
    db.prepare("INSERT INTO players (external_uid, display_name, updated_at) VALUES (?,?,datetime('now')) ON CONFLICT(external_uid) DO UPDATE SET display_name=excluded.display_name").run(u, `Player ${u}`);
    const p = db.prepare('SELECT id FROM players WHERE external_uid = ?').get(u);
    const tableNum = Math.min(tableCount, Math.ceil(uid / perTable));
    const seatNum = ((uid - 1) % perTable) + 1;
    db.prepare(`
      INSERT INTO tournament_registrations (tournament_id, player_id, starting_chips, current_chips, seat_number, table_number, status)
      VALUES (?,?,?,?,?,?,'active')
      ON CONFLICT(tournament_id, player_id) DO UPDATE SET
        starting_chips=excluded.starting_chips, current_chips=excluded.current_chips, seat_number=excluded.seat_number, table_number=excluded.table_number, status='active'
    `).run(tid, p.id, chips, chips, seatNum, tableNum);
    const reg = db.prepare('SELECT id FROM tournament_registrations WHERE tournament_id = ? AND player_id = ?').get(tid, p.id);
    if (reg) db.prepare('INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes) VALUES (?,?,?,?,?)').run(tid, reg.id, chips, 'starting', 'Simulator setup');
  }
  res.json({ ok: true, tables: tableCount, players: playerCount });
});

// SPA fallback (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

app.listen(PORT, () => {
  ensureSeedAdmin();
  console.log(`Poker Tournament Manager at http://localhost:${PORT}`);
  console.log('Default login: admin@tournament.local / admin123');
  const watchEnv = process.env.WATCH_HOLDEM_PATH;
  if (watchEnv) {
    startFileWatcher(watchEnv);
    console.log('[Sync] File watcher started on', watchEnv);
  }
});
