-- Poker Tournament Manager Schema
-- Tracks players, tournaments, hands, and stats derived from poker table app

-- Event organizer / admin users
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Players (can be linked to poker app uid or registered separately)
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_uid TEXT,           -- uid from poker app (1, 2, 3...)
  client_ip TEXT,              -- tablet IP from poker app
  display_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(external_uid)
);

-- Tournaments / Events
CREATE TABLE IF NOT EXISTS tournaments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  status TEXT DEFAULT 'draft',  -- draft, active, completed, cancelled
  buy_in REAL,
  starting_chips INTEGER,
  blind_structure TEXT,         -- JSON
  tables_count INTEGER DEFAULT 1,
  max_players INTEGER,
  created_by INTEGER REFERENCES admins(id),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Tournament registrations (which players in which tournament)
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
  player_id INTEGER NOT NULL REFERENCES players(id),
  seat_number INTEGER,
  table_number INTEGER,
  starting_chips INTEGER,
  current_chips INTEGER,       -- live chip count
  eliminated_at_round INTEGER,
  position INTEGER,            -- final position (1=winner)
  dr_neau_points REAL,         -- Dr. Neau: LN((Players+1)/Rank)
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tournament_id, player_id)
);

-- Hand records (from RoundTransactionMsg)
CREATE TABLE IF NOT EXISTS hands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER REFERENCES tournaments(id),
  round_id INTEGER NOT NULL,
  table_id TEXT,
  game_name TEXT,
  game_cards TEXT,              -- JSON array of community cards
  winning_hand TEXT,            -- hand rank of winner
  pot_amount REAL,
  timestamp TEXT NOT NULL,
  raw_game_result TEXT,          -- full JSON from poker app
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(round_id)
);

-- Per-player hand participation (from gameResult.seats)
CREATE TABLE IF NOT EXISTS hand_players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hand_id INTEGER NOT NULL REFERENCES hands(id),
  player_uid TEXT NOT NULL,     -- uid from poker app
  seat_id INTEGER,
  cards TEXT,                   -- JSON array of hole cards
  hand_rank TEXT,               -- "Straight", "Two Pair", "Folded"
  best_hand TEXT,               -- JSON array of 5 cards at showdown
  total_bet REAL DEFAULT 0,
  win_amount REAL DEFAULT 0,
  game_status TEXT,             -- "Win-Straight", "Lost-Two Pair", "Folded"
  is_winner INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(hand_id, player_uid)
);

-- Aggregated player stats (computed from hands)
CREATE TABLE IF NOT EXISTS player_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_uid TEXT NOT NULL UNIQUE,
  hands_played INTEGER DEFAULT 0,
  hands_won INTEGER DEFAULT 0,
  hands_folded INTEGER DEFAULT 0,
  total_profit REAL DEFAULT 0,
  total_bet REAL DEFAULT 0,
  total_won REAL DEFAULT 0,
  biggest_pot_won REAL DEFAULT 0,
  favorite_hand TEXT,           -- most common winning hand rank
  vpip REAL,                    -- % hands voluntarily put $ in pot
  showdown_win_rate REAL,
  last_played_at TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Winning hand records (for "most winning hands" feature)
CREATE TABLE IF NOT EXISTS winning_hands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hand_id INTEGER NOT NULL REFERENCES hands(id),
  player_uid TEXT NOT NULL,
  hand_rank TEXT NOT NULL,
  hole_cards TEXT,              -- JSON
  best_five TEXT,               -- JSON
  pot_amount REAL,
  timestamp TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Sync log (to track what we've imported from poker app)
CREATE TABLE IF NOT EXISTS sync_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,         -- 'round_transactions', 'users', etc.
  last_round_id INTEGER,
  last_sync_at TEXT DEFAULT (datetime('now')),
  records_processed INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_hands_tournament ON hands(tournament_id);
CREATE INDEX IF NOT EXISTS idx_hands_round ON hands(round_id);
CREATE INDEX IF NOT EXISTS idx_hand_players_uid ON hand_players(player_uid);
CREATE INDEX IF NOT EXISTS idx_hand_players_hand ON hand_players(hand_id);
CREATE INDEX IF NOT EXISTS idx_winning_hands_uid ON winning_hands(player_uid);
CREATE INDEX IF NOT EXISTS idx_tournament_reg_player ON tournament_registrations(player_id);
CREATE INDEX IF NOT EXISTS idx_tournament_reg_tournament ON tournament_registrations(tournament_id);
