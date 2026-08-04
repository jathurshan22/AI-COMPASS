import { useState } from "react";

// Renders the official brand logo from the Simple Icons CDN.
// If there's no icon slug (or it fails to load), shows a clean
// brand-coloured letter badge instead of a broken image / emoji.
export default function ToolLogo({ tool, size = 30 }) {
  const [failed, setFailed] = useState(false);
  const brand = tool.brand || "#2563EB";
  const useImg = tool.icon && !failed;

  if (useImg) {
    return (
      <img
        className="tool-logo-img"
        src={`https://cdn.simpleicons.org/${tool.icon}/${brand.replace("#", "")}`}
        alt={`${tool.name} logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  // fallback: letter badge in the brand colour
  return (
    <span
      className="tool-logo-badge"
      style={{
        width: size + 6,
        height: size + 6,
        background: brand,
        fontSize: (size + 6) * 0.5,
      }}
      aria-label={`${tool.name} logo`}
    >
      {tool.name.charAt(0)}
    </span>
  );
}
