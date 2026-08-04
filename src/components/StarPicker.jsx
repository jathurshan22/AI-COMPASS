import { useState } from "react";
import "./StarPicker.css";

// Professional interactive star rating input.
// - Click sets the rating (count of filled stars)
// - Hover previews the rating
// - Filled stars animate with colour + a gentle pop
export default function StarPicker({ value, onChange, size = 30 }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="starpicker" style={{ "--sp-size": `${size}px` }} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={`sp-star ${n <= active ? "on" : ""} ${n === active ? "pop" : ""}`}
          onMouseEnter={() => setHover(n)}
          onFocus={() => setHover(n)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
            <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5-4.7-4.6 6.5-.95z" />
          </svg>
        </button>
      ))}
      <span className="sp-count">{active ? `${active}.0` : ""}</span>
    </div>
  );
}
