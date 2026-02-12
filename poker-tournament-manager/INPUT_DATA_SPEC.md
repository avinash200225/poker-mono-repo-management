# Poker Tournament Manager — Input Data Specification

This document describes **all data available from the Poker Table application** that can be used as input for the Tournament Management Software. The poker app tracks physical cards on embedded tablets at each seat.

---

## 1. Player Identity & Registration

### `users.json` (conf/jsons/users.json, or ~/holdem/users.json at runtime)

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Unique player ID (e.g. "1", "2") — **links to seat/tablet** |
| `nickname` | string | Display name (e.g. "Player 1", "Player 2") |
| `client_ip` | string | IP of embedded tablet (e.g. "192.168.1.2") — **identifies physical seat** |
| `balance` | number | Current chip balance |
| `status` | string | "online" \| "offline" |
| `usage` | string | "unlocked" \| "locked" |
| `currency` | string | e.g. "INR" |
| `operator_id` | number | Operator ID |
| `vip` | number | VIP level |
| `session_id` | number | Session identifier |
| `client_id` | string | Client identifier |
| `current_player_token` | string | Auth token for current session |

**Use for:** Mapping seat/tablet (IP) → player identity (uid). Event organizer can register real players to uids before a tournament.

---

## 2. Round Transactions (Hand Results) — **Primary source for stats**

### `RoundTransactionMsg` (stored in ~/holdem/roundTransactions.json, sent via WebSocket `ROUND_RESULT`)

| Field | Type | Description |
|-------|------|-------------|
| `MessageType` | string | "ROUND_RESULT" |
| `transType` | string | "Win" |
| `tableId` | string | Table identifier (e.g. "71" = Texas Limit) |
| `gameName` | string | "Texas Fixed Limit", "Texas No Limit", "Omaha Pot Limit", etc. |
| `roundId` | long | Unique round/hand number |
| `winningHand` | string[] | Hand rank names of winners (e.g. ["Royal Flush"]) |
| `gameResult` | string | **JSON string** — full GameResult (see below) |
| `playersTotalBet` | [(uid, amount)][] | Total bet per player uid |
| `playerBetsList` | string | JSON of all bets in the round |
| `timestamp` | string | ISO-style timestamp |

### `gameResult` (parsed JSON) structure:

```json
{
  "roundId": 6,
  "configData": { "pokerVariant": "Texas", "betLimit": "No Limit", ... },
  "gameCards": ["hA", "sK", "dQ", "cJ", "h10"],
  "winners": [
    {
      "id": 0,
      "winningPot": 0,
      "winAmount": 1500,
      "rake": 0,
      "totalBet": 500,
      "hand": "Straight",
      "cards": ["hA", "hK"]
    }
  ],
  "seats": [
    {
      "id": 0,
      "uid": "1",
      "cards": ["hA", "hK"],
      "hand": ["hA", "hK", "hQ", "hJ", "h10"],
      "score": "Straight",
      "betList": [{ "index": 0, "betValue": 100, "group": "preflop", "betType": "raise" }],
      "winAmount": 1500,
      "isDealer": true,
      "isPlaying": true,
      "gameStatus": "Win-Straight"
    }
  ]
}
```

**Seat fields for stats:**
- `uid` — player ID
- `cards` — hole cards (e.g. ["hA", "sK"])
- `hand` — best 5-card hand shown at showdown
- `score` — hand rank (e.g. "Royal Flush", "Straight", "Two Pair", "Folded")
- `betList` — bet breakdown by street
- `winAmount` — chips won this hand
- `gameStatus` — "Win-{rank}", "Lost-{rank}", "Folded", etc.

**Use for:** Hand history, winning hands, VPIP/PFR, showdown stats, hand rankings distribution.

---

## 3. Game Transactions (Per-Player Win/Loss) — **Sent via WebSocket**

### `GameTransaction` (streamed to admin/Topper on each hand)

