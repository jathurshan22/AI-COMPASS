import { CategoryCard } from "../components/Cards.jsx";
import { categories } from "../data/categories.js";
import { tools } from "../data/tools.js";
import "./Explore.css";

export default function Categories() {
  const countFor = (slug) => tools.filter((t) => t.categories.includes(slug)).length;
  return (
    <div className="explore container">
      <div className="explore-head text-c">
        <span className="eyebrow">Categories</span>
        <h1>Find AI by what you need</h1>
        <p className="muted" style={{ marginInline: "auto" }}>
          Ten focused categories, each pointing to the tools built for that job.
        </p>
      </div>
      <div className="grid grid-3">
        {categories.map((c) => <CategoryCard key={c.slug} category={c} count={countFor(c.slug)} />)}
      </div>
    </div>
  );
}
