import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { useTilt } from "../lib/hooks.js";
import { categoryMap } from "../data/categories.js";
import ToolLogo from "./ToolLogo.jsx";
import CategoryIcon from "./CategoryIcon.jsx";
import "./Cards.css";

export function StarRating({ value = 0, size = 14 }) {
  const full = Math.round(value);
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= full ? "star on" : "star"}>★</span>
      ))}
    </span>
  );
}

export function ToolCard({ tool }) {
  const { isSaved, toggleSaved, user } = useApp();
  const tilt = useTilt(5);
  const primaryCat = categoryMap[tool.categories[0]];
  return (
    <article className="tool-card glass" ref={tilt}>
      <div className="tool-card-glow" />
      <div className="tool-card-top">
        <span className="tool-logo"><ToolLogo tool={tool} size={34} /></span>
        {user && (
          <button
            className={`save-btn ${isSaved(tool.slug) ? "saved" : ""}`}
            onClick={() => toggleSaved(tool.slug)}
            aria-label={isSaved(tool.slug) ? "Remove from saved" : "Save tool"}
          >
            {isSaved(tool.slug) ? "♥" : "♡"}
          </button>
        )}
      </div>

      <Link to={`/tools/${tool.slug}`} className="tool-card-body">
        <h3>{tool.name}</h3>
        <p className="tool-tagline">{tool.tagline}</p>
      </Link>

      <div className="tool-inforow">
        <div className="info-item">
          <span className="info-label">Users</span>
          <span className="info-val">{tool.users}</span>
        </div>
        <div className="info-item right">
          <span className="info-label">Version</span>
          <span className="info-val mono">{tool.model}</span>
        </div>
      </div>

      <div className="tool-inforow">
        <div className="info-item">
          <span className={`pill pill-${tool.pricing}`}>{tool.pricing}</span>
        </div>
        <div className="info-item right">
          <span className="info-label">Best for</span>
          <span className="info-val">{primaryCat?.name}</span>
        </div>
      </div>

      <Link to={`/tools/${tool.slug}`} className="tool-details-btn">
        View Details <span className="arrow">→</span>
      </Link>
    </article>
  );
}

export function CategoryCard({ category, count }) {
  const tilt = useTilt(6);
  return (
    <Link to={`/explore?category=${category.slug}`} className="cat-card glass" ref={tilt}>
      <span className="cat-icon"><CategoryIcon slug={category.slug} size={24} /></span>
      <div>
        <h3>{category.name}</h3>
        <p className="muted">{category.description}</p>
      </div>
      {count != null && <span className="cat-count mono">{count} tools</span>}
    </Link>
  );
}

export function MatchCard({ result, rank }) {
  const { tool, match, why } = result;
  return (
    <article className="match-card glass">
      <div className="match-rank">{rank}</div>
      <div className="match-main">
        <div className="row between">
          <div className="row gap-12">
            <span className="tool-logo sm"><ToolLogo tool={tool} size={26} /></span>
            <div>
              <h3>{tool.name}</h3>
              <p className="tool-tagline">{tool.tagline}</p>
            </div>
          </div>
          <div className="match-score">
            <span className="match-num grad-text">{match}%</span>
            <span className="muted mono" style={{ fontSize: "0.7rem" }}>match</span>
          </div>
        </div>
        <div className="match-bar"><span style={{ width: `${match}%` }} /></div>
        <p className="match-why muted">Why: {why}</p>
        <div className="row between wrap gap-12" style={{ marginTop: 4 }}>
          <span className={`pill pill-${tool.pricing}`}>{tool.pricing}</span>
          <Link to={`/tools/${tool.slug}`} className="btn btn-ghost btn-sm">View details →</Link>
        </div>
      </div>
    </article>
  );
}
