import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { StarRating } from "../components/Cards.jsx";
import ToolLogo from "../components/ToolLogo.jsx";
import { tools } from "../data/tools.js";
import "./Compare.css";

const priceRank = { free: 0, freemium: 1, paid: 2 };

const rows = [
  {
    key: "pricing", label: "Pricing", best: "min",
    val: (t) => priceRank[t.pricing],
    render: (t) => <span className={`pill pill-${t.pricing}`}>{t.pricing}</span>,
  },
  {
    key: "rating", label: "Rating", best: "max",
    val: (t) => t.rating,
    render: (t) => (
      <span className="cmp-rating"><StarRating value={t.rating} size={15} /> <strong>{t.rating.toFixed(1)}</strong></span>
    ),
  },
  {
    key: "popularity", label: "Popularity", best: "max",
    val: (t) => t.popularity,
    render: (t) => (
      <div className="cmp-pop">
        <div className="cmp-bar"><span style={{ width: `${t.popularity}%` }} /></div>
        <span className="cmp-pop-num mono">{t.popularity}</span>
      </div>
    ),
  },
  { key: "skillLevel", label: "Skill level", render: (t) => <span className="cap">{t.skillLevel}</span> },
  { key: "users", label: "Users", render: (t) => <span>{t.users || "—"}</span> },
  { key: "model", label: "Model", render: (t) => <span className="mono cmp-model">{t.model || "—"}</span> },
  {
    key: "categories", label: "Best for",
    render: (t) => <div className="cmp-tags">{t.categories.map((c) => <span key={c} className="cmp-tag">{c}</span>)}</div>,
  },
  {
    key: "pros", label: "Strengths",
    render: (t) => <ul className="cmp-list">{t.pros.map((p) => <li key={p}><span className="cmp-tick good">✓</span>{p}</li>)}</ul>,
  },
  {
    key: "cons", label: "Watch-outs",
    render: (t) => <ul className="cmp-list">{t.cons.map((c) => <li key={c}><span className="cmp-tick bad">–</span>{c}</li>)}</ul>,
  },
];

function bestSlugs(row, selected) {
  if (!row.best || !row.val || selected.length < 2) return [];
  const vals = selected.map(row.val);
  const target = row.best === "max" ? Math.max(...vals) : Math.min(...vals);
  const winners = selected.filter((t) => row.val(t) === target);
  // only highlight when it actually distinguishes (not everyone tied)
  return winners.length === selected.length ? [] : winners.map((t) => t.slug);
}

export default function Compare() {
  const [picked, setPicked] = useState(["chatgpt", "claude"]);
  const pickerRef = useRef(null);

  const toggle = (slug) => {
    setPicked((p) => p.includes(slug) ? p.filter((x) => x !== slug) : p.length < 3 ? [...p, slug] : p);
  };
  const selected = picked.map((s) => tools.find((t) => t.slug === s)).filter(Boolean);
  const sig = selected.map((t) => t.slug).join("-");

  return (
    <div className="compare container">
      <div className="explore-head text-c">
        <span className="eyebrow">Compare AI</span>
        <h1>Weigh your options side by side</h1>
        <p className="muted" style={{ marginInline: "auto" }}>Pick two or three tools and see how they stack up, row by row.</p>
      </div>

      {/* ---- picker ---- */}
      <div className="cmp-picker" ref={pickerRef}>
        <div className="cmp-picker-head">
          <span className="cmp-picker-title">Choose tools</span>
          <span className={`cmp-picker-count ${picked.length >= 3 ? "full" : ""}`}>{picked.length} / 3</span>
        </div>
        <div className="cmp-picker-chips">
          {tools.map((t) => {
            const on = picked.includes(t.slug);
            return (
              <button key={t.slug} className={`chip ${on ? "active" : ""}`}
                onClick={() => toggle(t.slug)} disabled={!on && picked.length >= 3}>
                <ToolLogo tool={t} size={18} />{t.name}
                {on && <span className="chip-x" aria-hidden="true">×</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- comparison ---- */}
      {selected.length >= 2 ? (
        <>
          <div className="cmp-scroll">
            <table key={sig} className="cmp" style={{ minWidth: 150 + selected.length * 210 }}>
              <thead>
                <tr>
                  <th className="cmp-corner" />
                  {selected.map((t) => (
                    <th key={t.slug} className="cmp-toolhead">
                      <button className="cmp-remove" onClick={() => toggle(t.slug)} aria-label={`Remove ${t.name}`}>×</button>
                      <span className="cmp-toolhead-logo"><ToolLogo tool={t} size={30} /></span>
                      <strong>{t.name}</strong>
                      <span className="cmp-toolhead-tag muted">{t.tagline}</span>
                      <Link to={`/tools/${t.slug}`} className="cmp-toolhead-link">View details →</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const winners = bestSlugs(row, selected);
                  return (
                    <tr key={row.key}>
                      <th scope="row" className="cmp-rowlabel">{row.label}</th>
                      {selected.map((t) => {
                        const isBest = winners.includes(t.slug);
                        return (
                          <td key={t.slug} className={`cmp-cell ${isBest ? "is-best" : ""}`}>
                            {isBest && <span className="cmp-best">Best</span>}
                            {row.render(t)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="cmp-empty-state">
          <span className="cmp-empty-icon" aria-hidden="true">⚖</span>
          <p>Select at least <strong>two tools</strong> above to start comparing.</p>
        </div>
      )}
    </div>
  );
}
