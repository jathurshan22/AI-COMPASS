import { useState } from "react";
import Avatar from "../../components/Avatar.jsx";
import Icon from "../../components/Icon.jsx";
import Modal from "../../components/Modal.jsx";
import { adminUsers } from "../../data/adminData.js";

export default function AdminUsers() {
  const [list, setList] = useState(() => [...adminUsers]);
  const [q, setQ] = useState("");
  const [remove, setRemove] = useState(null);

  const filtered = list.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  );

  const confirmDelete = () => {
    setList((l) => l.filter((u) => u.email !== remove.email));
    setRemove(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>Users</h1><p className="muted">{list.length} shown · 1,284 total registered.</p></div>
      </div>

      <div className="admin-search">
        <Icon name="search" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users by name or email…" />
      </div>

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Role</th><th>Searches</th><th>Joined</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.email}>
                <td><span className="admin-user-cell"><Avatar name={u.name} size={32} /><strong>{u.name}</strong></span></td>
                <td className="muted">{u.email}</td>
                <td><span className={`pill ${u.role === "admin" ? "pill-paid" : "pill-freemium"}`}>{u.role}</span></td>
                <td className="mono">{u.searches}</td>
                <td className="muted">{u.joined}</td>
                <td>
                  <div className="admin-row-actions">
                    <button className="danger" title="Remove user" onClick={() => setRemove(u)}><Icon name="trash" size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="admin-empty-row muted">No users match “{q}”.</td></tr>}
          </tbody>
        </table>
      </div>

      {remove && (
        <Modal
          size="sm"
          title="Remove user"
          onClose={() => setRemove(null)}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => setRemove(null)}>Cancel</button>
            <button className="btn btn-sm admin-danger-btn" onClick={confirmDelete}><Icon name="trash" size={16} />Remove</button>
          </>}
        >
          <p>Remove <strong>{remove.name}</strong> ({remove.email})? They'll lose access to their account.</p>
        </Modal>
      )}
    </div>
  );
}
