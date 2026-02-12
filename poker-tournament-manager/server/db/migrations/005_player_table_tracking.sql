-- Player-table tracking: tablet IP, cash out, rejoin
ALTER TABLE tournament_registrations ADD COLUMN status TEXT DEFAULT 'active';  -- active, cashed_out, eliminated
ALTER TABLE tournament_registrations ADD COLUMN client_ip TEXT;               -- current tablet IP
ALTER TABLE tournament_registrations ADD COLUMN cashed_out_at TEXT;           -- when they cashed out
ALTER TABLE tournament_registrations ADD COLUMN cashed_out_chips INTEGER;     -- chips saved at cash out
