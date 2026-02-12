-- Add Dr. Neau points column for tournament scoring
-- Formula: Points = LN((TotalPlayers + 1) / FinishPosition)
ALTER TABLE tournament_registrations ADD COLUMN dr_neau_points REAL;
