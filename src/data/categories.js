export const categories = [
  { slug: "coding", name: "Coding", icon: "💻", description: "Write, debug, and ship code faster." },
  { slug: "writing", name: "Writing", icon: "✍️", description: "Content, emails, essays, and copy." },
  { slug: "design", name: "Design", icon: "🎨", description: "UI, UX, logos, and visual work." },
  { slug: "image", name: "Image", icon: "🖼️", description: "Generate and edit images from text." },
  { slug: "video", name: "Video", icon: "🎬", description: "Create and edit video with AI." },
  { slug: "music", name: "Music & Audio", icon: "🎵", description: "Songs, voice, and sound design." },
  { slug: "research", name: "Research", icon: "📚", description: "Search, summarize, and learn." },
  { slug: "website", name: "Website", icon: "🌐", description: "Build sites and apps from a prompt." },
  { slug: "data", name: "Data", icon: "📊", description: "Analyze data and build charts." },
  { slug: "presentation", name: "Presentation", icon: "📱", description: "Slides and decks in minutes." },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));
