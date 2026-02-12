import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

export default function PlayerProfile() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ display_name: '', email: '', phone: '', notes: '' });

  useEffect(() => {
    api(`/api/players/${id}`).then((r) => r.json()).then((data) => {
      setPlayer(data);
      setForm({
        display_name: data.display_name || '',
        email: data.email || '',
        phone: data.phone || '',
        notes: data.notes || '',
      });
    }).catch(() => setPlayer(null));
  }, [id]);

  const handleSave = () => {
    api(`/api/players/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => {
      setEditing(false);
      setPlayer((p) => ({ ...p, ...form }));
    });
  };

  if (!player) return <div className="card"><p>Loading...</p></div>;

  const stats = player.stats || {};
  const winningHands = player.winningHands || [];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{player.display_name || `Player ${player.external_uid}`}</h1>
          <p>Seat ID: {player.external_uid} · Tablet: {player.client_ip || '—'}</p>
        </div>
        <Link to="/players" className="btn btn-secondary">← Back</Link>
      </div>

      <div className="profile-grid">
        <div className="card">
          <h3>Profile</h3>
          {editing ? (
            <div className="form-group">
              <label>Display Name</label>
              <input
                value={form.display_name}
                onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
              />
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <label>Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
              <label>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
              />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <dl className="profile-dl">
                <dt>Name</dt>
                <dd>{player.display_name || '—'}</dd>
                <dt>Email</dt>
                <dd>{player.email || '—'}</dd>
                <dt>Phone</dt>
                <dd>{player.phone || '—'}</dd>
                <dt>Notes</dt>
                <dd>{player.notes || '—'}</dd>
              </dl>
              <button className="btn btn-sm btn-secondary" onClick={() => setEditing(true)}>Edit</button>
            </>
          )}
        </div>

        <div className="card">
          <h3>Stats</h3>
          <dl className="profile-dl">
            <dt>Hands Played</dt>
            <dd>{stats.hands_played ?? 0}</dd>
            <dt>Hands Won</dt>
            <dd>{stats.hands_won ?? 0}</dd>
            <dt>Total Profit</dt>
            <dd className={Number(stats.total_profit) >= 0 ? 'profit-positive' : 'profit-negative'}>
              {formatCurrency(stats.total_profit)}
            </dd>
            <dt>Biggest Pot Won</dt>
            <dd>{formatCurrency(stats.biggest_pot_won)}</dd>
            <dt>Showdown Win Rate</dt>
            <dd>
              {stats.hands_won && stats.hands_played
                ? ((stats.hands_won / stats.hands_played) * 100).toFixed(1) + '%'
                : '—'}
            </dd>
          </dl>
        </div>
      </div>

      <div className="card">
        <h3>Most Winning Hands</h3>
        <p className="muted" style={{ marginBottom: '1rem' }}>Best hands by pot size</p>
        {winningHands.length === 0 ? (
          <p className="muted">No winning hands recorded. Sync round transactions from the poker app.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hand</th>
                <th>Hole Cards</th>
                <th>Pot Won</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {winningHands.map((wh) => (
                <tr key={wh.id}>
                  <td><strong>{wh.hand_rank}</strong></td>
                  <td><code>{formatCards(wh.hole_cards)}</code></td>
                  <td className="profit-positive">{formatCurrency(wh.pot_amount)}</td>
                  <td>{formatDate(wh.hand_timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    return new Date(s).toLocaleString();
  } catch {
    return s || '—';
  }
}

function formatCards(json) {
  try {
    const arr = JSON.parse(json || '[]');
    return Array.isArray(arr) ? arr.join(' ') : json;
  } catch {
    return json || '—';
  }
}
