import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Avatar from "./Avatar.jsx";
import Icon from "./Icon.jsx";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/categories", label: "Categories" },
  { to: "/compare", label: "Compare" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const fileRef = useRef(null);
  const { user, logout, setPhoto } = useApp();
  const navigate = useNavigate();

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (to) => { setMenu(false); navigate(to); };
  const doLogout = () => { setMenu(false); logout(); navigate("/"); };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="nav-inner container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><span className="brand-needle" /></span>
          <span className="brand-name">AI Compass</span>
        </Link>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          {user ? (
            <div className="nav-profile" ref={menuRef}>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
              <button className="nav-avatar-btn" onClick={() => setMenu((m) => !m)} aria-label="Account menu" aria-expanded={menu}>
                <Avatar name={user.name} src={user.photo} size={38} ring />
              </button>
              {menu && (
                <div className="nav-menu">
                  <div className="nav-menu-head">
                    <Avatar name={user.name} src={user.photo} size={44} editable onEdit={() => fileRef.current?.click()} />
                    <div className="nav-menu-id">
                      <strong>{user.name}</strong>
                      <span className="muted">{user.email}</span>
                    </div>
                  </div>
                  <div className="nav-menu-list">
                    <button onClick={() => fileRef.current?.click()}><Icon name="user" size={17} />{user.photo ? "Change photo" : "Add photo"}</button>
                    <button onClick={() => go("/dashboard")}><Icon name="grid" size={17} />Dashboard</button>
                    <button onClick={() => go("/saved")}><Icon name="bookmark" size={17} />Saved tools</button>
                    {user.role === "admin" && (
                      <button onClick={() => go("/admin")}><Icon name="chart" size={17} />Admin panel</button>
                    )}
                  </div>
                  <div className="nav-menu-foot">
                    <button className="nav-menu-logout" onClick={doLogout}><Icon name="logout" size={17} />Log out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login">Log in</Link>
              <Link to="/finder" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
