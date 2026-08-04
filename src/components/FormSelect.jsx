import { useState, useRef, useEffect } from "react";
import Icon from "./Icon.jsx";
import "./FormSelect.css";

export default function FormSelect({ options, value, onChange, placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const current = opts.find((o) => o.value === value);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div className={`fsel ${open ? "open" : ""}`} ref={ref}>
      <button type="button" className="fsel-trigger" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className={`fsel-value ${current ? "" : "muted"}`}>{current?.label ?? placeholder}</span>
        <svg className="fsel-caret" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="fsel-menu" role="listbox">
          {opts.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}
              className={`fsel-opt ${o.value === value ? "sel" : ""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}>
              <span>{o.label}</span>
              {o.value === value && <Icon name="check" size={15} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
