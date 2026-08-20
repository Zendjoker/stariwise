export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <span className="logotype">stair<span className="wise">wise</span></span>
              <p className="footer-tag">San Francisco moving, heavy lifting, and furniture assembly — built for the city&apos;s hills, walk-ups, and narrow staircases.</p>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/reviews">Reviews</a>
              <a href="/#services">Services</a>
              <a href="/#pricing">Pricing</a>
            </div>
            <div className="footer-col footer-contact">
              <h4>Contact</h4>
              <a href="tel:+14157248720">(415) 724-8720</a>{" "}
              <a href="mailto:hello@gostairwise.com">hello@gostairwise.com</a>
              <p style={{ opacity: 0.7 }}>Open 7 days · 7am–8pm</p>
            </div>
            <div className="footer-col">
              <h4>Service areas</h4>
              <p style={{ opacity: 0.85 }}>San Francisco · Daly City · South San Francisco · Brisbane · Colma · Oakland · Berkeley · San Mateo</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-brand-row">
              <span>&copy; {year} Stairwise. All rights reserved.</span>
            </div>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <a href="/terms" style={{ color: "inherit", opacity: 0.7 }}>Terms of Service</a>
              <a href="/privacy" style={{ color: "inherit", opacity: 0.7 }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-callbar">
        <a className="btn btn-primary" href="tel:+14157248720">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Now — (415) 724-8720
        </a>
      </div>
    </>
  );
}
