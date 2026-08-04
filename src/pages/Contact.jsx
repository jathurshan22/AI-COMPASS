import { useState } from "react";
import FormSelect from "../components/FormSelect.jsx";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "feedback", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const infos = [
    {
      icon: <path d="M21 11.5a8 8 0 0 1-11.6 7.1L3 21l2.4-6.4A8 8 0 1 1 21 11.5z" />,
      title: "Feedback", text: "Ideas to make AI Compass better.",
    },
    {
      icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
      title: "Suggest a tool", text: "Know an AI we're missing? Tell us.",
    },
    {
      icon: <><path d="M10.3 4.3 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" /><path d="M12 9.5v4M12 17.2h.01" /></>,
      title: "Report an issue", text: "Spot wrong info on a tool? Flag it.",
    },
  ];

  return (
    <div className="contact container">
      <div className="explore-head text-c">
        <span className="eyebrow">Contact</span>
        <h1>Get in touch</h1>
        <p className="muted" style={{ marginInline: "auto" }}>Questions, suggestions, or a tool we should add — we'd love to hear it.</p>
      </div>

      <div className="contact-grid">
        <aside className="stack gap-16">
          {infos.map((i) => (
            <div key={i.title} className="contact-info glass">
              <span className="contact-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{i.icon}</svg>
              </span>
              <div><strong>{i.title}</strong><p className="muted">{i.text}</p></div>
            </div>
          ))}
        </aside>

        <div className="glass card-pad contact-form">
          {sent ? (
            <div className="contact-sent">
              <span className="contact-sent-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 6" /></svg>
              </span>
              <h2>Message sent</h2>
              <p className="muted">Thanks, {form.name.split(" ")[0]}. We'll get back to you soon.</p>
              <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", type: "feedback", message: "" }); }}>Send another</button>
            </div>
          ) : (
            <>
              <div className="grid grid-2" style={{ gap: 16 }}>
                <label className="field"><span>Name</span><input value={form.name} onChange={set("name")} placeholder="Your name" /></label>
                <label className="field"><span>Email</span><input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" /></label>
              </div>
              <div className="field"><span>Topic</span>
                <FormSelect value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))}
                  options={[{ value: "feedback", label: "General feedback" }, { value: "suggest", label: "Suggest a tool" }, { value: "report", label: "Report an issue" }]} />
              </div>
              <label className="field"><span>Message</span>
                <textarea rows={5} value={form.message} onChange={set("message")} placeholder="What's on your mind?" />
              </label>
              <button className="btn btn-primary btn-block" onClick={submit}>Send message</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}