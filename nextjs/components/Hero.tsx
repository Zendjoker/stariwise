import Reveal from "./Reveal";
import HeroVideo from "./HeroVideo";

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="8 12.5 10.8 15 16 9"/></svg>
);

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="wrap hero-grid">
        <Reveal className="hero-copy">
          <p className="hero-kicker">San Francisco &middot; Moving, Lifting &amp; Assembly</p>
          <h1 id="hero-heading">Book your move in a minute. We got you.</h1>
          <p className="hero-sub">
            Pick a time on the calendar and we&apos;ll confirm your free quote call in minutes &mdash; no forms, no phone tag. Same crew that handles the steep hills, walk-ups, and narrow staircases other movers turn down.
          </p>
          <div className="hero-cta">
            <a className="btn btn-ghost-light btn-lg" href="tel:+14157248720">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call (415) 724-8720
            </a>
          </div>
          <ul className="hero-stats" aria-label="Stairwise at a glance">
            <li><strong>30+</strong><span>crews across SF</span></li>
            <li><strong>5+ yrs</strong><span>avg. experience</span></li>
            <li><strong>5.0 ★</strong><span>customer rating</span></li>
          </ul>
        </Reveal>

        <Reveal className="hero-art-wrap">
          <HeroVideo />
          <div className="hero-float-card">
            <strong>5.0 ★</strong>
            <span>Rated by San Francisco customers</span>
          </div>
        </Reveal>
      </div>

      <div className="wrap trust-strip-wrap">
        <ul className="trust-strip">
          <li><CheckCircle /> Strong Crew, Careful Hands</li>
          <li><CheckCircle /> Upfront Pricing</li>
          <li><CheckCircle /> Same-Week Availability</li>
          <li><CheckCircle /> Satisfaction Guaranteed</li>
        </ul>
      </div>
    </section>
  );
}
