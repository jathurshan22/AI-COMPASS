import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MatchCard } from "../components/Cards.jsx";
import { Scanning, EmptyState } from "../components/Ui.jsx";
import Icon from "../components/Icon.jsx";
import { findTools } from "../lib/finder.js";
import { useApp } from "../context/AppContext.jsx";
import "./Finder.css";

const quickTasks = ["generate a logo", "summarize a research PDF", "build a landing page", "write a cover letter"];

const howSteps = [
  { icon: "message", title: "Describe", text: "your task in plain words" },
  { icon: "search", title: "We match", text: "score every tool for fit" },
  { icon: "check", title: "You pick", text: "open, save, or compare" },
];

export default function Finder() {
  const [params, setParams] = useSearchParams();
  const { logSearch } = useApp();
  const [input, setInput] = useState(params.get("q") || "");
  const [query, setQuery] = useState(params.get("q") || "");
  const [state, setState] = useState("idle");
  const [data, setData] = useState(null);

  const run = (q) => {
    if (!q.trim()) return;
    setQuery(q);
    setParams({ q });
    logSearch(q);
    setState("scanning");
    setTimeout(() => { setData(findTools(q)); setState("done"); }, 1200);
  };

  const onSubmit = (e) => { e.preventDefault(); run(input); };

  useEffect(() => {
    const q = params.get("q");
    if (q) run(q);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="finder container">
      <div className="finder-head text-c">
        <span className="eyebrow">AI Finder</span>
        <h1>What do you want to <span className="grad-text">accomplish?</span></h1>
        <p className="muted">Describe your task in your own words. The compass does the matching.</p>
      </div>

      <form className="finder-search" onSubmit={onSubmit}>
        <span className="finder-search-ic" aria-hidden="true"><Icon name="search" size={20} /></span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. build a portfolio website"
          aria-label="Describe your task"
        />
        <button type="submit" className="btn btn-primary">Find my AI</button>
      </form>

      {state === "idle" && (
        <div className="finder-quick">
          <span className="finder-quick-label">Popular</span>
          {quickTasks.map((s) => (
            <button key={s} className="finder-chip" onClick={() => { setInput(s); run(s); }}>{s}</button>
          ))}
        </div>
      )}

      <div className="finder-results">
        {state === "scanning" && <Scanning label={`Reading “${query}”`} />}

        {state === "done" && data && (
          data.results.length ? (
            <>
              <div className="results-head row between wrap gap-12">
                <h2>Your best matches</h2>
                {data.inferred.length > 0 && (
                  <span className="muted">Detected: {data.inferred.map((c) => (
                    <span key={c} className="chip" style={{ marginLeft: 6 }}>{c}</span>
                  ))}</span>
                )}
              </div>
              <div className="stack gap-16">
                {data.results.map((r, i) => <MatchCard key={r.tool.slug} result={r} rank={i + 1} />)}
              </div>
            </>
          ) : (
            <EmptyState title="No strong match found" text="Try describing the task differently, or browse tools by category." />
          )
        )}

        {state === "idle" && (
          <div className="finder-idle">
            <div className="finder-compass" aria-hidden="true">
              <span className="fc-ring fc-r1" />
              <span className="fc-ring fc-r2" />
              <span className="fc-core"><span className="brand-needle" /></span>
            </div>
            <h3>Describe a task to begin</h3>
            <p className="muted">Tell the compass what you're building — it points you to the right AI.</p>
            <div className="finder-how">
              {howSteps.map((s, i) => (
                <div className="fh-item" key={s.title}>
                  <div className="fh-step">
                    <span className="fh-ic"><Icon name={s.icon} size={19} /></span>
                    <strong>{s.title}</strong>
                    <span className="muted">{s.text}</span>
                  </div>
                  {i < howSteps.length - 1 && <span className="fh-arrow" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}