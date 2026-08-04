import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

export function EmptyState({ icon = "🧭", title, text, action }) {
  return (
    <div className="empty glass">
      <span className="empty-icon">{icon}</span>
      <h3>{title}</h3>
      {text && <p className="muted">{text}</p>}
      {action}
    </div>
  );
}

export function Scanning({ label = "Analyzing your task" }) {
  return (
    <div className="scanning">
      <div className="scan-ring"><span /><span /><span /></div>
      <p className="mono muted">{label}…</p>
    </div>
  );
}
