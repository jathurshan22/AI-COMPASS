import { useEffect, useRef } from "react";
import "./CompassFollower.css";

export default function CompassFollower() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastY = window.scrollY;
    let dir = 1; // 1 = scrolling down, -1 = up
    const update = () => {
      raf = 0;
      const vh = window.innerHeight, vw = window.innerWidth;
      const y = window.scrollY;
      if (y > lastY + 0.5) dir = 1; else if (y < lastY - 0.5) dir = -1;
      lastY = y;
      const docH = document.documentElement.scrollHeight - vh;
      const p = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
      const home = Math.max(0, 1 - p / 0.02);           // snaps out of the title almost immediately

      // measure the title's A slot (real position, no guessing)
      const slot = document.querySelector(".ct-needleA");
      const r = slot ? slot.getBoundingClientRect() : null;
      const hx = r ? r.left + r.width / 2 : vw * 0.72;
      const hy = r ? r.top + r.height / 2 : vh * 0.32;
      const hScale = r ? (r.height * 0.92) / 46 : 1.05;

      // travelling path when scrolled (over the content, weaving edge<->edge)
      const sway = Math.sin(p * Math.PI * 3);
      const depth = Math.abs(sway);
      const tx = vw / 2 + sway * 0.40 * vw;
      const ty = (0.14 + p * 0.72) * vh;
      const tScale = 0.8 + depth * 0.55;

      // blend: home (title A) <-> travel
      const X = tx + (hx - tx) * home;
      const Y = ty + (hy - ty) * home;
      const S = tScale + (hScale - tScale) * home;
      const near = Math.max(depth * (1 - home), home);
      // hide the moment the needle crosses into the footer
      const footer = document.querySelector(".footer");
      let footerFade = 1;
      if (footer) {
        const ft = footer.getBoundingClientRect().top;   // footer top in viewport px
        footerFade = Y < ft - 24 ? 1 : 0;                // fully hidden once it reaches the footer line
      }
      el.style.setProperty("--x", `${X.toFixed(1)}px`);
      el.style.setProperty("--y", `${Y.toFixed(1)}px`);
      el.style.setProperty("--s", S.toFixed(3));
      el.style.setProperty("--b", `${((1 - near) * 2.4).toFixed(2)}px`);
      el.style.setProperty("--o", ((0.32 + near * 0.68) * footerFade).toFixed(3));
      el.style.setProperty("--r", `${(Math.cos(p * Math.PI * 3) * 18 * (1 - home)).toFixed(1)}deg`);
      // face the travel direction: instantly flip to nose-down on scroll-down, nose-up on scroll-up
      const faceTarget = dir > 0 ? 180 : 0;
      el.style.setProperty("--flip", `${(faceTarget * (1 - home)).toFixed(1)}deg`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    // recompute after layout/fonts/images settle so it lands right without a mouse move
    requestAnimationFrame(update);
    const t1 = setTimeout(update, 60);
    const t2 = setTimeout(update, 200);
    const t3 = setTimeout(update, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    window.addEventListener("load", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener("load", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="compass-follower" ref={ref} aria-hidden="true">
      <span className="cf-trail" />
      <span className="cf-halo" />
      <svg viewBox="0 0 26 30">
        <defs>
          <linearGradient id="cfGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb" /><stop offset="0.55" stopColor="#7c3aed" /><stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path d="M4 28 L13 3 L22 28" fill="none" stroke="url(#cfGrad)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M8 19 L18 19" fill="none" stroke="url(#cfGrad)" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}