-- Tables: tablet serial numbers, identify physical tables
CREATE TABLE IF NOT EXISTS poker_tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  serial_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'inactive',  -- active, inactive, maintenance
  location TEXT,
  tablet_ips TEXT,               -- JSON array of tablet IPs for this table
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Link tables to tournaments (which tables used in which event)
CREATE TABLE IF NOT EXISTS tournament_tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
  table_id INTEGER NOT NULL REFERENCES poker_tables(id),
  table_number INTEGER,           -- table number in tournament (Table 1, 2, ...)
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tournament_id, table_id)
);

-- Add current_chips if missing (for upgrades from older schema)
-- Run before chip_history in case of dependency order
-- Ignores error if column already exists

-- Chip history: track progression through tournament
CREATE TABLE IF NOT EXISTS chip_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
  registration_id INTEGER NOT NULL REFERENCES tournament_registrations(id),
  chips INTEGER NOT NULL,
  reason TEXT,                    -- 'starting', 'rebuys', 'add_on', 'hand_result', 'elimination'
  round_number INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
-- ALTER may fail if column exists; migration runner catches it
-- Note: SQLite doesn't support IF NOT EXISTS for ADD COLUMN
-- runMigrations catches "duplicate column" and continues

CREATE INDEX IF NOT EXISTS idx_chip_history_tournament ON chip_history(tournament_id);
CREATE INDEX IF NOT EXISTS idx_chip_history_registration ON chip_history(registration_id);
CREATE INDEX IF NOT EXISTS idx_tournament_tables_tournament ON tournament_tables(tournament_id);
