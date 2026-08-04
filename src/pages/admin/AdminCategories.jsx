import { useState } from "react";
import CategoryIcon from "../../components/CategoryIcon.jsx";
import Icon from "../../components/Icon.jsx";
import Modal from "../../components/Modal.jsx";
import { categories as seedCategories } from "../../data/categories.js";
import { tools } from "../../data/tools.js";

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const blank = { name: "", description: "" };

export default function AdminCategories() {
  const [list, setList] = useState(() => seedCategories.map((c) => ({ ...c })));
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);
  const [remove, setRemove] = useState(null);

  const countFor = (slug) => tools.filter((t) => t.categories.includes(slug)).length;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openAdd = () => { setEditing(null); setForm({ ...blank }); };
  const openEdit = (c) => { setEditing(c.slug); setForm({ name: c.name, description: c.description || "" }); };

  const save = () => {
    if (!form.name.trim()) return;
    const record = { name: form.name.trim(), description: form.description.trim() };
    if (editing) {
      setList((l) => l.map((c) => (c.slug === editing ? { ...c, ...record } : c)));
    } else {
      const slug = slugify(record.name) || `cat-${Date.now()}`;
      setList((l) => [...l, { slug, icon: "", ...record }]);
    }
    setForm(null); setEditing(null);
  };

  const confirmDelete = () => { setList((l) => l.filter((c) => c.slug !== remove.slug)); setRemove(null); };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>Categories</h1><p className="muted">{list.length} categories organizing the directory.</p></div>
        <button className="btn btn-primary btn-sm" onClick={openAdd}><Icon name="plus" size={16} />Add category</button>
      </div>

      <div className="admin-cat-grid">
        {list.map((c) => (
          <div key={c.slug} className="admin-cat">
            <span className="admin-cat-ic"><CategoryIcon slug={c.slug} size={22} /></span>
            <div className="admin-cat-body">
              <strong>{c.name}</strong>
              <p className="muted">{c.description}</p>
              <span className="admin-cat-count mono">{countFor(c.slug)} tools</span>
            </div>
            <div className="admin-cat-actions">
              <button title="Edit" onClick={() => openEdit(c)}><Icon name="edit" size={16} /></button>
              <button className="danger" title="Delete" onClick={() => setRemove(c)}><Icon name="trash" size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {form && (
        <Modal
          size="sm"
          title={editing ? "Edit category" : "Add category"}
          subtitle={editing ? "Update this category." : "Create a new category."}
          onClose={() => { setForm(null); setEditing(null); }}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => { setForm(null); setEditing(null); }}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={save}><Icon name="check" size={16} />{editing ? "Save changes" : "Add category"}</button>
          </>}
        >
          <div className="form-grid">
            <div className="form-field full"><label>Name</label><input value={form.name} onChange={set("name")} placeholder="e.g. Productivity" /></div>
            <div className="form-field full"><label>Description</label><textarea rows={3} value={form.description} onChange={set("description")} placeholder="What this category is for…" /></div>
          </div>
        </Modal>
      )}

      {remove && (
        <Modal
          size="sm"
          title="Delete category"
          onClose={() => setRemove(null)}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => setRemove(null)}>Cancel</button>
            <button className="btn btn-sm admin-danger-btn" onClick={confirmDelete}><Icon name="trash" size={16} />Delete</button>
          </>}
        >
          <p>Delete the <strong>{remove.name}</strong> category? Tools won't be removed, just this grouping.</p>
        </Modal>
      )}
    </div>
  );
}
