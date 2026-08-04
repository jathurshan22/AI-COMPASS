import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

export function SearchBox({ big = false, autoNavigate = true, onSubmit, placeholder }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    if (onSubmit) onSubmit(q.trim());
    if (autoNavigate) navigate(`/finder?q=${encodeURIComponent(q.trim())}`);
  };

  const suggestions = ["Build a portfolio website", "Generate a logo", "Summarize a PDF", "Write a cover letter"];

  return (
    <div className={`searchbox-wrap ${big ? "big" : ""}`}>
      <form className="searchbox glass" onSubmit={submit}>
        <span className="searchbox-icon" aria-hidden="true">✦</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder || "What do you want to accomplish?"}
          aria-label="Describe your task"
        />
        <button type="submit" className="btn btn-primary">Find my AI</button>
      </form>
      {big && (
        <div className="searchbox-suggest">
          <span className="muted">Try:</span>
          {suggestions.map((s) => (
            <button key={s} className="chip" onClick={() => { setQ(s); navigate(`/finder?q=${encodeURIComponent(s)}`); }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
