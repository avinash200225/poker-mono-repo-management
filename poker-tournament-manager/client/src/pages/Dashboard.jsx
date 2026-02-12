import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    Promise.all([
      api('/api/players').then((r) => r.json()),
      api('/api/tournaments').then((r) => r.json()),
      api('/api/tables').then((r) => r.json()),
      api('/api/stats/leaderboard').then((r) => r.json()),
    ]).then(([players, tournaments, tables, lb]) => {
      const tableList = Array.isArray(tables) ? tables : [];
      setStats({
        players: players.length,
        tournaments: tournaments.length,
        tables: tableList.length,
        activeTables: tableList.filter((t) => t.status === 'active').length,
        activeTournaments: tournaments.filter((t) => t.status === 'active').length,
      });
      setLeaderboard(lb.slice(0, 10));
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Event organizer control center</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats?.players ?? '—'}</span>
          <span className="stat-label">Players</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.tournaments ?? '—'}</span>
          <span className="stat-label">Tournaments</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.activeTournaments ?? '—'}</span>
          <span className="stat-label">Active Events</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.tables ?? '—'}</span>
          <span className="stat-label">Tables</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.activeTables ?? '—'}</span>
          <span className="stat-label">Tables Active</span>
        </div>
      </div>

      <div className="card">
        <h3>Top Players by Profit</h3>
        {leaderboard.length === 0 ? (
          <p className="muted">Sync data from the poker app to see leaderboard.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Hands</th>
                <th>Won</th>
                <th>Profit</th>
                <th>Biggest Pot</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((p, i) => (
                <tr key={p.player_uid}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={p.id ? `/players/${p.id}` : '/players'}>
                      {p.display_name || `Player ${p.player_uid}`}
                    </Link>
                  </td>
                  <td>{p.hands_played ?? 0}</td>
                  <td>{p.hands_won ?? 0}</td>
                  <td className={Number(p.total_profit) >= 0 ? 'profit-positive' : 'profit-negative'}>
                    {formatCurrency(p.total_profit)}
                  </td>
                  <td>{formatCurrency(p.biggest_pot_won)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <Link to="/tables" className="btn btn-secondary">
            Manage Tables
          </Link>
          <Link to="/players" className="btn btn-secondary">
            Manage Players
          </Link>
          <Link to="/tournaments" className="btn btn-secondary">
            Manage Tournaments
          </Link>
          <Link to="/sync" className="btn btn-primary">
            Sync from Poker App
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(n) {
  if (n == null) return '—';
  const num = Number(n);
  const prefix = num >= 0 ? '+' : '';
  return prefix + '₹' + Math.abs(num).toLocaleString();
}
