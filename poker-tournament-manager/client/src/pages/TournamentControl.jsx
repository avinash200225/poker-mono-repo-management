import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

function AssignTableModal({ tables, assignedIds, onAssign, onCancel }) {
  const [tableId, setTableId] = useState('');
  const [tableNum, setTableNum] = useState('');
  const available = tables.filter((t) => !assignedIds.includes(t.id));
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Assign Table</h3>
        <div className="form-group">
          <label>Table (by serial number)</label>
          <select value={tableId} onChange={(e) => setTableId(e.target.value)}>
            <option value="">Select...</option>
            {available.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.serial_number || 'no serial'})</option>
            ))}
          </select>
          <label>Table Number in Tournament</label>
          <input type="number" value={tableNum} onChange={(e) => setTableNum(e.target.value)} placeholder="1" />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onAssign(tableId, tableNum || null)} disabled={!tableId}>
            Assign
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AddPlayerModal({ players, registeredIds, onAdd, onCancel }) {
  const [playerId, setPlayerId] = useState('');
  const [seat, setSeat] = useState('');
  const [tableNum, setTableNum] = useState('');
  const available = players.filter((p) => !registeredIds.includes(p.id));
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Player</h3>
        <div className="form-group">
          <label>Player</label>
          <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
            <option value="">Select...</option>
            {available.map((p) => (
              <option key={p.id} value={p.id}>{p.display_name || `Player ${p.external_uid}`}</option>
            ))}
          </select>
          <label>Seat (optional)</label>
          <input type="number" value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="1" />
          <label>Table (optional)</label>
          <input type="number" value={tableNum} onChange={(e) => setTableNum(e.target.value)} placeholder="1" />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onAdd(playerId, seat || null, tableNum || null)} disabled={!playerId}>
            Add
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function EliminateModal({ reg, onConfirm, onCancel }) {
  const [position, setPosition] = useState('');
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Eliminate {reg?.display_name}</h3>
        <div className="form-group">
          <label>Final Position (e.g. 12 for 12th place)</label>
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="12"
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onConfirm(Number(position) || 0)}>
            Confirm Elimination
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function TournamentControl() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [tables, setTables] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [editingChips, setEditingChips] = useState(null);
  const [eliminateModal, setEliminateModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [assignTableModal, setAssignTableModal] = useState(false);

  const load = () => {
    api(`/api/tournaments/${id}`).then((r) => r.json()).then(setTournament).catch(() => setTournament(null));
    api(`/api/tournaments/${id}/registrations`).then((r) => r.json()).then(setRegistrations);
    api(`/api/tournaments/${id}/tables`).then((r) => r.json()).then(setTables);
    api('/api/players').then((r) => r.json()).then(setPlayers);
    api('/api/tables').then((r) => r.json()).then(setAllTables);
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateChips = (regId, chips, reason = 'hand_result') => {
    api(`/api/tournaments/${id}/registrations/${regId}`, {
      method: 'PATCH',
      body: JSON.stringify({ current_chips: Number(chips), reason }),
    }).then(() => {
      setEditingChips(null);
      load();
    });
  };

  const eliminate = (reg, position) => {
    api(`/api/tournaments/${id}/registrations/${reg.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        eliminated_at_round: 1,
        position,
        current_chips: 0,
      }),
    }).then(() => {
      setEliminateModal(null);
      load();
    });
  };

  const addRegistration = (playerId, seat, tableNum) => {
    if (!playerId) return;
    api(`/api/tournaments/${id}/registrations`, {
      method: 'POST',
      body: JSON.stringify({
        player_id: Number(playerId),
        seat_number: seat ? Number(seat) : null,
        table_number: tableNum ? Number(tableNum) : null,
        starting_chips: tournament?.starting_chips ?? 10000,
      }),
    }).then(() => {
      setAddModal(false);
      load();
    });
  };

  if (!tournament) return <div className="card"><p>Loading...</p></div>;

  const active = registrations.filter((r) => r.eliminated_at_round == null);
  const eliminated = registrations.filter((r) => r.eliminated_at_round != null);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{tournament.name}</h1>
          <p>{tournament.event_date} · {tournament.status} · {active.length} in play · {eliminated.length} eliminated</p>
        </div>
        <Link to="/tournaments" className="btn btn-secondary">← Back</Link>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <span className="stat-value">{active.length}</span>
          <span className="stat-label">In Play</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{eliminated.length}</span>
          <span className="stat-label">Eliminated</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{tables.length}</span>
          <span className="stat-label">Tables</span>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Players & Chip Counts
          <button className="btn btn-sm btn-primary" onClick={() => setAddModal(true)}>+ Add Player</button>
        </h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Seat</th>
              <th>Table</th>
              <th>Chips</th>
              <th>Dr. Neau</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, idx) => (
              <tr key={r.id} className={r.eliminated_at_round != null ? 'eliminated' : ''}>
                <td>{r.position ?? (r.eliminated_at_round == null ? '—' : idx + 1)}</td>
                <td>{r.display_name}</td>
                <td>{r.seat_number ?? '—'}</td>
                <td>{r.table_number != null ? `Table ${r.table_number}` : '—'}</td>
                <td>
                  {editingChips === r.id ? (
                    <input
                      type="number"
                      defaultValue={r.current_chips ?? r.starting_chips}
                      onBlur={(e) => updateChips(r.id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && updateChips(r.id, e.target.value)}
                      autoFocus
                      style={{ width: '80px', padding: '0.25rem' }}
                    />
                  ) : (
                    <span onClick={() => setEditingChips(r.id)} className="chips-editable">
                      {(r.current_chips ?? r.starting_chips ?? 0).toLocaleString()}
                    </span>
                  )}
                </td>
                <td>
                  {r.dr_neau_points != null ? (
                    <span title="Dr. Neau: LN((Players+1)/Rank)" className="badge badge-success">
                      {Number(r.dr_neau_points).toFixed(2)}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {r.eliminated_at_round != null ? (
                    <span className="badge badge-neutral">#{r.position} eliminated</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td>
                  {r.eliminated_at_round == null && (
                    <button className="btn btn-sm btn-secondary"
                      onClick={() => setEliminateModal({ reg: r })}>Eliminate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {eliminated.length > 0 && (
        <div className="card">
          <h3>Standings (Dr. Neau)</h3>
          <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
            Points = LN((Players+1) / Rank). Higher is better.
          </p>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {registrations
                .filter((r) => r.position != null)
                .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
                .map((r) => (
                  <tr key={r.id}>
                    <td>#{r.position}</td>
                    <td>{r.display_name}</td>
                    <td>{r.dr_neau_points != null ? Number(r.dr_neau_points).toFixed(2) : '—'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Tables in Use
          <button className="btn btn-sm btn-primary" onClick={() => setAssignTableModal(true)}>+ Assign Table</button>
        </h3>
        {tables.length === 0 ? (
          <p className="muted">No tables assigned. Assign tables to link tablet serial numbers.</p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {tables.map((t) => (
              <div key={t.id} className="table-badge">
                <strong>Table {t.table_number ?? t.id}</strong>
                <span>{t.table_name}</span>
                <code>{t.serial_number}</code>
                <button className="btn btn-sm btn-secondary" style={{ marginTop: '0.5rem' }}
                  onClick={() => api(`/api/tournaments/${id}/tables/${t.id}`, { method: 'DELETE' }).then(load)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {assignTableModal && (
        <AssignTableModal
          tables={allTables}
          assignedIds={tables.map((t) => t.table_id)}
          onAssign={(tableId, tableNum) => {
            api(`/api/tournaments/${id}/tables`, {
              method: 'POST',
              body: JSON.stringify({ table_id: tableId, table_number: tableNum }),
            }).then(() => {
              setAssignTableModal(false);
              load();
            });
          }}
          onCancel={() => setAssignTableModal(false)}
        />
      )}

      {addModal && (
        <AddPlayerModal
          players={players}
          registeredIds={registrations.map((r) => r.player_id)}
          onAdd={addRegistration}
          onCancel={() => setAddModal(false)}
        />
      )}
      {eliminateModal && (
        <EliminateModal
          reg={eliminateModal.reg}
          onConfirm={(position) => { eliminate(eliminateModal.reg, position); setEliminateModal(null); }}
          onCancel={() => setEliminateModal(null)}
        />
      )}
    </div>
  );
}
