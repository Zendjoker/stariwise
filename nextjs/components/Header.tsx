"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Stairwise home">
          <span className="logotype">stair<span className="wise">wise</span></span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#work">Our Work</a>
          <Link href="/about">About</Link>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:+14157248720">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            (415) 724-8720
          </a>

          {user ? (
            <div className="header-user">
              <Link href="/need-helper" className="header-avatar" title={user.display_name}>
                {user.profile_picture
                  ? <img src={user.profile_picture} alt={user.display_name} />
                  : <span>{user.display_name.charAt(0).toUpperCase()}</span>}
              </Link>
              <button className="header-logout" onClick={logout} title="Sign out">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          ) : (
            <a className="btn btn-primary" href="/#contact">Get a Quote</a>
          )}

          <button className="menu-toggle" id="menuOpen" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
