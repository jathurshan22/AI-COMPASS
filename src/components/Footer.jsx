import { Link } from "react-router-dom";
import "./Footer.css";

const cols = [
  { title: "Product", links: [["AI Finder", "/finder"], ["Explore", "/explore"], ["Categories", "/categories"], ["Compare", "/compare"]] },
  { title: "Account", links: [["Dashboard", "/dashboard"], ["Saved tools", "/saved"], ["Log in", "/login"], ["Sign up", "/register"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Reviews", "/reviews"], ["How it works", "/about"]] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><span className="brand-needle" /></span>
            <span className="brand-name">AI Compass</span>
          </Link>
          <p className="muted">Find the right AI for whatever you're trying to do — in seconds, not tabs.</p>
        </div>
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(([label, to]) => (
                <li key={label + to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span className="muted">© {new Date().getFullYear()} AI Compass · Built by Jathurshan</span>
      </div>
    </footer>
  );
}
