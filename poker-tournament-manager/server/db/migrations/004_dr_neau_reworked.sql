-- Dr. Neau reworked formula: prize-pool/avg-spend aware
-- Points = (Prizemoney / √(Players · (Buy-in + Rebuys + Add-ons))) · (1 / (1 + Rank))
ALTER TABLE tournament_registrations ADD COLUMN dr_neau_reworked_points REAL;

-- Tournament-level totals for reworked formula (stored on tournament)
ALTER TABLE tournaments ADD COLUMN total_prize_pool REAL;
ALTER TABLE tournaments ADD COLUMN total_rebuys REAL DEFAULT 0;
ALTER TABLE tournaments ADD COLUMN total_addons REAL DEFAULT 0;
