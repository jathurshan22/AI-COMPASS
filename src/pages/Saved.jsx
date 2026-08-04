import { Link } from "react-router-dom";
import { ToolCard } from "../components/Cards.jsx";
import { EmptyState } from "../components/Ui.jsx";
import { useApp } from "../context/AppContext.jsx";
import { toolMap } from "../data/tools.js";

export default function Saved() {
  const { saved } = useApp();
  const list = saved.map((s) => toolMap[s]).filter(Boolean);

  return (
    <div className="explore container">
      <div className="explore-head">
        <span className="eyebrow">Your library</span>
        <h1>Saved tools</h1>
        <p className="muted">Everything you've bookmarked, in one place.</p>
      </div>

      {list.length ? (
        <div className="grid grid-4">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      ) : (
        <EmptyState icon="♡" title="No saved tools yet"
          text="Tap the heart on any tool to keep it here for later."
          action={<Link to="/explore" className="btn btn-primary">Explore tools</Link>} />
      )}
    </div>
  );
}
