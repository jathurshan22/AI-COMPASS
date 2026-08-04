import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompassHero.css";

// Each: cdn = official Simple Icons slug (real brand logo), color, and inline SVG fallback.
const ICON_SVG = {
  chatgpt: { cdn: "openai", color: "#10A37F", d: "M12 2 2 20h20z" },
  claude: { cdn: "anthropic", color: "#D97757", d: "M17.3 3.7h-3.4l6.2 16.6h3.4zm-6.9 0L4.2 20.3h3.5l1.3-3.4h6.5l1.3 3.4h3.4L13.9 3.7zm-.3 10 2.1-5.6 2.2 5.6z" },
  gemini: { cdn: "googlegemini", color: "#8E75B2", d: "M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" },
  perplexity: { cdn: "perplexity", color: "#1FB8CD", d: "M12 2 2 20h20z" },
  cursor: { cdn: "cursor", color: "#0F172A", d: "M11.9 1.5 2.6 6.9v10.7l9.3 5.4 9.3-5.4V6.9zm0 2.2 6.7 3.9-6.7 3.9-6.7-3.9zM4.5 8.9l6.5 3.8v7.6l-6.5-3.8zm14.8 0v7.6l-6.5 3.8v-7.6z" },
  copilot: { cdn: "githubcopilot", color: "#0F172A", d: "M12 2 2 20h20z" },
  lovable: { cdn: null, color: "#FF4F8B", d: "M12 20.7 4.3 13a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5z" },
  v0: { cdn: "vercel", color: "#0F172A", d: "M12 2 2 20h20z" },
  midjourney: { cdn: null, color: "#0F172A", d: "M21 17.5c-2.3.2-4.4-.6-6.3-2.2-1.1-1-2-2.1-2.8-3.4-.6 1-1.4 1.9-2.3 2.7C7.8 16 6 16.7 4 16.6c1.3-1.9 2-3.9 2.4-6C6.7 8.7 7 6.8 8 5.1c1 1.8 1.5 3.7 3 5.1 1.4-1.6 3.2-2.6 5.2-3.2-.5 1.6-.4 3.1.2 4.6.6 1.7 1.6 3.1 3 4.2z" },
  grok: { cdn: "x", color: "#0F172A", d: "M18.9 2h3.3l-7.2 8.3L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1.5 2h6.8l4.7 6.2zm-1.2 18h1.8L7.1 3.9H5.2z" },
  notion: { cdn: "notion", color: "#0F172A", d: "M4 3l14-1v18l-3 2L4 21z" },
  elevenlabs: { cdn: "elevenlabs", color: "#0F172A", d: "M9 5h2v14H9zm4 0h2v14h-2z" },
};
const ORBIT_OUTER = ["chatgpt", "claude", "gemini", "perplexity", "cursor"];
const ORBIT_MID = ["copilot", "lovable", "v0", "grok"];
const ORBIT_INNER = ["midjourney", "notion", "elevenlabs"];
const NAMES = { chatgpt: "ChatGPT", claude: "Claude", gemini: "Gemini", perplexity: "Perplexity", cursor: "Cursor", copilot: "Copilot", lovable: "Lovable", v0: "v0", midjourney: "Midjourney", grok: "Grok", notion: "Notion AI", elevenlabs: "ElevenLabs" };
const SUGGESTS = ["Build a portfolio website", "Generate a logo", "Summarize a PDF", "Write a cover letter"];
const CIRCLE_TEXT = "AI  COMPASS   ·   FIND  YOUR  PERFECT  AI   ·  ";

