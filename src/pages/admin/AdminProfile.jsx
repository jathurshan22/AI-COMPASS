import { useRef, useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import Avatar from "../../components/Avatar.jsx";
import Icon from "../../components/Icon.jsx";
import Modal from "../../components/Modal.jsx";

export default function AdminProfile() {
  const { user, setPhoto, updateProfile } = useApp();
  const fileRef = useRef(null);
  const [edit, setEdit] = useState(null); // { name, email }

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };

  const saveEdit = () => {
    if (!edit.name.trim()) return;
    updateProfile({ name: edit.name.trim(), email: edit.email.trim() });
    setEdit(null);
  };

  const info = [
    { label: "Role", value: "Administrator", icon: "user" },
    { label: "Member since", value: "January 2026", icon: "spark" },
    { label: "Tools managed", value: "18", icon: "robot" },
    { label: "Reviews moderated", value: "312", icon: "star" },
    { label: "Categories", value: "10", icon: "folder" },
    { label: "Account status", value: "Active", icon: "check" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>Profile</h1><p className="muted">Your administrator account details.</p></div>
      </div>

      <div className="admin-profile-card">
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
        <Avatar name={user?.name} src={user?.photo} size={92} editable onEdit={() => fileRef.current?.click()} />
        <div className="admin-profile-id">
          <div className="admin-profile-name">
            <h2>{user?.name}</h2>
            <span className="pill pill-paid">{user?.role}</span>
          </div>
          <p className="muted">{user?.email}</p>
          <button className="btn btn-ghost btn-sm" onClick={() => setEdit({ name: user?.name || "", email: user?.email || "" })}>
            <Icon name="edit" size={15} />Edit profile
          </button>
        </div>
      </div>

      <div className="admin-profile-grid">
        {info.map((i) => (
          <div key={i.label} className="admin-profile-item">
            <span className="admin-profile-ic"><Icon name={i.icon} size={18} /></span>
            <div>
              <span className="admin-profile-label muted">{i.label}</span>
              <strong>{i.value}</strong>
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <Modal
          size="sm"
          title="Edit profile"
          subtitle="Update your display name and email."
          onClose={() => setEdit(null)}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => setEdit(null)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={saveEdit}><Icon name="check" size={16} />Save changes</button>
          </>}
        >
          <div className="form-grid">
            <div className="form-field full"><label>Display name</label><input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></div>
            <div className="form-field full"><label>Email</label><input type="email" value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} /></div>
          </div>
        </Modal>
      )}
    </div>
  );
}
