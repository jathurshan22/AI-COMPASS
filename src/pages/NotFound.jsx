import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: "calc(var(--nav-h) + 100px)", paddingBottom: 100, textAlign: "center" }}>
      <span className="grad-text" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "5rem", lineHeight: 1 }}>404</span>
      <h1 style={{ margin: "16px 0 10px" }}>Off the map</h1>
      <p className="muted" style={{ marginBottom: 26 }}>This page doesn't exist. Let the compass take you home.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
