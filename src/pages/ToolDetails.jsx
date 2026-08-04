import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StarRating, ToolCard } from "../components/Cards.jsx";
import StarPicker from "../components/StarPicker.jsx";
import ToolLogo from "../components/ToolLogo.jsx";
import { EmptyState } from "../components/Ui.jsx";
import { useApp } from "../context/AppContext.jsx";
import { toolMap, tools } from "../data/tools.js";
import "./ToolDetails.css";

const SEED_REVIEWS = [
  { name: "Dev A.", rating: 5, text: "Fits right into my workflow. Hard to go back." },
  { name: "Sara M.", rating: 4, text: "Great most of the time — occasionally needs a second try." },
];

export default function ToolDetails() {
  const { slug } = useParams();
  const tool = toolMap[slug];
  const { isSaved, toggleSaved, user } = useApp();

  // per-tool reviews (persisted in localStorage)
  const storeKey = `ac_toolreviews_${slug}`;
  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storeKey)) || []; } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", rating: 0, text: "" });

  if (!tool) {
    return (
      <div className="container" style={{ paddingTop: "calc(var(--nav-h) + 80px)" }}>
        <EmptyState title="Tool not found" text="That tool doesn't exist yet."
          action={<Link to="/explore" className="btn btn-primary">Back to Explore</Link>} />
      </div>
    );
  }

  const alternatives = tools
    .filter((t) => t.slug !== tool.slug && t.categories.some((c) => tool.categories.includes(c)))
    .slice(0, 3);

  const allReviews = [...SEED_REVIEWS, ...reviews];

  const submitReview = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || !form.rating) return;
    const next = [...reviews, { name: form.name.trim(), rating: form.rating, text: form.text.trim() }];
    setReviews(next);
    try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch {}
    setForm({ name: "", rating: 0, text: "" });
  };

  return (
    <div className="details container">
      <Link to="/explore" className="back-link muted">← Back to Explore</Link>

      <header className="details-hero glass">
        <div className="details-hero-glow" />
        <span className="details-logo"><ToolLogo tool={tool} size={46} /></span>
        <div className="details-hero-copy">
          <h1>{tool.name}</h1>
          <p className="details-tagline">{tool.tagline}</p>
          <div className="row gap-12 wrap">
            <span className="row gap-8"><StarRating value={tool.rating} size={16} /> <strong>{tool.rating.toFixed(1)}</strong></span>
            <span className={`pill pill-${tool.pricing}`}>{tool.pricing}</span>
          </div>
        </div>
        <div className="details-actions">
          <a href={tool.website} target="_blank" rel="noreferrer" className="btn btn-primary">Visit site ↗</a>
          {user && (
            <button className={`btn btn-ghost ${isSaved(tool.slug) ? "is-saved" : ""}`} onClick={() => toggleSaved(tool.slug)}>
              {isSaved(tool.slug) ? "♥ Saved" : "♡ Save"}
            </button>
          )}
        </div>
      </header>

      <div className="details-grid">
        <section className="details-main stack gap-24">
          <div className="glass card-pad detail-block">
            <h2 className="block-title">About</h2>
            <p className="detail-about">{tool.description}</p>
          </div>

          <div className="grid grid-2 procon">
            <div className="glass card-pad detail-block">
              <h2 className="block-title">Strengths</h2>
              <ul className="check-list">{tool.pros.map((p) => <li key={p}><span className="tick good">✓</span>{p}</li>)}</ul>
            </div>
            <div className="glass card-pad detail-block">
              <h2 className="block-title">Watch-outs</h2>
              <ul className="check-list">{tool.cons.map((c) => <li key={c}><span className="tick bad">–</span>{c}</li>)}</ul>
            </div>
          </div>
        </section>

        <aside className="details-side stack gap-24">
          <div className="glass card-pad detail-block glance-block">
            <h2 className="block-title">At a glance</h2>
            <dl className="glance">
              <div><dt>Pricing</dt><dd style={{ textTransform: "capitalize" }}>{tool.pricing}</dd></div>
              <div><dt>Skill level</dt><dd style={{ textTransform: "capitalize" }}>{tool.skillLevel}</dd></div>
              <div><dt>Rating</dt><dd>{tool.rating.toFixed(1)} / 5</dd></div>
              <div><dt>Popularity</dt><dd>{tool.popularity}/100</dd></div>
            </dl>
          </div>
        </aside>
      </div>

      {/* full-width compare banner */}
      <Link to="/compare" className="glass compare-banner detail-block">
        <span className="compare-banner-icon" aria-hidden="true">⚖</span>
        <div className="compare-banner-copy">
          <strong>Compare with others</strong>
          <span className="muted">See how {tool.name} stacks up against similar tools.</span>
        </div>
        <span className="compare-banner-cta">
          Compare <span className="compare-banner-arrow">→</span>
        </span>
      </Link>

      {/* full-width reviews */}
      <section className="reviews-full glass card-pad detail-block">
        <div className="reviews-full-head">
          <h2 className="block-title" style={{ margin: 0 }}>Reviews</h2>
          <span className="reviews-full-avg"><StarRating value={tool.rating} size={15} /> <strong>{tool.rating.toFixed(1)}</strong> <span className="muted">· {allReviews.length} reviews</span></span>
        </div>

        <form className="review-write" onSubmit={submitReview}>
          <div className="review-write-row">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" aria-label="Your name" />
            <StarPicker value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} size={28} />
          </div>
          <textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder={`Share your experience with ${tool.name}…`} />
          <button className="btn btn-primary btn-sm" type="submit">Post review</button>
        </form>

        <div className="reviews-full-grid">
          {allReviews.map((r, i) => (
            <div key={i} className="review">
              <div className="row between">
                <strong>{r.name}</strong>
                <StarRating value={r.rating} />
              </div>
              <p className="muted">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {alternatives.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <h2 className="block-title" style={{ marginBottom: 20 }}>Alternatives</h2>
          <div className="grid grid-3">{alternatives.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
        </section>
      )}
    </div>
  );
}
