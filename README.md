#  AI Compass

**Find the right AI for whatever you're trying to do.**

AI Compass is a premium, light-themed AI tool discovery platform. Describe your task in plain language and the built-in recommendation engine ranks the best AI tools for the job — with a match score and a reason for each.

Built as a **frontend-only** React + Vite project with mock data. No backend required to run — everything works client-side (a real API can be wired in later).

---

##  Features

- **AI Finder** — a rule-based recommendation engine that reads your intent, detects the category, and scores every tool for fit.
- **Explore** — filter tools by category, pricing, and skill level, with live search and sorting.
- **Compare** — line up to three tools side by side in a premium comparison table.
- **Tool Details** — full profiles with strengths, watch-outs, reviews, and alternatives.
- **Saved tools & Dashboard** — bookmark tools and track your searches (persisted in `localStorage`).
- **Auth (mock)** — login/register flow. Use an email containing `admin` to unlock the **Admin Dashboard**.
- **Admin Dashboard** — overview stats, a category chart, and tool/user management tables.
- Premium light UI: glassmorphism, a floating 3D compass hero, scroll reveals, count-up stats, 3D card tilt, and smooth page transitions.

##  Design system

| Token | Value |
|-------|-------|
| Background | `#FFFFFF` / `#F8FAFC` |
| Primary | `#2563EB` |
| Secondary | `#7C3AED` |
| Accent | `#06B6D4` |
| Text / Muted | `#0F172A` / `#64748B` |
| Fonts | Sora (display), Inter (body), IBM Plex Mono (numbers) |

##  Tech stack

- React 18 + Vite 5
- React Router 6
- Plain CSS with design tokens (no UI framework)
- Client-side mock data + recommendation logic

##  Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

##  Structure

```
src/
├── components/   # Navbar, Footer, CompassHero, Cards, SearchBox, UI
├── context/      # AppContext (auth, saved tools, search history)
├── data/         # tools.js, categories.js (mock data)
├── lib/          # finder.js (recommendation engine), hooks.js
├── pages/        # 14 pages incl. admin/
├── App.jsx       # routes + layout
└── main.jsx      # entry
```

##  Connecting a backend later

The finder logic lives in `src/lib/finder.js` and all data in `src/data/`. To go full-stack, swap those for API calls (e.g. Node/Express + MongoDB) and replace the mock auth in `src/context/AppContext.jsx` with real endpoints — the UI won't need to change.

---

Built with React + Vite.
"# AI-COMPASS" 
