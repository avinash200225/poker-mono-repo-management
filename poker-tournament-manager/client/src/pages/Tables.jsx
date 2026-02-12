import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => api('/api/tables').then((r) => r.json()).then(setTables);

  useEffect(() => {
    load();
  }, []);

  const create = () => {
    setModal({ mode: 'create', serial_number: '', name: '', status: 'inactive', location: '', notes: '' });
  };

  const save = () => {
    if (!modal) return;
    const url = modal.mode === 'create' ? '/api/tables' : `/api/tables/${modal.id}`;
    const method = modal.mode === 'create' ? 'POST' : 'PUT';
    api(url, {
      method,
      body: JSON.stringify({
        serial_number: modal.serial_number,
        name: modal.name,
        status: modal.status,
        location: modal.location,
        notes: modal.notes,
      }),
    }).then(() => {
      setModal(null);
      load();
    });
  };

  const toggleStatus = (t) => {
    const next = t.status === 'active' ? 'inactive' : 'active';
    api(`/api/tables/${t.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: next }),
    }).then(load);
  };

  const remove = (id) => {
    if (!confirm('Remove this table?')) return;
    api(`/api/tables/${id}`, { method: 'DELETE' }).then(load);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Tables</h1>
          <p>Track tablet serial numbers and table status</p>
        </div>
        <button className="btn btn-primary" onClick={create}>+ Add Table</button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Name</th>
              <th>Status</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((t) => (
              <tr key={t.id}>
                <td><code>{t.serial_number || '—'}</code></td>
                <td>{t.name}</td>
                <td>
                  <span className={`badge badge-${t.status === 'active' ? 'success' : 'neutral'}`}>
                    {t.status}
                  </span>
                  <button className="btn btn-sm btn-secondary" style={{ marginLeft: '0.5rem' }}
                    onClick={() => toggleStatus(t)}>
                    Set {t.status === 'active' ? 'Inactive' : 'Active'}
                  </button>
                </td>
                <td>{t.location || '—'}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }}
                    onClick={() => setModal({ mode: 'edit', ...t })}>Edit</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => remove(t.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tables.length === 0 && (
          <p className="muted" style={{ padding: '2rem', textAlign: 'center' }}>
            No tables. Add tables with tablet serial numbers to identify them.
          </p>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.mode === 'create' ? 'Add Table' : 'Edit Table'}</h3>
            <div className="form-group">
              <label>Tablet Serial Number</label>
              <input
                value={modal.serial_number}
                onChange={(e) => setModal((m) => ({ ...m, serial_number: e.target.value }))}
                placeholder="e.g. TAB-001-ABC123"
              />
              <label>Name</label>
              <input
                value={modal.name}
                onChange={(e) => setModal((m) => ({ ...m, name: e.target.value }))}
                placeholder="Table 1"
              />
              <label>Status</label>
              <select
                value={modal.status}
                onChange={(e) => setModal((m) => ({ ...m, status: e.target.value }))}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <label>Location</label>
              <input
                value={modal.location}
                onChange={(e) => setModal((m) => ({ ...m, location: e.target.value }))}
                placeholder="Main hall"
              />
              <label>Notes</label>
              <textarea
                value={modal.notes}
                onChange={(e) => setModal((m) => ({ ...m, notes: e.target.value }))}
                rows={2}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={save}>Save</button>
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