| Field | Type | Description |
|-------|------|-------------|
| `roundId` | long | Hand/round ID |
| `rake` | number | Rake collected |
| `game` | string | Game type |
| `transType` | string | "Win" |
| `player` | string | **uid** of player |
| `totalBet` | number | Total bet this hand |
| `totalWin` | number | Total won this hand |
| `oldBalance` | number | Balance before hand |
| `balance` | number | Balance after hand |
| `betList` | Bet[] | Bet breakdown |
| `wonList` | WinBet[] | Win breakdown |

**Use for:** Per-player profit/loss per hand, bankroll tracking.

---

## 4. Money Transactions (Cashier) — `transactions.json`

### `MoneyTransactionMsg`

| Field | Type | Description |
|-------|------|-------------|
| `transType` | string | "Cashier" |
| `MessageType` | string | "PLAYER_CREATION", "PLAYER_MONEY_DEPOSIT_SUCCESS", etc. |
| `playerIp` | string | Tablet IP |
| `amount` | number | Amount |
| `oldBalance` | number | Balance before |
| `newBalance` | number | Balance after |
| `roundId` | number | Optional |
| `rake` | number | Optional |
| `timestamp` | string | Timestamp |

**Use for:** Buy-in history, rebuys, cash-out tracking.

---

## 5. Live Seat/Game State — `seats.json`, `game_data.json`

### Seat (per hand, in game_data.seats)

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Seat index 0–7 |
| `uid` | string | Player ID |
| `balance` | number | Current chips |
| `connected` | bool | Tablet connected |
| `totalBet` | number | Bet this hand |
| `winAmount` | number | Win this hand |
| `lastWin` | number | Last hand win |
| `cards` | string[] | Hole cards |
| `bets` | number[] | Bets by street |
| `gameStatus` | string | "ready", "Win-Straight", "Folded", etc. |
| `isDealer`, `isSmallBet`, `isBigBet` | bool | Position flags |

### game_data.json top level

| Field | Description |
|-------|-------------|
| `roundId` | Current hand |
| `gameType` | "Fixed Limit", etc. |
| `potAmount` | Current pot |
| `stage` | "1"=preflop, "2"=flop, "3"=turn, "4"=river |
| `winner` | Winner seat id or "-1" |
| `winningHand` | Hand rank string |
| `gameCards` | Community cards |

**Use for:** Real-time tournament status, active players, current hand state.

---

## 6. Integration Options

| Method | Pros | Cons |
|--------|------|------|
| **A. WebSocket subscriber** | Real-time, no file polling | Requires poker server to expose WS for tournament service |
| **B. File watcher** | No changes to poker server | Reads ~/holdem/*.json; depends on file storage |
| **C. REST API on poker server** | Clean separation | Requires new endpoints in Scala/Play app |
| **D. Shared DB** | Direct SQL queries | Poker app uses file-based storage, not DB for holdem |

**Recommended:** Add a **WebSocket client** in tournament manager that connects to `ws://poker-server:9000/holdem/wsclient/admin` (or a dedicated tournament endpoint) and receives `PlayerRoundTransaction` and `PlayerGameTransaction` events. Alternatively, **file watcher** on `~/holdem/roundTransactions.json` for initial integration with zero changes to poker server.

---

## 7. Stats We Can Derive

From RoundTransaction + GameTransaction:

- **Hands played** (per player)
- **Hands won** (gameStatus contains "Win-")
- **Total profit/loss**
- **Most winning hands** (score + cards when gameStatus = "Win-*")
- **Hand rank distribution** (Royal Flush, Straight Flush, etc.)
- **VPIP** (Voluntarily Put $ In Pot) — from betList
- **Showdown win rate**
- **Biggest pot won**
- **Session/tournament summaries**

---

## 8. Card Encoding

Cards use format: `{suit}{rank}`
- Suits: `h`=hearts, `d`=diamonds, `c`=clubs, `s`=spades
- Ranks: `A`, `K`, `Q`, `J`, `10`, `9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`

Example: `hA` = Ace of Hearts, `sK` = King of Spades.
