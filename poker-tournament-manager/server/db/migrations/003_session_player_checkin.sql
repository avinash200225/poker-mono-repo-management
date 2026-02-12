-- Session player check-in: tracks when a tablet user enters their name before playing
-- Links to tournament session and stores the name/username they entered
CREATE TABLE IF NOT EXISTS session_player_checkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
  player_id INTEGER NOT NULL REFERENCES players(id),
  external_uid TEXT NOT NULL,
  display_name TEXT NOT NULL,
  client_ip TEXT,
  checked_in_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tournament_id, external_uid)
);

CREATE INDEX IF NOT EXISTS idx_session_checkins_tournament ON session_player_checkins(tournament_id);
CREATE INDEX IF NOT EXISTS idx_session_checkins_player ON session_player_checkins(player_id);
