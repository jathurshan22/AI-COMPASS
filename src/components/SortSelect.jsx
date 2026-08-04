import { useState, useRef, useEffect } from "react";
import "./SortSelect.css";

export default function SortSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find(([v]) => v === value)?.[1] || "";

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`sortsel ${open ? "open" : ""}`} ref={ref}>
      <button
        type="button"
        className="sortsel-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current}</span>
        <svg className="sortsel-caret" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="sortsel-menu" role="listbox">
          {options.map(([v, l]) => (
            <li
              key={v}
              role="option"
              aria-selected={v === value}
              className={`sortsel-opt ${v === value ? "sel" : ""}`}
              onClick={() => { onChange(v); setOpen(false); }}
            >
              <span>{l}</span>
              {v === value && (
                <svg className="sortsel-check" width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
