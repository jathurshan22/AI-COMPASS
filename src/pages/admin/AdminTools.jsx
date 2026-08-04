import { useState } from "react";
import ToolLogo from "../../components/ToolLogo.jsx";
import Icon from "../../components/Icon.jsx";
import Modal from "../../components/Modal.jsx";
import FormSelect from "../../components/FormSelect.jsx";
import { tools as seedTools } from "../../data/tools.js";

const blank = { name: "", tagline: "", categories: "", pricing: "freemium", skillLevel: "beginner", rating: 4.5, popularity: 80, website: "", users: "", model: "" };
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminTools() {
  const [list, setList] = useState(() => [...seedTools].sort((a, b) => b.popularity - a.popularity));
  const [q, setQ] = useState("");
  const [form, setForm] = useState(null);       // { ...fields, _slug? } when open
  const [editing, setEditing] = useState(null); // slug being edited
  const [remove, setRemove] = useState(null);   // tool pending delete

  const filtered = list.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openAdd = () => { setEditing(null); setForm({ ...blank }); };
  const openEdit = (t) => {
    setEditing(t.slug);
    setForm({ name: t.name, tagline: t.tagline || "", categories: (t.categories || []).join(", "), pricing: t.pricing, skillLevel: t.skillLevel, rating: t.rating, popularity: t.popularity, website: t.website || "", users: t.users || "", model: t.model || "" });
  };

  const save = () => {
    if (!form.name.trim()) return;
    const record = {
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
      pricing: form.pricing,
      skillLevel: form.skillLevel,
      rating: Math.max(0, Math.min(5, Number(form.rating) || 0)),
      popularity: Math.max(0, Math.min(100, Number(form.popularity) || 0)),
      website: form.website.trim(),
      users: form.users.trim(),
      model: form.model.trim(),
    };
    if (editing) {
      setList((l) => l.map((t) => (t.slug === editing ? { ...t, ...record } : t)));
    } else {
      const slug = slugify(record.name) || `tool-${Date.now()}`;
      setList((l) => [{ slug, brand: "#2563EB", ...record }, ...l]);
    }
    setForm(null); setEditing(null);
  };

  const confirmDelete = () => {
    setList((l) => l.filter((t) => t.slug !== remove.slug));
    setRemove(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>AI Tools</h1><p className="muted">{list.length} tools in the directory.</p></div>
        <button className="btn btn-primary btn-sm" onClick={openAdd}><Icon name="plus" size={16} />Add tool</button>
      </div>

      <div className="admin-search">
        <Icon name="search" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools by name…" />
      </div>

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Tool</th><th>Categories</th><th>Pricing</th><th>Rating</th><th>Popularity</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.slug}>
                <td><span className="admin-tool-cell"><ToolLogo tool={t} size={20} /><strong>{t.name}</strong></span></td>
                <td className="muted cap">{t.categories.slice(0, 2).join(", ")}</td>
                <td><span className={`pill pill-${t.pricing}`}>{t.pricing}</span></td>
                <td className="mono">{Number(t.rating).toFixed(1)}</td>
                <td><div className="mini-bar" style={{ width: 90 }}><span style={{ width: `${t.popularity}%` }} /></div></td>
                <td>
                  <div className="admin-row-actions">
                    <button title="Edit" onClick={() => openEdit(t)}><Icon name="edit" size={16} /></button>
                    <button className="danger" title="Delete" onClick={() => setRemove(t)}><Icon name="trash" size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="admin-empty-row muted">No tools match “{q}”.</td></tr>}
          </tbody>
        </table>
      </div>

      {form && (
        <Modal
          title={editing ? "Edit tool" : "Add tool"}
          subtitle={editing ? "Update the tool's details." : "Add a new AI tool to the directory."}
          onClose={() => { setForm(null); setEditing(null); }}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => { setForm(null); setEditing(null); }}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={save}><Icon name="check" size={16} />{editing ? "Save changes" : "Add tool"}</button>
          </>}
        >
          <div className="form-grid">
            <div className="form-field full"><label>Name</label><input value={form.name} onChange={set("name")} placeholder="e.g. ChatGPT" /></div>
            <div className="form-field full"><label>Tagline</label><input value={form.tagline} onChange={set("tagline")} placeholder="One-line description" /></div>
            <div className="form-field full"><label>Categories</label><input value={form.categories} onChange={set("categories")} placeholder="coding, writing, research" /><span className="form-hint">Comma-separated slugs.</span></div>
            <div className="form-field"><label>Pricing</label>
              <FormSelect value={form.pricing} onChange={(v) => setForm((f) => ({ ...f, pricing: v }))}
                options={[{ value: "free", label: "Free" }, { value: "freemium", label: "Freemium" }, { value: "paid", label: "Paid" }]} />
            </div>
            <div className="form-field"><label>Skill level</label>
              <FormSelect value={form.skillLevel} onChange={(v) => setForm((f) => ({ ...f, skillLevel: v }))}
                options={[{ value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" }]} />
            </div>
            <div className="form-field"><label>Rating (0–5)</label><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={set("rating")} /></div>
            <div className="form-field"><label>Popularity (0–100)</label><input type="number" min="0" max="100" value={form.popularity} onChange={set("popularity")} /></div>
            <div className="form-field"><label>Users</label><input value={form.users} onChange={set("users")} placeholder="e.g. 180M" /></div>
            <div className="form-field"><label>Model / version</label><input value={form.model} onChange={set("model")} placeholder="e.g. GPT-4o" /></div>
            <div className="form-field full"><label>Website</label><input value={form.website} onChange={set("website")} placeholder="https://…" /></div>
          </div>
        </Modal>
      )}

      {remove && (
        <Modal
          size="sm"
          title="Delete tool"
          onClose={() => setRemove(null)}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => setRemove(null)}>Cancel</button>
            <button className="btn btn-sm admin-danger-btn" onClick={confirmDelete}><Icon name="trash" size={16} />Delete</button>
          </>}
        >
          <p>Delete <strong>{remove.name}</strong> from the directory? This can't be undone.</p>
        </Modal>
      )}
    </div>
  );
}
