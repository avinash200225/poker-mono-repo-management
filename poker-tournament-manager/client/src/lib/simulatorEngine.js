/**
 * Poker Game Simulator Engine
 * Generates random hand outcomes in RoundTransactionMsg format for 2 tables, 8 tablets each.
 * Card encoding: hA, sK, dQ, cJ, etc. Suits: h,d,c,s. Ranks: A,K,Q,J,10,9,8,7,6,5,4,3,2
 */

const SUITS = ['h', 'd', 'c', 's'];
const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const HAND_RANKS = ['Royal Flush', 'Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Straight', 'Three of a Kind', 'Two Pair', 'One Pair', 'High Card'];
const Losing_RANKS = ['Folded', 'Lost-Two Pair', 'Lost-One Pair', 'Lost-High Card'];

function createDeck() {
  const deck = [];
  for (const s of SUITS) {
    for (const r of RANKS) {
      deck.push(s + r);
    }
  }
  return deck;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dealCards(deck, n) {
  return deck.splice(0, n);
}

// Pick a random hand rank for winner (better hands less common)
function randomWinnerHand() {
  const weights = [0.005, 0.01, 0.02, 0.04, 0.06, 0.08, 0.12, 0.18, 0.25, 0.22]; // Rough poker frequencies
  let r = Math.random();
  for (let i = 0; i < HAND_RANKS.length; i++) {
    r -= weights[i];
    if (r <= 0) return HAND_RANKS[i];
  }
  return 'One Pair';
}

// Build 5-card hand from hole + community for display
function makeBestHand(holeCards, communityCards) {
  const combined = [...holeCards, ...communityCards];
  return shuffle(combined).slice(0, 5); // Simplified: random 5 for display
}

/**
 * Generate one round (hand) for a table
 * @param {Object} opts - { roundId, tableId, tableUids, chipBalances }
 * @returns {Object} RoundTransactionMsg
 */
export function generateHand(opts) {
  const { roundId, tableId, tableUids, chipBalances } = opts;
  const uids = tableUids.filter((uid) => (chipBalances[uid] ?? 0) > 0);
  if (uids.length < 2) return null;

  const numPlayers = Math.min(uids.length, 2 + Math.floor(Math.random() * 5)); // 2-6 players in hand
  const participants = shuffle([...uids]).slice(0, numPlayers);

  const deck = shuffle(createDeck());
  const community = dealCards(deck, 5);

  const winnerIdx = Math.floor(Math.random() * participants.length);
  const winnerUid = participants[winnerIdx];
  const winnerHandRank = randomWinnerHand();

  const seats = [];
  let totalPot = 0;
  const bets = {};

  for (let i = 0; i < participants.length; i++) {
    const uid = participants[i];
    const holeCards = dealCards(deck, 2);
    const isWinner = uid === winnerUid;
    const betAmount = Math.min(
      chipBalances[uid] ?? 0,
      50 + Math.floor(Math.random() * 200)
    );
    bets[uid] = betAmount;
    totalPot += betAmount;

    const handRank = isWinner ? winnerHandRank : (Math.random() > 0.5 ? 'Folded' : `Lost-${Losing_RANKS[Math.floor(Math.random() * Losing_RANKS.length)].replace('Lost-', '')}`);
    const gameStatus = isWinner ? `Win-${winnerHandRank}` : handRank;
    const winAmount = isWinner ? totalPot : 0;
    const bestHand = (isWinner || handRank.startsWith('Lost-')) ? makeBestHand(holeCards, community) : [];

    seats.push({
      id: i,
      uid: String(uid),
      cards: holeCards,
      hand: bestHand,
      score: handRank.replace('Lost-', '').replace('Folded', ''),
      betList: [{ index: 0, betValue: betAmount, group: 'preflop', betType: 'raise' }],
      winAmount,
      isDealer: i === 0,
      isPlaying: true,
      gameStatus,
    });
  }

  const gameResult = {
    roundId,
    configData: { pokerVariant: 'Texas', betLimit: 'No Limit' },
    gameCards: community,
    winners: [{ id: winnerIdx, winAmount: totalPot, hand: winnerHandRank, cards: seats[winnerIdx].cards }],
    seats,
  };

  return {
    MessageType: 'ROUND_RESULT',
    transType: 'Win',
    tableId: String(tableId),
    gameName: 'Texas No Limit',
    roundId,
    winningHand: [winnerHandRank],
    gameResult: JSON.stringify(gameResult),
    playersTotalBet: seats.map((s) => [s.uid, s.betList[0]?.betValue ?? 0]),
    playerBetsList: '[]',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Run full tournament simulation
 * @param {Object} opts - { tournamentId, startRoundId, managerApiUrl, getAuthToken }
 * @returns {Array} Array of round transactions and chip updates per player
 */
export function runSimulation(opts) {
  const { onHand } = opts;
  const TABLE_1_UIDS = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const TABLE_2_UIDS = ['9', '10', '11', '12', '13', '14', '15', '16'];
  const TABLES = [
    { id: '71', uids: TABLE_1_UIDS },
    { id: '72', uids: TABLE_2_UIDS },
  ];

  const chipBalances = {};
  const allUids = [...TABLE_1_UIDS, ...TABLE_2_UIDS];
  allUids.forEach((u) => (chipBalances[u] = opts.startingChips ?? 10000));

  const results = [];
  let roundId = opts.startRoundId ?? 1000;
  const maxHands = opts.maxHands ?? 500;
  let handCount = 0;

  while (handCount < maxHands) {
    const activePlayers = allUids.filter((u) => (chipBalances[u] ?? 0) > 0);
    if (activePlayers.length <= 1) break;

    const table = TABLES[handCount % 2];
    const tableBalances = { ...chipBalances };

    const round = generateHand({
      roundId,
      tableId: table.id,
      tableUids: table.uids,
      chipBalances: tableBalances,
    });

    if (!round) break;

    let gameResult;
    try {
      gameResult = JSON.parse(round.gameResult);
    } catch {
      break;
    }

    for (const seat of gameResult.seats) {
      const uid = seat.uid;
      const bet = seat.betList?.[0]?.betValue ?? 0;
      const win = seat.winAmount ?? 0;
      chipBalances[uid] = (chipBalances[uid] ?? 0) - bet + win;
    }

    results.push(round);
    if (onHand) onHand(round, gameResult, chipBalances);

    roundId++;
    handCount++;
  }

  return { rounds: results, chipBalances, eliminated: allUids.filter((u) => (chipBalances[u] ?? 0) <= 0) };
}
