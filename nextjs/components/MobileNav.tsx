"use client";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const btn = document.getElementById("menuOpen");
    if (btn) btn.onclick = () => setOpen(true);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`mobile-nav${open ? " open" : ""}`} id="mobileNav" aria-hidden={!open}>
      <div className="mobile-nav-top">
        <span className="logotype">stair<span className="wise">wise</span></span>
        <button className="mobile-nav-close" onClick={close} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
      <nav className="mobile-nav-links" aria-label="Mobile">
        {(["#services","#why","#work","#pricing","#areas","#contact"] as const).map((href) => (
          <a key={href} href={href} onClick={close}>
            {href.replace("#", "").replace(/-./g, c => " " + c[1].toUpperCase()).replace(/^\w/, c => c.toUpperCase())}
          </a>
        ))}
        <a href="/about" onClick={close}>About</a>
      </nav>
      <div className="mobile-nav-cta">
        <a className="btn btn-primary btn-lg" href="#contact" onClick={close}>Get a Free Quote</a>
        <a className="btn btn-outline btn-lg" href="tel:+14157248720">Call (415) 724-8720</a>
      </div>
    </div>
  );
}
