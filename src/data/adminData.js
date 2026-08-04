export const adminUsers = [
  { name: "Priya Raman", email: "priya@mail.com", role: "user", joined: "2d ago", searches: 34 },
  { name: "Marcus Lee", email: "marcus@dev.io", role: "user", joined: "4d ago", searches: 51 },
  { name: "Site Admin", email: "admin@aicompass.app", role: "admin", joined: "1w ago", searches: 120 },
  { name: "Aisha Khan", email: "aisha@mail.com", role: "user", joined: "1w ago", searches: 12 },
  { name: "Diego Santos", email: "diego@studio.co", role: "user", joined: "2w ago", searches: 27 },
  { name: "Hana Ito", email: "hana@mail.com", role: "user", joined: "3w ago", searches: 8 },
  { name: "Tom Becker", email: "tom@mail.com", role: "user", joined: "1mo ago", searches: 63 },
];

export const adminReviews = [
  { user: "Marcus Lee", tool: "ChatGPT", rating: 5, text: "Fits right into my workflow. Hard to go back after using it daily.", at: "3h ago", status: "published" },
  { user: "Priya Raman", tool: "Claude", rating: 5, text: "Best long-form writing quality I've found. Great for reports.", at: "8h ago", status: "published" },
  { user: "Aisha Khan", tool: "Midjourney", rating: 4, text: "Stunning images but the Discord-only flow takes getting used to.", at: "1d ago", status: "pending" },
  { user: "Diego Santos", tool: "Perplexity", rating: 4, text: "My default for research now — sources are a big plus.", at: "2d ago", status: "published" },
  { user: "Hana Ito", tool: "Canva Magic", rating: 5, text: "Design that just works for non-designers. Love it.", at: "3d ago", status: "pending" },
];

export const adminActivity = [
  { type: "user", text: "New user registered", who: "aisha@mail.com", at: "5m ago" },
  { type: "review", text: "Review submitted on Claude", who: "Priya Raman", at: "22m ago" },
  { type: "tool", text: "Tool updated — Midjourney", who: "admin", at: "1h ago" },
  { type: "user", text: "New user registered", who: "diego@studio.co", at: "3h ago" },
  { type: "review", text: "Review flagged for approval", who: "Aisha Khan", at: "5h ago" },
];

// mock search volume per category slug (for "most searched" ranking)
export const categorySearches = {
  coding: 4820, writing: 6110, design: 3240, image: 5380, video: 1890,
  music: 1420, research: 4570, website: 2760, data: 2210, presentation: 1650,
};
