import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Icon from "../components/Icon.jsx";
import "./Auth.css";

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth">
      <aside className="auth-visual">
        <div className="auth-visual-glow" />
        <div className="auth-visual-inner">
          <div className="auth-badge" aria-hidden="true">
            <span className="auth-ring r1" />
            <span className="auth-ring r2" />
            <span className="auth-core"><span className="brand-needle" /></span>
          </div>
          <h2>Point yourself to the right AI.</h2>
          <p className="muted">Stop collecting tabs. Find the tool that fits the task.</p>
          <ul className="auth-points">
            <li><span className="auth-point-ic"><Icon name="spark" size={16} /></span>Curated tools, plain-English picks</li>
            <li><span className="auth-point-ic"><Icon name="scale" size={16} /></span>Compare options side by side</li>
            <li><span className="auth-point-ic"><Icon name="bookmark" size={16} /></span>Save your personal AI stack</li>
          </ul>
        </div>
      </aside>

      <div className="auth-panel">
        <div className="auth-card glass">
          <Link to="/" className="brand" style={{ marginBottom: 8 }}>
            <span className="brand-mark"><span className="brand-needle" /></span>
            <span className="brand-name">AI Compass</span>
          </Link>
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

export function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email);
    navigate("/dashboard");
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your AI Compass.">
      <div className="auth-form">
        <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Field label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <button className="btn btn-primary btn-block" onClick={submit}>Log in</button>
        <p className="auth-hint muted">Tip: use an email with "admin" to see the admin dashboard.</p>
      </div>
      <p className="auth-alt">No account? <Link to="/register">Create one</Link></p>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    register(form.name, form.email);
    navigate("/dashboard");
  };

  return (
    <AuthShell title="Create your account" subtitle="Start finding the right AI in seconds.">
      <div className="auth-form">
        <Field label="Name" value={form.name} onChange={set("name")} placeholder="Jathurshan" />
        <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        <Field label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" />
        <button className="btn btn-primary btn-block" onClick={submit}>Create account</button>
      </div>
      <p className="auth-alt">Already have an account? <Link to="/login">Log in</Link></p>
    </AuthShell>
  );
}
