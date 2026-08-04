import { Link } from "react-router-dom";
import { useCountUp } from "../lib/hooks.js";
import { tools } from "../data/tools.js";
import { categories } from "../data/categories.js";
import "./About.css";

function Stat({ target, suffix, label }) {
  const [val, ref] = useCountUp(target);
  return (
    <div className="about-stat" ref={ref}>
      <span className="about-stat-num grad-text">{val}{suffix}</span>
      <span className="about-stat-label muted">{label}</span>
    </div>
  );
}

const Icon = ({ children, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const features = [
  {
    icon: <><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2l-2 5.6-5.6 2 2-5.6z" /></>,
    title: "Curated, not scraped",
    text: "Every tool is hand-picked and described in plain language — no noisy, endless lists to wade through.",
  },
  {
    icon: <path d="M21 11.5a8 8 0 0 1-11.6 7.1L3 21l2.4-6.4A8 8 0 1 1 21 11.5z" />,
    title: "Ask in plain English",
    text: "Just say what you want to do. AI Compass reads your intent and points you to the right tool.",
  },
  {
    icon: <><path d="M12 3v18" /><path d="M5 7h14" /><path d="M7 7l-3 6a3 3 0 0 0 6 0zM17 7l-3 6a3 3 0 0 0 6 0z" /></>,
    title: "Compare side by side",
    text: "Line up two or three tools and see pricing, strengths, and watch-outs at a single glance.",
  },
  {
    icon: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />,
    title: "Save your stack",
    text: "Bookmark the tools you rely on and build a personal AI toolkit you can return to any time.",
  },
];

const steps = [
  { n: "01", title: "Tell us what you need", text: "Describe the task in plain language — no jargon, no filters to learn." },
  { n: "02", title: "AI Compass analyzes it", text: "We read your intent, detect the category, and score every tool for fit." },
  { n: "03", title: "Compare the options", text: "Ranked matches with a score and a plain-English reason for each." },
  { n: "04", title: "Get your best match", text: "Open the tool, save it, or line a few up side by side." },
];

export default function About() {
  return (
    <div className="about container">
      <section className="about-hero text-c">
        <span className="eyebrow">About</span>
        <h1>Too many AI tools. <span className="grad-text">One compass.</span></h1>
        <p className="about-lead muted">
          New AI tools launch every week and it's exhausting to keep up. AI Compass exists to answer
          one simple question — "which AI should I use for this?" — so you can stop collecting tabs
          and start doing the work.
        </p>
        <div className="about-stats">
          <Stat target={tools.length} suffix="+" label="Curated tools" />
          <Stat target={categories.length} suffix="" label="Categories" />
          <Stat target={100} suffix="%" label="Free to browse" />
        </div>
      </section>

      <section className="about-section">
        <div className="section-head"><span className="eyebrow">Why it exists</span><h2>Cut through the AI noise</h2></div>
        <div className="about-features">
          {features.map((f) => (
            <div key={f.title} className="about-feature">
              <span className="about-feature-icon"><Icon>{f.icon}</Icon></span>
              <h3>{f.title}</h3>
              <p className="muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-head"><span className="eyebrow">How it works</span><h2>Four steps, start to finish</h2></div>
        <div className="about-steps">
          {steps.map((s) => (
            <div key={s.n} className="about-step">
              <span className="about-step-n">{s.n}</span>
              <div className="about-step-body"><h3>{s.title}</h3><p className="muted">{s.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta glass">
        <h2>Point me to the right AI</h2>
        <p className="muted">One search is all it takes.</p>
        <Link to="/finder" className="btn btn-primary">Open the AI Finder</Link>
      </section>
    </div>
  );
}
