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

module.exports = { drNeauPoints, drNeauReworkedPoints };
