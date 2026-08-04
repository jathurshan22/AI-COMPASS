// Clean, professional line icons for each category (stroke-based, no emoji).
const PATHS = {
  coding: "M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12",
  writing: "M4 20h16M6 16l9-9a2 2 0 0 0-3-3l-9 9v3h3zM13 5l3 3",
  design: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-.4-.2-.7-.4-1-.2-.2-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8z M7.5 12a1 1 0 1 0 0-.01M12 8a1 1 0 1 0 0-.01M16 12a1 1 0 1 0 0-.01",
  image: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6M15.5 8.5a1.5 1.5 0 1 0 0-.01",
  video: "M3 6h18v12H3zM10 9l5 3-5 3z",
  music: "M9 18V6l10-2v12M9 18a3 3 0 1 1-2-2.8M19 16a3 3 0 1 1-2-2.8",
  research: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  website: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 5.8 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.8-3.5-9s1-6.5 3.5-9z",
  data: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  presentation: "M3 4h18M4 4v10h16V4M9 14l-2 5M15 14l2 5M12 4V2",
};

export default function CategoryIcon({ slug, size = 24 }) {
  const d = PATHS[slug] || PATHS.coding;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
