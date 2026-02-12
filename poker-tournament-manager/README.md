# Poker Tournament Manager

Tournament management software for the poker table app. Tracks players, builds profiles, records winning hands, and provides stats poker players love. **Event organizers have full control** with login, table management, and live tournament progression.

## Features

- **Login** — Organizer authentication (JWT)
- **Tables** — Track tablet serial numbers, set status (active/inactive), identify physical tables
- **Player profiles** — Linked to poker app seat/tablet (uid, IP)
- **Stats** — Hands played, hands won, profit/loss, biggest pot won, showdown win rate
- **Most winning hands** — Best hands by pot size
- **Tournaments** — Create events, manage registrations
- **Table selection** — Select which available tables (by serial #) run each tournament
- **Tournament Control** — Live view: chip counts, add/eliminate players, progression tracking
- **Dr. Neau scoring** — Points = LN((Players+1) / Rank); automatic when recording eliminations
- **Data sync** — Import from poker app JSON files (users, round transactions)
- **Leaderboard** — Top players by profit

## Default Login

- **Email:** admin@tournament.local  
- **Password:** admin123  

(Change in production; set `JWT_SECRET` env var.)

## Input Data (from Poker App)

See [INPUT_DATA_SPEC.md](./INPUT_DATA_SPEC.md) for the full specification of what the tournament manager consumes:

- `users.json` — Player identity (uid, nickname, client_ip)
- `roundTransactions.json` — Hand results (gameResult with seats, winners, cards, scores)

## Quick Start

```bash
cd poker-tournament-manager
npm run setup          # Install deps (root + client)
npm run client:build   # Build React UI
npm run server         # Start API + serve UI on http://localhost:3001
```

For development (API + hot-reload UI):

```bash
npm run dev            # Server on 3001, client on 3002
```

## For Contributors (clone from GitHub)

```bash
git clone <your-repo-url>
cd poker-mono-repo-main/poker-tournament-manager
npm run setup
npm run client:build
npm run server
```

The database (`data/tournament.db`) is created automatically on first run.

## Sync from Poker App

1. Ensure the poker table app has run and written data to `~/holdem/` (or use `conf/jsons/`).
2. Open **Data Sync** in the UI.
3. Click **Sync Users** to import players.
4. Click **Sync Rounds** to import hand history and compute stats.

Optional: run with `WATCH_HOLDEM_PATH=~/holdem` to auto-sync when round transactions change.

## Project Structure

```
poker-tournament-manager/
├── INPUT_DATA_SPEC.md     # Input data documentation
├── server/
│   ├── index.js           # Express API
│   ├── db/
│   │   ├── init.js
│   │   └── schema.sql
│   └── services/
│       └── syncService.js
├── client/                # React (Vite) admin UI
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Players.jsx
│       │   ├── PlayerProfile.jsx
│       │   ├── Tournaments.jsx
│       │   └── Sync.jsx
│       └── ...
└── data/                  # SQLite DB (created at runtime)
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/players | List players with stats |
| GET /api/players/:id | Player profile + winning hands |
| PUT /api/players/:id | Update player |
| GET /api/tournaments | List tournaments |
| POST /api/tournaments | Create tournament |
| PUT /api/tournaments/:id | Update tournament |
| GET /api/stats/leaderboard | Top players by profit |
| GET /api/stats/best-hands | Best winning hands |
| POST /api/sync/users | Sync users.json |
| POST /api/sync/rounds | Sync roundTransactions.json |
