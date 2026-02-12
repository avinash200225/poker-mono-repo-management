import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    api('/api/players').then((r) => r.json()).then(setPlayers);
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Players</h1>
        <p>Manage player profiles and view stats</p>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Seat ID (uid)</th>
              <th>Tablet IP</th>
              <th>Hands</th>
              <th>Won</th>
              <th>Profit</th>
              <th>Biggest Pot</th>
              <th>Last Played</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link to={`/players/${p.id}`} className="player-link">
                    {p.display_name || `Player ${p.external_uid}`}
                  </Link>
                </td>
                <td><code>{p.external_uid || '—'}</code></td>
                <td><code>{p.client_ip || '—'}</code></td>
                <td>{p.hands_played ?? 0}</td>
                <td>{p.hands_won ?? 0}</td>
                <td className={Number(p.total_profit) >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {formatCurrency(p.total_profit)}
                </td>
                <td>{formatCurrency(p.biggest_pot_won)}</td>
                <td>{p.last_played_at ? formatDate(p.last_played_at) : '—'}</td>
                <td>
                  <Link to={`/players/${p.id}`} className="btn btn-sm btn-secondary">
                    Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {players.length === 0 && (
          <p className="muted" style={{ padding: '2rem', textAlign: 'center' }}>
            No players yet. Sync users from the poker app in Data Sync.
          </p>
        )}
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

function formatDate(s) {
  try {
    return new Date(s).toLocaleDateString();
  } catch {
    return s;
  }
}
