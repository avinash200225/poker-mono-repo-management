# Table Poker Web Application

### Development Server
- Uses Play Framework 2.8.4 with Scala 2.13.6
- Default port: 9000
- HTTP idle timeout: 60000s

## Architecture Overview

This is a Texas Hold'em poker web application built with Play Framework, featuring a multi-client architecture with real-time WebSocket communication.

### Core Components

**Application Structure:**
- `AppLoader.scala` - Application bootstrapping with dependency injection using MacWire
- `AppComponents` - Wires all services, controllers, and DAOs

**Actor System:**
- `MainActor` - Central coordinator for player transactions, game state, and admin notifications
- `PokerTable` - Game logic actor managing poker rounds, betting, and player actions
- `LogManagerActor` - Centralized logging system
- Actor-based WebSocket communication for real-time updates

**Client Types:**
- **Admin** (`/admin`) - Dealer/operator interface for game control
- **Player** (`/player?ip=X.X.X.X`) - Player interface (supports 8 players)
- **Topper** (`/topper`) - Dashboard/display interface

### Database Integration
- Uses ScalikeJDBC for database operations
- PostgreSQL database with connection pooling (HikariCP)
- Main DAOs: `PlayerDao`, `PokerDao`, `LogDao`, `ServerServicesDao`

### Key Services
- `GameService` - Core game logic and state management
- WebSocket endpoints for real-time communication
- JSON-based message passing between clients and server

### Configuration
- `application.conf` - Play Framework configuration
- `conf/jsons/` - Game configuration files (tables, game types, users)
- Docker Compose setup with PostgreSQL

### Frontend Assets
- Compiled React/JS bundles in `public/compiled/`
- Separate bundles for admin, tablet, and topper interfaces
- Static assets include poker cards, chips, sounds, and game images

## Development Notes

### WebSocket Endpoints
- `/holdem/wsclient/player` - Player WebSocket connection
- `/holdem/wsclient/admin` - Admin WebSocket connection
- `/holdem/wsclient/topper` - Topper WebSocket connection

### Game Logic
- Poker engine with card dealing, hand evaluation, and betting logic
- Support for multiple game variants (Texas Hold'em, Omaha)
- Real-time synchronization between all connected clients

### Database Schema
- Player management with balance tracking
- Game transaction logging
- Round-based game state persistence

## Development Commands

### Building and Running
- `sbt dist` - Build distribution package
- `docker compose up` - Run the application with PostgreSQL database
- `sbt run` - Run in development mode (default port 9000)


### Use Google Chrome Browser to connect serving apps/pages,
Dealer SPA - http://localhost:9000/admin
Dashboard SPA - http://localhost:9000/topper
Player 1 SPA - http://localhost:9000/player?ip=192.168.1.1
Player 2 SPA - http://localhost:9000/player?ip=192.168.1.2
Player 3 SPA - http://localhost:9000/player?ip=192.168.1.3
Player 4 SPA - http://localhost:9000/player?ip=192.168.1.4
Player 5 SPA - http://localhost:9000/player?ip=192.168.1.5
Player 6 SPA - http://localhost:9000/player?ip=192.168.1.6
Player 7 SPA - http://localhost:9000/player?ip=192.168.1.7
Player 8 SPA - http://localhost:9000/player?ip=192.168.1.8


testing..
