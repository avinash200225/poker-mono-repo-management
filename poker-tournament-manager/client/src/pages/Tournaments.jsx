import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [tournamentTables, setTournamentTables] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => api('/api/tournaments').then((r) => r.json()).then(setTournaments);

  useEffect(() => {
    load();
    api('/api/tables').then((r) => r.json()).then(setAllTables);
  }, []);

  const openEdit = (t) => {
    setModal({ mode: 'edit', ...t });
    if (t.id) {
      api(`/api/tournaments/${t.id}/tables`).then((r) => r.json()).then((rows) => {
        setTournamentTables(rows.map((tt) => tt.table_id));
      });
    } else {
      setTournamentTables([]);
    }
  };

  const createTournament = () => {
    setModal({
      mode: 'create',
      name: '',
      event_date: new Date().toISOString().slice(0, 10),
      status: 'draft',
      buy_in: '',
      starting_chips: '',
      max_players: '',
    });
    setTournamentTables([]);
  };

  const toggleTable = (tableId) => {
    setTournamentTables((prev) =>
      prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]
    );
  };

  const handleSave = () => {
    if (!modal) return;
    const url = modal.mode === 'create' ? '/api/tournaments' : `/api/tournaments/${modal.id}`;
    const method = modal.mode === 'create' ? 'POST' : 'PUT';
    const body =
      modal.mode === 'create'
        ? {
            name: modal.name,
            event_date: modal.event_date,
            status: modal.status,
            buy_in: Number(modal.buy_in) || 0,
            starting_chips: Number(modal.starting_chips) || 0,
            max_players: modal.max_players ? Number(modal.max_players) : null,
          }
        : { ...modal };

    api(url, { method, body: JSON.stringify(body) })
      .then(async (res) => {
        const data = await res.json();
        const tid = modal.mode === 'create' ? data.id : modal.id;
        if (tid && tournamentTables.length > 0) {
          await api(`/api/tournaments/${tid}/tables/bulk`, {
            method: 'POST',
            body: JSON.stringify({ table_ids: tournamentTables }),
          });
        }
        setModal(null);
        load();
      });
  };

  const deleteTournament = (id) => {
    if (!confirm('Delete this tournament?')) return;
    api(`/api/tournaments/${id}`, { method: 'DELETE' }).then(load);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Tournaments</h1>
          <p>Create and manage events</p>
        </div>
        <button className="btn btn-primary" onClick={createTournament}>
          + New Tournament
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Buy-in</th>
              <th>Registered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.event_date}</td>
                <td>
                  <span className={`badge badge-${t.status === 'active' ? 'success' : t.status === 'completed' ? 'neutral' : 'warning'}`}>
                    {t.status}
                  </span>
                </td>
                <td>₹{Number(t.buy_in).toLocaleString()}</td>
                <td>{t.registered_count ?? 0}</td>
                <td>
                  <Link to={`/tournaments/${t.id}/control`} className="btn btn-sm btn-primary" style={{ marginRight: '0.5rem' }}>
                    Control
                  </Link>
                  <button className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }}
                    onClick={() => openEdit(t)}>Edit</button>
                  <button className="btn btn-sm btn-secondary"
                    onClick={() => deleteTournament(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tournaments.length === 0 && (
          <p className="muted" style={{ padding: '2rem', textAlign: 'center' }}>
            No tournaments. Create one to get started.
          </p>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.mode === 'create' ? 'New Tournament' : 'Edit Tournament'}</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                value={modal.name}
                onChange={(e) => setModal((m) => ({ ...m, name: e.target.value }))}
                placeholder="Weekly Championship"
              />
              <label>Date</label>
              <input
                type="date"
                value={modal.event_date}
                onChange={(e) => setModal((m) => ({ ...m, event_date: e.target.value }))}
              />
              <label>Status</label>
              <select
                value={modal.status}
                onChange={(e) => setModal((m) => ({ ...m, status: e.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <label>Buy-in (₹)</label>
              <input
                type="number"
                value={modal.buy_in}
                onChange={(e) => setModal((m) => ({ ...m, buy_in: e.target.value }))}
                placeholder="1000"
              />
              <label>Starting Chips</label>
              <input
                type="number"
                value={modal.starting_chips}
                onChange={(e) => setModal((m) => ({ ...m, starting_chips: e.target.value }))}
                placeholder="10000"
              />
              <label>Max Players</label>
              <input
                type="number"
                value={modal.max_players}
                onChange={(e) => setModal((m) => ({ ...m, max_players: e.target.value }))}
                placeholder="Optional"
              />
              <label>Tables for this tournament</label>
              <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Select which tables (by serial #) will run this tournament
              </p>
              <div className="table-select-grid">
                {allTables.map((t) => (
                  <label key={t.id} className="table-select-item">
                    <input
                      type="checkbox"
                      checked={tournamentTables.includes(t.id)}
                      onChange={() => toggleTable(t.id)}
                    />
                    <span>{t.name}</span>
                    <code>{t.serial_number || '—'}</code>
                    <span className={`badge badge-${t.status === 'active' ? 'success' : 'neutral'}`}>{t.status}</span>
                  </label>
                ))}
              </div>
              {allTables.length === 0 && (
                <p className="muted">Add tables in the Tables section first.</p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
