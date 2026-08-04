import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ToolCard } from "../components/Cards.jsx";
import { EmptyState } from "../components/Ui.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import SortSelect from "../components/SortSelect.jsx";
import { tools } from "../data/tools.js";
import { categories } from "../data/categories.js";
import "./Explore.css";

const pricings = ["free", "freemium", "paid"];
const sorts = [["popularity", "Popular"], ["rating", "Top rated"], ["name", "A–Z"]];

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "all");
  const [pricing, setPricing] = useState("all");
  const [sort, setSort] = useState("popularity");
  const [q, setQ] = useState("");

  useEffect(() => { setCategory(params.get("category") || "all"); }, [params]);

  const filtered = useMemo(() => {
    let list = tools.filter((t) => {
      if (category !== "all" && !t.categories.includes(category)) return false;
      if (pricing !== "all" && t.pricing !== pricing) return false;
      if (q && !(`${t.name} ${t.tagline} ${t.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
    const cmp = { popularity: (a, b) => b.popularity - a.popularity, rating: (a, b) => b.rating - a.rating, name: (a, b) => a.name.localeCompare(b.name) };
    return list.sort(cmp[sort]);
  }, [category, pricing, sort, q]);

  const pickCategory = (c) => {
    setCategory(c);
    if (c === "all") setParams({}); else setParams({ category: c });
  };

  return (
    <div className="explore container">
      <div className="explore-head">
        <span className="eyebrow">Explore</span>
        <h1>Browse every AI tool</h1>
        <p className="muted">Filter by category and price — or search by name.</p>
      </div>

      <div className="explore-search glass">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools…" aria-label="Search tools" />
      </div>

      <div className="explore-filters">
        <div className="filter-row">
          <button className={`chip ${category === "all" ? "active" : ""}`} onClick={() => pickCategory("all")}>All</button>
          {categories.map((c) => (
            <button key={c.slug} className={`chip ${category === c.slug ? "active" : ""}`} onClick={() => pickCategory(c.slug)}>
              <CategoryIcon slug={c.slug} size={16} />{c.name}
            </button>
          ))}
        </div>
        <div className="filter-row between">
          <div className="row gap-8 wrap">
            <button className={`chip ${pricing === "all" ? "active" : ""}`} onClick={() => setPricing("all")}>Any price</button>
            {pricings.map((p) => (
              <button key={p} className={`chip ${pricing === p ? "active" : ""}`} onClick={() => setPricing(p)} style={{ textTransform: "capitalize" }}>{p}</button>
            ))}
          </div>
          <div className="row gap-8">
            <span className="filter-label">Sort</span>
            <SortSelect options={sorts} value={sort} onChange={setSort} />
          </div>
        </div>
      </div>

      <p className="explore-count muted mono">{filtered.length} tools</p>

      {filtered.length ? (
        <div className="grid grid-4">{filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      ) : (
        <EmptyState title="Nothing matches those filters" text="Try clearing a filter or searching a different term." />
      )}
    </div>
  );
}