function ToolIcon({ id }) {
  const s = ICON_SVG[id];
  const [failed, setFailed] = useState(false);
  if (s.cdn && !failed) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${s.cdn}/${s.color.replace("#", "")}`}
        alt="" width="30" height="30" loading="lazy"
        onError={() => setFailed(true)}
        style={{ display: "block" }}
      />
    );
  }
  const letter = (NAMES[id] || "?").trim().charAt(0).toUpperCase();
  return <span className="otool-letter" style={{ color: s.color }}>{letter}</span>;
}

function place(items, radius) {
  return items.map((id, i) => {
    const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    return { id, style: { left: `calc(50% + ${Math.cos(a) * radius}px - 34px)`, top: `calc(50% + ${Math.sin(a) * radius}px - 34px)` } };
  });
}

export default function CompassHero() {
  const navigate = useNavigate();
  const tiltRef = useRef(null);
  const needleRef = useRef(null);
  const titleRef = useRef(null);
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState("idle");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onLeave = () => { el.style.setProperty("--mx", "50%"); el.style.setProperty("--my", "-60%"); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateX(${-py * 10}deg) rotateY(${px * 12}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const runSearch = (text) => {
    const query = (text ?? q).trim();
    if (!query) return;
    setPhase("scanning"); setWinner(null);
    const lower = query.toLowerCase();
    let pick = "chatgpt";
    if (/logo|design|ui|image|art/.test(lower)) pick = "midjourney";
    else if (/site|website|app|portfolio|build|landing/.test(lower)) pick = "lovable";
    else if (/code|debug|refactor|editor/.test(lower)) pick = "cursor";
    else if (/write|essay|content|doc|pdf|summar|note/.test(lower)) pick = "claude";
    else if (/research|search|study/.test(lower)) pick = "perplexity";
    else if (/voice|audio|speech|narrat/.test(lower)) pick = "elevenlabs";
    const groups = [ORBIT_OUTER, ORBIT_MID, ORBIT_INNER];
    const list = groups.find((g) => g.includes(pick)) || ORBIT_OUTER;
    const posInList = list.indexOf(pick);
    const baseAngle = (posInList / list.length) * 360 - 90;
    if (needleRef.current) {
      needleRef.current.classList.remove("sweep");
      needleRef.current.style.transform = `rotate(${baseAngle + 90}deg)`;
    }
    setTimeout(() => { setWinner(pick); setPhase("done"); }, 1500);
  };
  const goFinder = (text) => {
    const query = (text ?? q).trim();
    if (query) navigate(`/finder?q=${encodeURIComponent(query)}`);
  };
  const onSubmit = (e) => { e.preventDefault(); goFinder(); };

  return (
    <section className="chero">
      <div className="chero-bg">
        <div className="chero-mesh" />
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="chero-particle"
            style={{ left: `${8 + i * 10}%`, bottom: `${10 + (i % 4) * 12}%`, animationDelay: `${i * 1.4}s` }} />
        ))}
      </div>

      <div className="chero-inner">

        {/* ---- headline: gradient flow + spotlight + compass-needle A ---- */}
        <h1 className="chero-title">
          <span className="chero-title-inner" ref={titleRef}>
            Find Your Perfect{"\u00A0"}
            <span className="ct-needleA" aria-hidden="true">
              <svg viewBox="0 0 26 30">
                <defs>
                  <linearGradient id="ctA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2563eb" /><stop offset="0.55" stopColor="#7c3aed" /><stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M4 28 L13 3 L22 28" fill="none" stroke="url(#ctA)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M8 19 L18 19" fill="none" stroke="url(#ctA)" strokeWidth="3.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="ct-I">I</span>
          </span>
        </h1>

        {/* ---- search below the headline ---- */}
        <form className="chero-search" onSubmit={onSubmit}>
          <div className="chero-searchbox">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What do you want to build today?" aria-label="Describe your task" />
            <button type="submit" className="btn btn-primary">Find My AI</button>
          </div>
          <div className="chero-suggests">
            <span className="muted" style={{ fontSize: "0.8rem" }}>Try:</span>
            {SUGGESTS.map((s) => (
              <button type="button" key={s} className="chip" onClick={() => { setQ(s); goFinder(s); }}>{s}</button>
            ))}
          </div>
        </form>

        {/* ---- compass BELOW (half peeks, full on scroll) ---- */}
        <div className="chero-stage">
          <div className="compass-tilt" ref={tiltRef}>
            <div className="oline o1" /><div className="oline o2" /><div className="oline o3" />
            <div className="ocarry o1">
              {place(ORBIT_OUTER, 340).map((o) => (
                <div key={o.id} className={`otool ${winner === o.id ? "glow" : ""}`} style={o.style}>
                  <ToolIcon id={o.id} /><span className="oname">{NAMES[o.id]}</span>
                </div>
              ))}
            </div>
            <div className="ocarry o2 rev">
              {place(ORBIT_MID, 262).map((o) => (
                <div key={o.id} className={`otool ${winner === o.id ? "glow" : ""}`} style={o.style}>
                  <ToolIcon id={o.id} /><span className="oname">{NAMES[o.id]}</span>
                </div>
              ))}
            </div>
            <div className="ocarry o3">
              {place(ORBIT_INNER, 186).map((o) => (
                <div key={o.id} className={`otool sm ${winner === o.id ? "glow" : ""}`} style={o.style}>
                  <ToolIcon id={o.id} /><span className="oname">{NAMES[o.id]}</span>
                </div>
              ))}
            </div>
            <div className="compass3d">
              <div className="c-glow" />
              <div className="c-ring r1" /><div className="c-ring r2" /><div className="c-ring r3" />
              <div className="c-ticks">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className={i % 3 === 0 ? "card" : ""} style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }} />
                ))}
              </div>
              <div className={`c-scan ${phase === "scanning" ? "on" : ""}`} />
              <div className={`c-needle ${phase === "idle" ? "sweep" : ""}`} ref={needleRef} />
              <div className="c-core" />
            </div>
          </div>

          {phase === "done" && winner && (
            <div className="c-result">
              <span className="rlogo"><ToolIcon id={winner} /></span>
              <span className="rtext"><b>{NAMES[winner]}</b><br /><span className="rmatch">Best match for your task</span></span>
              <button className="btn btn-primary btn-sm rgo" onClick={goFinder}>See full results →</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}