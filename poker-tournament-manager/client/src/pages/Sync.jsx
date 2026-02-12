import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Sync() {
  const [status, setStatus] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  const [roundsResult, setRoundsResult] = useState(null);
  const [loading, setLoading] = useState({ users: false, rounds: false });

  useEffect(() => {
    api('/api/sync/status').then((r) => r.json()).then(setStatus);
  }, []);

  const syncUsers = () => {
    setLoading((l) => ({ ...l, users: true }));
    api('/api/sync/users', { method: 'POST', body: '{}' })
      .then((r) => r.json())
      .then((res) => {
        setUsersResult(res);
        setLoading((l) => ({ ...l, users: false }));
      })
      .catch((e) => {
        setUsersResult({ error: e.message });
        setLoading((l) => ({ ...l, users: false }));
      });
  };

  const syncRounds = () => {
    setLoading((l) => ({ ...l, rounds: true }));
    api('/api/sync/rounds', { method: 'POST', body: '{}' })
      .then((r) => r.json())
      .then((res) => {
        setRoundsResult(res);
        setLoading((l) => ({ ...l, rounds: false }));
      })
      .catch((e) => {
        setRoundsResult({ error: e.message });
        setLoading((l) => ({ ...l, rounds: false }));
      });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Data Sync</h1>
        <p>Import players and hand history from the poker table app</p>
      </div>

      <div className="card">
        <h3>Data Sources</h3>
        <p className="muted" style={{ marginBottom: '1rem' }}>
          The tournament manager reads from the poker app's JSON files. By default it checks:
        </p>
        <dl className="profile-dl">
          <dt>Users</dt>
          <dd><code>{status?.conf_users || '—'}</code></dd>
          <dt>Round Transactions</dt>
          <dd>
            <code>{status?.holdem_home || '—'}</code>/roundTransactions.json<br />
            <code>{status?.conf_holdem || '—'}</code>/roundTransactions.json
          </dd>
        </dl>
      </div>

      <div className="card">
        <h3>Sync Actions</h3>
        <div className="sync-actions">
          <div>
            <h4>Import Players</h4>
            <p className="muted">Read users.json to create/update player profiles (uid, nickname, tablet IP).</p>
            <button className="btn btn-primary" onClick={syncUsers} disabled={loading.users}>
              {loading.users ? 'Syncing...' : 'Sync Users'}
            </button>
            {usersResult && (
              <p style={{ marginTop: '0.5rem', color: usersResult.error ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                {usersResult.error || `Synced ${usersResult.count} players`}
              </p>
            )}
          </div>
          <div>
            <h4>Import Round Transactions</h4>
            <p className="muted">Read roundTransactions.json to import hand history and compute player stats.</p>
            <button className="btn btn-primary" onClick={syncRounds} disabled={loading.rounds}>
              {loading.rounds ? 'Syncing...' : 'Sync Rounds'}
            </button>
            {roundsResult && (
              <p style={{ marginTop: '0.5rem', color: roundsResult.error ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                {roundsResult.error || `Imported ${roundsResult.count} hands`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Integration Notes</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
          <li>Run the poker table app first. It writes to <code>~/holdem/</code> at runtime.</li>
          <li>For demo, copy sample data to <code>~/holdem/roundTransactions.json</code> and <code>conf/jsons/users.json</code>.</li>
          <li>Enable auto-watch: set <code>WATCH_HOLDEM_PATH=~/holdem</code> when starting the server.</li>
          <li>See <code>INPUT_DATA_SPEC.md</code> for full data format reference.</li>
        </ul>
      </div>
    </div>
  );
}
