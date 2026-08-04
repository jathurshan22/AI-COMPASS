import "./Avatar.css";

const GRADS = [
  ["#2563eb", "#7c3aed"],
  ["#7c3aed", "#06b6d4"],
  ["#06b6d4", "#2563eb"],
  ["#0891b2", "#7c3aed"],
  ["#4f46e5", "#06b6d4"],
];

export default function Avatar({ name = "", src = null, size = 36, ring = false, editable = false, onEdit }) {
  const clean = (name || "U").trim();
  const initials = clean.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "U";
  let h = 0;
  for (const ch of clean) h = (h + ch.charCodeAt(0)) % GRADS.length;
  const [a, b] = GRADS[h];
  const badge = Math.max(16, Math.round(size * 0.36));

  return (
    <span className="avatar-wrap" style={{ width: size, height: size }}>
      <span
        className={`avatar ${ring ? "avatar-ring" : ""} ${src ? "avatar-photo" : ""}`}
        style={{ width: size, height: size, fontSize: size * 0.4, background: src ? "#e2e8f0" : `linear-gradient(135deg, ${a}, ${b})` }}
        aria-hidden="true"
      >
        {src ? <img src={src} alt="" /> : initials}
      </span>
      {editable && (
        <button
          type="button"
          className="avatar-cam"
          style={{ width: badge, height: badge }}
          onClick={onEdit}
          aria-label={src ? "Change photo" : "Add photo"}
        >
          <svg width={badge * 0.58} height={badge * 0.58} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h5l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <circle cx="12" cy="12.5" r="3" />
          </svg>
        </button>
      )}
    </span>
  );
}
