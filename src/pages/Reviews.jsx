import { useState } from "react";
import { StarRating } from "../components/Cards.jsx";
import StarPicker from "../components/StarPicker.jsx";
import Avatar from "../components/Avatar.jsx";
import Icon from "../components/Icon.jsx";
import { useApp } from "../context/AppContext.jsx";
import { seedReviews } from "../data/reviews.js";
import "./Reviews.css";

export default function Reviews() {
  const { reviews, addReview } = useApp();
  const [form, setForm] = useState({ name: "", role: "", rating: 0, text: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const all = [...reviews, ...seedReviews];
  const total = all.length;
  const avg = (all.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = all.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || !form.rating) return;
    addReview({ ...form, name: form.name.trim(), role: form.role.trim() || "AI Compass user" });
    setForm({ name: "", role: "", rating: 0, text: "" });
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="reviews container">
      <div className="reviews-head text-c">
        <span className="eyebrow">What people say</span>
        <h1>Loved by people finding their AI</h1>
        <p className="muted" style={{ marginInline: "auto" }}>
          Real feedback from people using AI Compass to pick the right tool.
        </p>
      </div>

      {/* premium summary */}
      <div className="rv-summary">
        <div className="rv-summary-score">
          <span className="rv-avg grad-text">{avg}</span>
          <span className="rv-summary-stars"><StarRating value={Math.round(avg)} size={20} /></span>
          <span className="muted">Based on {total} reviews</span>
        </div>
        <div className="rv-dist">
          {dist.map((d) => (
            <div key={d.star} className="rv-dist-row">
              <span className="rv-dist-label">{d.star}<Icon name="star" size={13} /></span>
              <div className="rv-dist-track"><span style={{ width: `${d.pct}%` }} /></div>
              <span className="rv-dist-count mono">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-layout">
        {/* submit form */}
        <aside className="review-form">
          <h2 className="rv-form-title">Leave a review</h2>
          {sent && <div className="review-sent"><Icon name="check" size={16} />Thanks! Your review has been added.</div>}
          <div className="stack gap-16">
            <label className="field"><span>Name</span><input value={form.name} onChange={set("name")} placeholder="Your name" /></label>
            <label className="field"><span>Role <span className="muted">(optional)</span></span><input value={form.role} onChange={set("role")} placeholder="e.g. Product designer" /></label>
            <div className="field"><span>Rating</span><StarPicker value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} /></div>
            <label className="field"><span>Your review</span><textarea rows={4} value={form.text} onChange={set("text")} placeholder="What do you think of AI Compass?" /></label>
            <button className="btn btn-primary btn-block" onClick={submit}>Submit review</button>
          </div>
        </aside>

        {/* reviews grid */}
        <div className="reviews-grid">
          {all.map((r, i) => (
            <figure key={r.id || `seed-${i}`} className="rv-card">
              <div className="rv-stars"><StarRating value={r.rating} size={15} /></div>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <Avatar name={r.name} size={42} />
                <span className="rv-who"><strong>{r.name}</strong><span className="muted">{r.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}