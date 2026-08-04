import { Link } from "react-router-dom";
import CompassHero from "../components/CompassHero.jsx";
import CompassFollower from "../components/CompassFollower.jsx";
import { ToolCard, CategoryCard, StarRating } from "../components/Cards.jsx";
import Icon from "../components/Icon.jsx";
import Avatar from "../components/Avatar.jsx";
import { useReveal, useCountUp } from "../lib/hooks.js";
import { tools } from "../data/tools.js";
import { categories } from "../data/categories.js";
import "./Home.css";

function Stat({ target, suffix, label }) {
  const [val, ref] = useCountUp(target);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-num grad-text">{val}{suffix}</span>
      <span className="stat-label muted">{label}</span>
    </div>
  );
}

const steps = [
  { n: "01", icon: "message", title: "Describe your task", text: "Tell AI Compass what you're trying to do, in plain words." },
  { n: "02", icon: "search", title: "We analyze it", text: "The finder reads your intent and scores every tool for fit." },
  { n: "03", icon: "scale", title: "Compare the matches", text: "See ranked results with a match score and the reason why." },
  { n: "04", icon: "check", title: "Pick your AI", text: "Open the tool, save it, or compare a few side by side." },
];

const testimonials = [
  { name: "Priya R.", role: "Product designer", rating: 5, text: "I used to keep 20 tabs of AI tools. Now I just describe the job and get the right one." },
  { name: "Marcus L.", role: "Indie developer", rating: 5, text: "The match scores are genuinely useful. Found two tools I'd never heard of." },
  { name: "Aisha K.", role: "Content lead", rating: 5, text: "Clean, fast, and the recommendations actually make sense. Feels premium." },
];

export default function Home() {
  const popular = [...tools].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r5 = useReveal();

  return (
    <div className="home">
      <CompassFollower />
      {/* ---------- immersive compass hero ---------- */}
      <CompassHero />

      {/* ---------- stats band ---------- */}
      <section className="container home-statsband">
        <Stat target={tools.length} suffix="+" label="AI tools curated" />
        <Stat target={categories.length} suffix="" label="Categories" />
        <Stat target={98} suffix="%" label="Match accuracy" />
        <Stat target={100} suffix="%" label="Free to browse" />
      </section>

      {/* ---------- popular ---------- */}
      <section className="section container reveal popular-section" ref={r1}>
        <div className="popular-blob b1" /><div className="popular-blob b2" />
        <div className="popular-head">
          <div className="popular-head-text">
            <span className="eyebrow">Loved by users</span>
            <h2>Popular AI tools</h2>
          </div>
          <Link to="/explore" className="btn btn-ghost btn-sm popular-explore">Explore all →</Link>
        </div>
        <div className="grid grid-4 popular-grid">
          {popular.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* ---------- categories ---------- */}
      <section className="section container reveal" ref={r2}>
        <div className="section-head">
          <span className="eyebrow">Browse by need</span>
          <h2>Every category, one compass</h2>
          <p>From coding to music, jump straight to the tools that fit the job.</p>
        </div>
        <div className="grid grid-3">
          {categories.slice(0, 6).map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
        <div className="text-c" style={{ marginTop: 32 }}>
          <Link to="/categories" className="btn btn-ghost">See all categories</Link>
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="section how reveal" ref={r3}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From task to tool in four steps</h2>
          </div>
          <div className="how-steps">
            {steps.map((s) => (
              <div key={s.n} className="how-step">
                <span className="how-step-ic"><Icon name={s.icon} size={22} /></span>
                <span className="how-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ---------- testimonials ---------- */}
      <section className="section how reveal" ref={r5}>
        <div className="container">
          <div className="section-head"><span className="eyebrow">What people say</span><h2>Trusted for the tricky choices</h2></div>
          <div className="quotes">
            {testimonials.map((t) => (
              <figure key={t.name} className="quote">
                <blockquote>{t.text}</blockquote>
                <figcaption className="quote-foot">
                  <Avatar name={t.name} size={42} />
                  <span className="quote-who">
                    <strong>{t.name}</strong>
                    <span className="muted">{t.role}</span>
                  </span>
                  <span className="quote-stars"><StarRating value={t.rating || 5} size={14} /></span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-c" style={{ marginTop: 32 }}>
            <Link to="/reviews" className="btn btn-ghost">Read all reviews →</Link>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section container">
        <div className="cta cta-3d glass">
          <div className="cta-glow" />
          <div className="cta-stage" aria-hidden="true">
            <div className="cta-compass">
              <span className="cta-ring cr1" />
              <span className="cta-ring cr2" />
              <span className="cta-ring cr3" />
              <span className="cta-core"><span className="brand-needle" /></span>
              <span className="cta-dot cd1" />
              <span className="cta-dot cd2" />
              <span className="cta-dot cd3" />
            </div>
          </div>
          <h2>Ready to find your AI?</h2>
          <p className="muted">Describe your next task and let the compass point the way.</p>
          <div className="row center gap-12 wrap">
            <Link to="/finder" className="btn btn-primary">Try the AI Finder</Link>
            <Link to="/explore" className="btn btn-ghost">Browse tools</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
