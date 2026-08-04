import { useRef } from "react";
import { Link } from "react-router-dom";
import { ToolCard } from "../components/Cards.jsx";
import Avatar from "../components/Avatar.jsx";
import Icon from "../components/Icon.jsx";
import { useApp } from "../context/AppContext.jsx";
import { toolMap } from "../data/tools.js";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, saved, searches, setPhoto } = useApp();
  const savedTools = saved.map((s) => toolMap[s]).filter(Boolean).slice(0, 4);
  const fileRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };

  const stats = [
    { label: "Saved tools", value: saved.length, icon: "heart" },
    { label: "Searches run", value: searches.length, icon: "search" },
    { label: "Comparisons", value: Math.min(searches.length, 6), icon: "scale" },
  ];

  return (
    <div className="dash container">
      <div className="dash-head">
        <div className="dash-head-id">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          <Avatar name={user?.name} src={user?.photo} size={54} ring editable onEdit={() => fileRef.current?.click()} />
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Welcome back, {user?.name}</h1>
          </div>
        </div>
        <Link to="/finder" className="btn btn-primary"><Icon name="search" size={17} />New search</Link>
      </div>

      <div className="dash-stats">
        {stats.map((s) => (
          <div key={s.label} className="dash-stat">
            <span className="dash-stat-ic"><Icon name={s.icon} size={22} /></span>
            <div className="dash-stat-body">
              <span className="dash-stat-num">{s.value}</span>
              <span className="dash-stat-label muted">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <section className="dash-panel">
          <div className="dash-panel-head">
            <h2>Recent searches</h2>
            <Link to="/finder" className="dash-link">Search →</Link>
          </div>
          {searches.length ? (
            <ul className="recent-list">
              {searches.slice(0, 8).map((s, i) => (
                <li key={i}>
                  <Link to={`/finder?q=${encodeURIComponent(s.q)}`}>
                    <span className="recent-q"><span className="recent-ic"><Icon name="search" size={15} /></span>{s.q}</span>
                    <span className="muted mono">{new Date(s.at).toLocaleDateString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="dash-empty">
              <Icon name="search" size={26} />
              <p className="muted">No searches yet. Try the AI Finder.</p>
            </div>
          )}
        </section>

        <section className="dash-panel">
          <div className="dash-panel-head">
            <h2>Saved tools</h2>
            <Link to="/saved" className="dash-link">View all →</Link>
          </div>
          {savedTools.length ? (
            <div className="grid grid-2 dash-saved-grid">{savedTools.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
          ) : (
            <div className="dash-empty">
              <Icon name="heart" size={26} />
              <p className="muted">Nothing saved yet. Explore and tap ♥ to save.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
