import { StarRating } from "../../components/Cards.jsx";
import ToolLogo from "../../components/ToolLogo.jsx";
import CategoryIcon from "../../components/CategoryIcon.jsx";
import Icon from "../../components/Icon.jsx";
import { tools } from "../../data/tools.js";
import { categories } from "../../data/categories.js";
import { adminActivity, categorySearches } from "../../data/adminData.js";

const activityIcon = { user: "users", review: "star", tool: "robot" };

export default function AdminOverview() {
  const counts = [
    { label: "AI tools", value: tools.length, icon: "robot", trend: "+3 this week" },
    { label: "Categories", value: categories.length, icon: "folder", trend: "stable" },
    { label: "Users", value: 1284, icon: "users", trend: "+48 this week" },
    { label: "Reviews", value: 3567, icon: "star", trend: "+112 this week" },
  ];
  const topRated = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const dist = categories
    .map((c) => ({ name: c.name, slug: c.slug, searches: categorySearches[c.slug] || 0 }))
    .sort((a, b) => b.searches - a.searches);
  const maxSearches = Math.max(...dist.map((d) => d.searches));

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>Overview</h1><p className="muted">A snapshot of your directory at a glance.</p></div>
      </div>

      <div className="admin-stats">
        {counts.map((c) => (
          <div key={c.label} className="admin-stat">
            <span className="admin-stat-ic"><Icon name={c.icon} size={20} /></span>
            <span className="admin-stat-num">{c.value.toLocaleString()}</span>
            <span className="admin-stat-label muted">{c.label}</span>
            <span className="admin-stat-trend"><Icon name="trend" size={13} />{c.trend}</span>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <section className="admin-card">
          <h2 className="admin-card-title">Most searched categories</h2>
          <div className="chart">
            {dist.map((d, i) => (
              <div key={d.slug} className="chart-row">
                <span className="chart-label"><span className="chart-rank">{i + 1}</span><span className="chart-label-ic"><CategoryIcon slug={d.slug} size={16} /></span>{d.name}</span>
                <div className="chart-track"><span style={{ width: `${(d.searches / maxSearches) * 100}%` }} /></div>
                <span className="chart-val mono">{d.searches.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <h2 className="admin-card-title">Top rated</h2>
          <ul className="admin-list">
            {topRated.map((t) => (
              <li key={t.slug}>
                <span className="admin-list-l"><ToolLogo tool={t} size={18} />{t.name}</span>
                <span className="admin-list-r"><StarRating value={t.rating} size={14} /><span className="mono muted">{t.rating.toFixed(1)}</span></span>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-card admin-card-wide">
          <h2 className="admin-card-title">Recent activity</h2>
          <ul className="activity">
            {adminActivity.map((a, i) => (
              <li key={i}>
                <span className={`activity-ic act-${a.type}`}><Icon name={activityIcon[a.type]} size={16} /></span>
                <div className="activity-body">
                  <span>{a.text}</span>
                  <span className="muted">{a.who}</span>
                </div>
                <span className="activity-time muted mono">{a.at}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
