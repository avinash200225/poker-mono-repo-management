/**
 * Sync service - imports data from poker app JSON files.
 * Can watch ~/holdem/ or conf/jsons/holdem/ for round transactions and users.
 */

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/init');

const DEFAULT_PATHS = {
  holdemHome: path.join(process.env.HOME || '/tmp', 'holdem'),
  confHoldem: path.join(__dirname, '..', '..', '..', 'poker-webapp-server', 'conf', 'jsons', 'holdem'),
  confUsers: path.join(__dirname, '..', '..', '..', 'poker-webapp-server', 'conf', 'jsons', 'users.json'),
};

function parseJsonSafe(str, fallback = []) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function syncUsers(filePath) {
  const candidates = filePath
    ? [path.resolve(filePath)]
    : [
        DEFAULT_PATHS.confUsers,
        path.join(DEFAULT_PATHS.holdemHome, 'users.json'),
      ];
  let fullPath = null;
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      fullPath = p;
      break;
    }
  }
  if (!fullPath) return { count: 0, error: 'users.json not found (tried conf/jsons and ~/holdem)' };

  const db = getDb();
  const content = fs.readFileSync(fullPath, 'utf8');
  const users = parseJsonSafe(content, []);

  const arrayUsers = Array.isArray(users) ? users : [users];
  let count = 0;

  const upsert = db.prepare(`
    INSERT INTO players (external_uid, client_ip, display_name, updated_at)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(external_uid) DO UPDATE SET
      client_ip = excluded.client_ip,
      display_name = COALESCE(NULLIF(trim(players.display_name), ''), excluded.display_name),
      updated_at = datetime('now')
  `);

  for (const u of arrayUsers) {
    const uid = String(u.uid || u.external_uid || '');
    const ip = u.client_ip || u.clientIp || '';
    const name = u.nickname || u.display_name || `Player ${uid}` || `Seat ${uid}`;
    if (!uid) continue;
    try {
      upsert.run(uid, ip, name);
      count++;
    } catch (e) {
      console.warn('Sync user skip:', uid, e.message);
    }
  }

  db.prepare(`INSERT INTO sync_log (source, last_sync_at, records_processed) VALUES ('users', datetime('now'), ?)`).run(count);
  return { count };
}

