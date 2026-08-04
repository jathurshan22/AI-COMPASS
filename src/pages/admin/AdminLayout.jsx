import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";
import Avatar from "../../components/Avatar.jsx";
import Icon from "../../components/Icon.jsx";
import "./Admin.css";

const nav = [
  { to: "/admin", label: "Overview", icon: "chart", end: true },
  { to: "/admin/tools", label: "AI Tools", icon: "robot" },
  { to: "/admin/categories", label: "Categories", icon: "folder" },
  { to: "/admin/users", label: "Users", icon: "users" },
  { to: "/admin/reviews", label: "Reviews", icon: "star" },
  { to: "/admin/profile", label: "Profile", icon: "user" },
];

export default function AdminLayout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link to="/admin" className="admin-brand">
          <span className="brand-mark" aria-hidden="true"><span className="brand-needle" /></span>
          <span className="admin-brand-txt">AI Compass<small>Admin panel</small></span>
        </Link>

        <nav className="admin-nav">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}>
              <Icon name={n.icon} size={19} /><span>{n.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-side-foot">
          <Link to="/" className="admin-nav-link"><Icon name="external" size={19} /><span>View site</span></Link>
          <button className="admin-nav-link danger" onClick={() => { logout(); navigate("/"); }}>
            <Icon name="logout" size={19} /><span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <Link to="/admin/profile" className="admin-topbar-id">
            <Avatar name={user?.name} src={user?.photo} size={38} ring />
            <div className="admin-topbar-meta">
              <strong>{user?.name}</strong>
              <span className="muted">Administrator</span>
            </div>
          </Link>
        </header>
        <div className="admin-content"><Outlet /></div>
      </div>
    </div>
  );
}
