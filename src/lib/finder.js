import { tools } from "../data/tools.js";

const STOP = new Set([
  "i", "want", "to", "a", "an", "the", "for", "my", "me", "with", "and", "of",
  "in", "on", "is", "how", "do", "create", "make", "build", "need", "using",
  "some", "help", "please", "app", "that", "can", "you", "best", "which",
]);

const HINTS = {
  website: ["website", "portfolio", "landing", "webpage", "web", "site"],
  coding: ["code", "coding", "react", "python", "javascript", "api", "bug", "debug", "function", "program"],
  design: ["design", "ui", "ux", "logo", "figma", "mockup", "banner", "graphic"],
  image: ["image", "picture", "photo", "art", "illustration", "poster"],
  video: ["video", "reel", "animation", "clip", "movie", "motion"],
  music: ["music", "song", "audio", "beat", "track", "voice", "speech", "narration"],
  writing: ["write", "writing", "content", "blog", "essay", "email", "copy", "article"],
  research: ["research", "search", "summarize", "summary", "study", "learn", "answer"],
  data: ["data", "analysis", "chart", "excel", "csv", "spreadsheet"],
  presentation: ["presentation", "slides", "deck", "pitch", "slide"],
};

function tokenize(query) {
  return query.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
}

function inferCategories(words) {
  const joined = words.join(" ");
  const hits = new Set();
  for (const [cat, keys] of Object.entries(HINTS)) {
    if (keys.some((k) => joined.includes(k))) hits.add(cat);
  }
  return [...hits];
}

export function findTools(query, { budget, skillLevel } = {}) {
  const words = tokenize(query);
  const inferred = inferCategories(words);

  const scored = tools
    .map((tool) => {
      let score = 0;
      const reasons = [];

      const catMatches = tool.categories.filter((c) => inferred.includes(c));
      if (catMatches.length) { score += catMatches.length * 3; reasons.push(`fits ${catMatches.join(", ")}`); }

      const tagMatches = tool.tags.filter((t) =>
        words.some((w) => t.toLowerCase().includes(w) || w.includes(t.toLowerCase()))
      );
      if (tagMatches.length) { score += tagMatches.length * 2; reasons.push(`matches ${tagMatches.slice(0, 3).join(", ")}`); }

      if (words.some((w) => tool.name.toLowerCase().includes(w))) score += 4;

      if (budget === "free" && tool.pricing === "free") score += 2;
      if (budget === "free" && tool.pricing === "paid") score -= 3;
      if (skillLevel && tool.skillLevel === skillLevel) score += 1;

      score += tool.rating * 0.4 + tool.popularity * 0.01;
      return { tool, score, reasons };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const top = scored[0]?.score || 1;
  return {
    query,
    inferred,
    results: scored.map((r) => ({
      match: Math.min(99, Math.round((r.score / top) * 92 + 6)),
      why: r.reasons.length ? r.reasons.join(" · ") : "a solid general fit for your task",
      tool: r.tool,
    })),
  };
}