function processRoundRecords(arrayRecords, tournamentId, db = null) {
  const database = db || getDb();

  const insertHand = database.prepare(`
    INSERT OR IGNORE INTO hands (tournament_id, round_id, table_id, game_name, game_cards, winning_hand, pot_amount, timestamp, raw_game_result)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertHandPlayer = database.prepare(`
    INSERT OR REPLACE INTO hand_players (hand_id, player_uid, seat_id, cards, hand_rank, best_hand, total_bet, win_amount, game_status, is_winner)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertWinningHand = database.prepare(`
    INSERT INTO winning_hands (hand_id, player_uid, hand_rank, hole_cards, best_five, pot_amount, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  let handCount = 0;
  let lastRoundId = 0;

  for (const rec of arrayRecords) {
    if (!rec.roundId && rec.round_id == null) continue;
    const roundId = rec.roundId ?? rec.round_id;
    lastRoundId = Math.max(lastRoundId, roundId);

    let gameResult = null;
    try {
      gameResult = typeof rec.gameResult === 'string' ? JSON.parse(rec.gameResult) : rec.gameResult;
    } catch {
      continue;
    }

    if (!gameResult || !gameResult.seats) continue;

    const gameCards = JSON.stringify(gameResult.gameCards || []);
    const winningHand = Array.isArray(rec.winningHand) ? rec.winningHand.join(', ') : (rec.winningHand || '');
    const potAmount = (gameResult.seats || []).reduce((sum, s) => sum + (s.winAmount || 0), 0) / 2;

    try {
      const res = insertHand.run(
        tournamentId ?? null,
        roundId,
        rec.tableId || rec.table_id || '',
        rec.gameName || rec.game_name || '',
        gameCards,
        winningHand,
        potAmount,
        rec.timestamp || new Date().toISOString(),
        typeof rec.gameResult === 'string' ? rec.gameResult : JSON.stringify(rec.gameResult)
      );
      if (res.changes > 0) handCount++;

      const handId = database.prepare('SELECT id FROM hands WHERE round_id = ?').get(roundId)?.id;
      if (!handId) continue;

      const ensurePlayer = database.prepare(`
        INSERT OR IGNORE INTO players (external_uid, display_name) VALUES (?, ?)
      `);

      for (const seat of gameResult.seats || []) {
        const uid = String(seat.uid || '');
        if (!uid) continue;

        ensurePlayer.run(uid, `Player ${uid}`);

        const handRank = seat.score || seat.hand_rank || 'Folded';
        const cards = JSON.stringify(seat.cards || []);
        const bestHand = JSON.stringify(seat.hand || []);
        const totalBet = (seat.betList || []).reduce((s, b) => s + (b.betValue || b.bet_value || 0), 0);
        const winAmount = seat.winAmount ?? seat.win_amount ?? 0;
        const gameStatus = seat.gameStatus || seat.game_status || '';
        const isWinner = (gameStatus && gameStatus.startsWith('Win-')) ? 1 : 0;

        insertHandPlayer.run(
          handId, uid, seat.id || 0, cards, handRank, bestHand, totalBet, winAmount, gameStatus, isWinner
        );

        if (isWinner && winAmount > 0) {
          insertWinningHand.run(
            handId, uid, handRank, cards, bestHand, winAmount, rec.timestamp || new Date().toISOString()
          );
        }

        // Update tournament registration chips when we have a tournament context (simulation ingest)
        if (tournamentId && (totalBet > 0 || winAmount > 0)) {
          const reg = database.prepare(`
            SELECT tr.id, tr.current_chips FROM tournament_registrations tr
            JOIN players p ON p.id = tr.player_id
            WHERE tr.tournament_id = ? AND p.external_uid = ? AND tr.eliminated_at_round IS NULL AND (tr.status IS NULL OR tr.status = 'active')
          `).get(tournamentId, uid);
          if (reg) {
            const current = reg.current_chips ?? 0;
            const newChips = Math.max(0, current - totalBet + winAmount);
            database.prepare('UPDATE tournament_registrations SET current_chips = ? WHERE id = ?').run(newChips, reg.id);
            database.prepare(`
              INSERT INTO chip_history (tournament_id, registration_id, chips, reason, notes)
              VALUES (?, ?, ?, 'hand_result', ?)
            `).run(tournamentId, reg.id, newChips, `Round ${roundId}`);
            // Auto-eliminate when chips hit 0: first bust = last place (position N), last bust = 2nd, winner = 1st
            if (newChips === 0) {
              const totalPlayers = database.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(tournamentId).n;
              const eliminatedCount = database.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ? AND eliminated_at_round IS NOT NULL').get(tournamentId).n;
              const nextPos = totalPlayers - eliminatedCount;
              const t = database.prepare('SELECT buy_in, total_prize_pool, total_rebuys, total_addons FROM tournaments WHERE id = ?').get(tournamentId);
              const buyIn = t?.buy_in ?? 0;
              const totalSpend = (totalPlayers * buyIn) + (Number(t?.total_rebuys) || 0) + (Number(t?.total_addons) || 0);
              const prizePool = (t?.total_prize_pool != null ? Number(t.total_prize_pool) : null) ?? (totalSpend > 0 ? totalSpend : totalPlayers * Math.max(buyIn, 100));
              const { drNeauPoints, drNeauReworkedPoints } = require('../utils/points');
              const points = drNeauPoints(totalPlayers, nextPos);
              const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend || (totalPlayers * 100), nextPos);
              database.prepare('UPDATE tournament_registrations SET eliminated_at_round = ?, status = ?, position = ?, dr_neau_points = ?, dr_neau_reworked_points = ? WHERE id = ?')
                .run(roundId, 'eliminated', nextPos, points, reworkedPoints, reg.id);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Sync round skip:', roundId, e.message);
    }
  }

  // When only 1 active player remains, crown winner (position 1) and mark tournament completed
  if (tournamentId) {
    const active = database.prepare(`
      SELECT tr.id, tr.player_id FROM tournament_registrations tr
      WHERE tr.tournament_id = ? AND tr.eliminated_at_round IS NULL AND (tr.status IS NULL OR tr.status = 'active')
    `).all(tournamentId);
    if (active.length === 1) {
      const { drNeauPoints, drNeauReworkedPoints } = require('../utils/points');
      const totalPlayers = database.prepare('SELECT COUNT(*) as n FROM tournament_registrations WHERE tournament_id = ?').get(tournamentId).n;
      const t = database.prepare('SELECT buy_in, total_prize_pool, total_rebuys, total_addons FROM tournaments WHERE id = ?').get(tournamentId);
      const buyIn = t?.buy_in ?? 0;
      const totalSpend = (totalPlayers * buyIn) + (Number(t?.total_rebuys) || 0) + (Number(t?.total_addons) || 0);
      const prizePool = (t?.total_prize_pool != null ? Number(t.total_prize_pool) : null) ?? (totalSpend > 0 ? totalSpend : totalPlayers * Math.max(buyIn, 100));
      const points = drNeauPoints(totalPlayers, 1);
      const reworkedPoints = drNeauReworkedPoints(prizePool, totalPlayers, totalSpend || (totalPlayers * 100), 1);
      database.prepare('UPDATE tournament_registrations SET eliminated_at_round = 0, status = ?, position = 1, dr_neau_points = ?, dr_neau_reworked_points = ? WHERE id = ?')
        .run('eliminated', points, reworkedPoints, active[0].id);
      database.prepare('UPDATE tournaments SET status = ? WHERE id = ?').run('completed', tournamentId);
    }
  }

  // Update player stats
  updatePlayerStats(database);

  database.prepare(`
    INSERT INTO sync_log (source, last_round_id, last_sync_at, records_processed)
    VALUES ('round_transactions', ?, datetime('now'), ?)
  `).run(lastRoundId, handCount);

  return { count: handCount, lastRoundId };
}

function syncRoundTransactions(filePath, tournamentId = null) {
  const paths = [
    path.resolve(filePath || path.join(DEFAULT_PATHS.holdemHome, 'roundTransactions.json')),
    path.join(DEFAULT_PATHS.confHoldem, 'roundTransactions.json'),
  ].filter(Boolean);

  let content = null;
  for (const p of paths) {
    if (fs.existsSync(p)) {
      content = fs.readFileSync(p, 'utf8');
      break;
    }
  }

  if (!content) return { count: 0, error: 'roundTransactions.json not found' };

  const records = parseJsonSafe(content, []);
  const arrayRecords = Array.isArray(records) ? records : [records].filter(Boolean);
  return processRoundRecords(arrayRecords, tournamentId);
}

function updatePlayerStats(db) {
  db.exec(`
    INSERT INTO player_stats (player_uid, hands_played, hands_won, hands_folded, total_bet, total_won, total_profit, biggest_pot_won, last_played_at, updated_at)
    SELECT
      player_uid,
      COUNT(*) as hands_played,
      SUM(is_winner) as hands_won,
      SUM(CASE WHEN game_status = 'Folded' OR game_status LIKE 'Folded%' THEN 1 ELSE 0 END) as hands_folded,
      COALESCE(SUM(total_bet), 0) as total_bet,
      COALESCE(SUM(win_amount), 0) as total_won,
      COALESCE(SUM(win_amount), 0) - COALESCE(SUM(total_bet), 0) as total_profit,
      COALESCE(MAX(win_amount), 0) as biggest_pot_won,
      MAX(h.created_at) as last_played_at,
      datetime('now') as updated_at
    FROM hand_players hp
    JOIN hands h ON h.id = hp.hand_id
    GROUP BY player_uid
    ON CONFLICT(player_uid) DO UPDATE SET
      hands_played = excluded.hands_played,
      hands_won = excluded.hands_won,
      hands_folded = excluded.hands_folded,
      total_bet = excluded.total_bet,
      total_won = excluded.total_won,
      total_profit = excluded.total_profit,
      biggest_pot_won = excluded.biggest_pot_won,
      last_played_at = excluded.last_played_at,
      updated_at = datetime('now')
  `);
}

function startFileWatcher(holdemPath, pollIntervalMs = 5000) {
  const roundsPath = path.join(holdemPath || DEFAULT_PATHS.holdemHome, 'roundTransactions.json');
  if (!fs.existsSync(path.dirname(roundsPath))) {
    console.warn('[Sync] Holdem path not found, file watcher disabled:', path.dirname(roundsPath));
    return null;
  }

  let lastMtime = 0;
  const interval = setInterval(() => {
    try {
      const stat = fs.statSync(roundsPath);
      if (stat.mtimeMs > lastMtime) {
        lastMtime = stat.mtimeMs;
        syncRoundTransactions(roundsPath);
        console.log('[Sync] Round transactions updated');
      }
    } catch {
      // file may not exist yet
    }
  }, pollIntervalMs);

  return () => clearInterval(interval);
}

module.exports = {
  syncUsers,
  syncRoundTransactions,
  processRoundRecords,
  updatePlayerStats,
  startFileWatcher,
  DEFAULT_PATHS,
};
