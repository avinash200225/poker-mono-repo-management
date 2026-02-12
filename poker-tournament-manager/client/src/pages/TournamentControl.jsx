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

function EliminateModal({ reg, eliminatedCount, onConfirm, onCancel }) {
  const suggestedPos = (eliminatedCount ?? 0) + 1;
  const [position, setPosition] = useState(String(suggestedPos));
  const numPos = Number(position) || 0;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Eliminate {reg?.display_name}</h3>
        <div className="form-group">
          <label>Final Position (1=winner, 2=2nd, etc.) — Dr. Neau: LN((N+1)/Rank)</label>
          <input
            type="number"
            min="1"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder={String(suggestedPos)}
          />
          {eliminatedCount > 0 && (
            <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {eliminatedCount} already eliminated. Suggested: {suggestedPos}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onConfirm(numPos)} disabled={numPos < 1}>
            Confirm Elimination
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function MovePlayerModal({ reg, tables, onMove, onCancel }) {
  const [tableNum, setTableNum] = useState(reg?.table_number ?? '');
  const [seatNum, setSeatNum] = useState(reg?.seat_number ?? '');
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Move {reg?.display_name}</h3>
        <div className="form-group">
          <label>Table</label>
          <select value={tableNum} onChange={(e) => setTableNum(e.target.value)}>
            <option value="">—</option>
            {tables.map((t) => (
              <option key={t.id} value={t.table_number ?? t.id}>Table {t.table_number ?? t.id}</option>
            ))}
          </select>
          <label>Seat</label>
          <input type="number" value={seatNum} onChange={(e) => setSeatNum(e.target.value)} placeholder="1" />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onMove(seatNum ? Number(seatNum) : null, tableNum ? Number(tableNum) : null)}>
            Move
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function RejoinModal({ reg, tables, onRejoin, onCancel }) {
  const [tableNum, setTableNum] = useState(reg?.table_number ?? '');
  const [seatNum, setSeatNum] = useState(reg?.seat_number ?? '');
  const [clientIp, setClientIp] = useState(reg?.client_ip ?? '');
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Rejoin: {reg?.display_name}</h3>
        <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          Chips saved: {(reg?.cashed_out_chips ?? reg?.current_chips ?? 0).toLocaleString()}
        </p>
        <div className="form-group">
          <label>Table</label>
          <select value={tableNum} onChange={(e) => setTableNum(e.target.value)}>
            <option value="">—</option>
            {tables.map((t) => (
              <option key={t.id} value={t.table_number ?? t.id}>Table {t.table_number ?? t.id}</option>
            ))}
          </select>
          <label>Seat</label>
          <input type="number" value={seatNum} onChange={(e) => setSeatNum(e.target.value)} placeholder="1" />
          <label>Tablet IP (identifies this seat)</label>
          <input type="text" value={clientIp} onChange={(e) => setClientIp(e.target.value)} placeholder="192.168.1.105" />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onRejoin(seatNum ? Number(seatNum) : null, tableNum ? Number(tableNum) : null, clientIp || null)}>
            Rejoin
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function RebuyModal({ reg, startingChips, onRebuy, onCancel }) {
  const [chips, setChips] = useState(startingChips);
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Rebuy / Add-on: {reg?.display_name}</h3>
        <div className="form-group">
          <label>Chips to add</label>
          <input type="number" value={chips} onChange={(e) => setChips(Number(e.target.value) || 0)} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onRebuy(chips)}>Add Chips</button>
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
  const [tournamentStats, setTournamentStats] = useState(null);
  const [hands, setHands] = useState([]);
  const [sessionCheckins, setSessionCheckins] = useState([]);
  const [tables, setTables] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [editingChips, setEditingChips] = useState(null);
  const [eliminateModal, setEliminateModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [assignTableModal, setAssignTableModal] = useState(false);
  const [moveModal, setMoveModal] = useState(null);
  const [rebuyModal, setRebuyModal] = useState(null);
  const [rejoinModal, setRejoinModal] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const load = () => {
    api(`/api/tournaments/${id}`).then((r) => r.json()).then(setTournament).catch(() => setTournament(null));
    api(`/api/tournaments/${id}/registrations`).then((r) => r.json()).then(setRegistrations);
    api(`/api/tournaments/${id}/stats`).then((r) => r.json()).then(setTournamentStats).catch(() => setTournamentStats(null));
    api(`/api/hands?tournament_id=${id}`).then((r) => r.json()).then(setHands).catch(() => setHands([]));
    api(`/api/tournaments/${id}/session-checkins`).then((r) => r.json()).then(setSessionCheckins).catch(() => setSessionCheckins([]));
    api(`/api/tournaments/${id}/tables`).then((r) => r.json()).then(setTables);
    api('/api/players').then((r) => r.json()).then(setPlayers);
    api('/api/tables').then((r) => r.json()).then(setAllTables);
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    if (!autoRefresh || !id) return;
    const iv = setInterval(load, 5000);
    return () => clearInterval(iv);
  }, [autoRefresh, id]);

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

  const movePlayer = (reg, seatNum, tableNum) => {
    api(`/api/tournaments/${id}/registrations/${reg.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ seat_number: seatNum ?? null, table_number: tableNum ?? null }),
    }).then(() => {
      setMoveModal(null);
      load();
    }).catch((e) => {
      alert('Move failed: ' + (e.message || 'Unknown error'));
    });
  };

  const rebuyPlayer = (reg, chips, reason = 'rebuys') => {
    const current = reg.current_chips ?? reg.starting_chips ?? 0;
    api(`/api/tournaments/${id}/registrations/${reg.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ current_chips: current + chips, reason, notes: 'Rebuy' }),
    }).then(() => {
      setRebuyModal(null);
      load();
    }).catch((e) => alert('Rebuy failed: ' + (e.message || 'Unknown error')));
  };

  const removePlayer = (reg) => {
    if (!confirm(`Remove ${reg.display_name} from tournament? This cannot be undone.`)) return;
    api(`/api/tournaments/${id}/registrations/${reg.id}`, { method: 'DELETE' })
      .then((r) => r.ok ? load() : r.json().then((d) => { alert(d?.error || 'Remove failed'); }))
      .catch((e) => alert('Remove failed: ' + (e.message || 'Unknown error')));
  };

  const confirmRejoin = (reg, seatNum, tableNum, clientIp) => {
    api(`/api/tournaments/${id}/registrations/${reg.id}/rejoin`, {
      method: 'POST',
      body: JSON.stringify({ seat_number: seatNum, table_number: tableNum, client_ip: clientIp }),
    }).then(() => {
      setRejoinModal(null);
      load();
    }).catch((e) => alert('Rejoin failed: ' + (e.message || 'Unknown error')));
  };

  const cashOutPlayer = (reg) => {
    if (!confirm(`Cash out ${reg.display_name}? Their chips will be saved; they can rejoin at another table.`)) return;
    api(`/api/tournaments/${id}/registrations/${reg.id}/cash-out`, { method: 'POST' })
      .then(() => load())
      .catch((e) => alert('Cash out failed: ' + (e.message || 'Unknown error')));
  };

  const rejoinPlayer = (reg) => {
    setRejoinModal(reg);
  };

  if (!tournament) return <div className="card"><p>Loading...</p></div>;

  const active = registrations.filter((r) => r.eliminated_at_round == null && r.status !== 'cashed_out');
  const cashedOut = registrations.filter((r) => r.status === 'cashed_out');
  const eliminated = registrations.filter((r) => r.eliminated_at_round != null);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{tournament.name}</h1>
          <p>{tournament.event_date} · <span className={`badge badge-${tournament.status === 'completed' ? 'neutral' : tournament.status === 'active' ? 'success' : 'warning'}`}>{tournament.status}</span> · {active.length} in play · {eliminated.length} eliminated</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {(tournament.status === 'active' || tournament.status === 'draft') && (
            <button className="btn btn-primary" onClick={async () => {
              if (!confirm('End this tournament? Final positions will be assigned by chip count.')) return;
              try {
                const res = await api(`/api/tournaments/${id}/end`, { method: 'POST' });
                if (!res.ok) {
                  const text = await res.text();
                  let errMsg = `Error ${res.status}`;
                  try {
                    const err = JSON.parse(text);
                    if (err?.error) errMsg = err.error;
                  } catch { if (text) errMsg = text.slice(0, 100); }
                  throw new Error(errMsg);
                }
                load();
              } catch (e) {
                alert('End tournament failed: ' + (e.message || 'Unknown error'));
              }
            }}>
              End tournament
            </button>
          )}
          <Link to="/tournaments" className="btn btn-secondary">← Back</Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
          Auto-refresh every 5s
        </label>
        <button className="btn btn-sm btn-secondary" onClick={load}>Refresh now</button>
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
        <div className="stat-card">
          <span className="stat-value">{(tournamentStats?.totalChips ?? 0).toLocaleString()}</span>
          <span className="stat-label">Total Chips</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{(tournamentStats?.avgStack ?? 0).toLocaleString()}</span>
          <span className="stat-label">Avg Stack</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{tournamentStats?.handsPlayed ?? 0}</span>
          <span className="stat-label">Hands</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{(tournamentStats?.rebuys ?? 0).toLocaleString()}</span>
          <span className="stat-label">Rebuys</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{cashedOut.length}</span>
          <span className="stat-label">Cashed Out</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{sessionCheckins.length}</span>
          <span className="stat-label">Check-ins</span>
        </div>
      </div>

      {sessionCheckins.length > 0 && (
        <div className="card">
          <h3>Session Check-ins (Name entered on tablet)</h3>
          <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
            Players who entered their name on the first tablet screen before proceeding.
          </p>
          <table>
            <thead>
              <tr>
                <th>Name / Username</th>
                <th>Seat (UID)</th>
                <th>IP</th>
                <th>Checked in</th>
              </tr>
            </thead>
            <tbody>
              {sessionCheckins.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.display_name}</strong></td>
                  <td><code>{c.external_uid}</code></td>
                  <td>{c.client_ip || '—'}</td>
                  <td>{c.checked_in_at ? new Date(c.checked_in_at).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              <th>Tablet IP</th>
              <th>Chips</th>
              <th>Points</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, idx) => (
              <tr key={r.id} className={r.eliminated_at_round != null ? 'eliminated' : r.status === 'cashed_out' ? 'cashed-out' : ''}>
                <td>{r.position ?? (r.eliminated_at_round == null ? '—' : idx + 1)}</td>
                <td>{r.display_name}</td>
                <td>{r.seat_number ?? '—'}</td>
                <td>{r.table_number != null ? `Table ${r.table_number}` : '—'}</td>
                <td><code style={{ fontSize: '0.8rem' }}>{r.client_ip || '—'}</code></td>
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
                    <span title="Dr. Neau" className="badge badge-success">{Number(r.dr_neau_points).toFixed(2)}</span>
                  ) : r.dr_neau_reworked_points != null ? (
                    <span title="Reworked" className="badge badge-success">{Number(r.dr_neau_reworked_points).toFixed(2)}</span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {r.eliminated_at_round != null ? (
                    <span className="badge badge-neutral">#{r.position} eliminated</span>
                  ) : r.status === 'cashed_out' ? (
                    <span className="badge badge-neutral">Cashed out</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td>
                  {r.status === 'cashed_out' ? (
                    <button className="btn btn-sm btn-primary" onClick={() => rejoinPlayer(r)}>Rejoin</button>
                  ) : r.eliminated_at_round == null ? (
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => setMoveModal(r)}>Move</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setRebuyModal(r)}>Rebuy</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => cashOutPlayer(r)}>Cash Out</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEliminateModal({ reg: r })}>Eliminate</button>
                      <button className="btn btn-sm btn-secondary" style={{ color: 'var(--accent-red)' }} onClick={() => removePlayer(r)}>Remove</button>
                    </div>
                  ) : (
                    <button className="btn btn-sm btn-secondary" style={{ color: 'var(--accent-red)' }} onClick={() => removePlayer(r)}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Points & Standings
          {eliminated.length > 0 && (
            <button className="btn btn-sm btn-secondary" onClick={() => api(`/api/tournaments/${id}/recalculate-points`, { method: 'POST' }).then(() => load()).catch(e => alert('Recalculate failed: ' + (e.message || 'Unknown error')))}>
              Recalculate points
            </button>
          )}
        </h3>
        <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
          Dr. Neau: LN((Players+1)/Rank). Reworked: (PrizePool/√(Players·Spend))·(1/(1+Rank)). Points are calculated when a player is eliminated.
        </p>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Chips</th>
              <th>Dr. Neau</th>
              <th>Reworked</th>
            </tr>
          </thead>
          <tbody>
            {[...active]
              .sort((a, b) => (b.current_chips ?? b.starting_chips ?? 0) - (a.current_chips ?? a.starting_chips ?? 0))
              .map((r, i) => (
                <tr key={r.id}>
                  <td>#{i + 1}</td>
                  <td>{r.display_name}</td>
                  <td>{(r.current_chips ?? r.starting_chips ?? 0).toLocaleString()}</td>
                  <td colSpan={2} className="muted">In play</td>
                </tr>
              ))}
            {eliminated
              .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
              .map((r) => (
                <tr key={r.id} className="eliminated">
                  <td>#{r.position}</td>
                  <td>{r.display_name}</td>
                  <td>—</td>
                  <td>{r.dr_neau_points != null ? Number(r.dr_neau_points).toFixed(2) : '—'}</td>
                  <td>{r.dr_neau_reworked_points != null ? Number(r.dr_neau_reworked_points).toFixed(3) : '—'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Tables in Use
          <button className="btn btn-sm btn-primary" onClick={() => setAssignTableModal(true)}>+ Assign Table</button>
        </h3>
        {tables.length === 0 ? (
          <p className="muted">No tables assigned. Assign tables to link tablet serial numbers.</p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {tables.map((t) => {
              const playersAtTable = registrations.filter((r) => r.table_number === (t.table_number ?? t.id) && r.eliminated_at_round == null);
              return (
                <div key={t.id} className="table-badge">
                  <strong>Table {t.table_number ?? t.id}</strong>
                  <span>{t.table_name}</span>
                  <code>{t.serial_number}</code>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{playersAtTable.length} players</span>
                  <button className="btn btn-sm btn-secondary" style={{ marginTop: '0.5rem' }}
                    onClick={() => api(`/api/tournaments/${id}/tables/${t.id}`, { method: 'DELETE' }).then(load)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {hands.length > 0 && (
        <div className="card">
          <h3>Recent Hands</h3>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Table</th>
                <th>Pot</th>
                <th>Winning Hand</th>
                <th>Players</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {hands.slice(0, 15).map((h) => (
                <tr key={h.id}>
                  <td>#{h.round_id}</td>
                  <td>{h.table_id || '—'}</td>
                  <td>{(h.pot_amount ?? 0).toLocaleString()}</td>
                  <td>{h.winning_hand || '—'}</td>
                  <td>{h.players_count ?? 0}</td>
                  <td>{h.timestamp ? new Date(h.timestamp).toLocaleTimeString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active.length > 0 && (
        <div className="card">
          <h3>Leaderboard (by chips)</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Table</th>
                <th>Chips</th>
                <th>BBs*</th>
              </tr>
            </thead>
            <tbody>
              {[...active]
                .sort((a, b) => (b.current_chips ?? b.starting_chips ?? 0) - (a.current_chips ?? a.starting_chips ?? 0))
                .map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td><strong>{r.display_name}</strong></td>
                    <td>{r.table_number != null ? `Table ${r.table_number}` : '—'}</td>
                    <td>{(r.current_chips ?? r.starting_chips ?? 0).toLocaleString()}</td>
                    <td className="muted">—</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>* BBs = big blinds (requires blind level)</p>
        </div>
      )}

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
          eliminatedCount={eliminated.length}
          onConfirm={(position) => { eliminate(eliminateModal.reg, position); setEliminateModal(null); }}
          onCancel={() => setEliminateModal(null)}
        />
      )}
      {moveModal && (
        <MovePlayerModal
          reg={moveModal}
          tables={tables}
          onMove={(seatNum, tableNum) => movePlayer(moveModal, seatNum, tableNum)}
          onCancel={() => setMoveModal(null)}
        />
      )}
      {rebuyModal && (
        <RebuyModal
          reg={rebuyModal}
          startingChips={tournament?.starting_chips ?? 10000}
          onRebuy={(chips) => rebuyPlayer(rebuyModal, chips)}
          onCancel={() => setRebuyModal(null)}
        />
      )}
      {rejoinModal && (
        <RejoinModal
          reg={rejoinModal}
          tables={tables}
          onRejoin={(seatNum, tableNum, clientIp) => confirmRejoin(rejoinModal, seatNum, tableNum, clientIp)}
          onCancel={() => setRejoinModal(null)}
        />
      )}
    </div>
  );
}
