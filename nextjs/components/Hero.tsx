import Reveal from "./Reveal";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="wrap">
        <Reveal className="hero-copy">
          <h1 id="hero-heading">San Francisco&apos;s moving, heavy lifting &amp; assembly crew.</h1>
          <p className="hero-sub">
            Full-service crews for steep hills, walk-ups, and narrow staircases — the jobs other movers turn down. Upfront pricing, every time.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href="#contact">Get a Free Quote</a>
            <a className="btn btn-outline btn-lg" href="tel:+14157248720">
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

        <Reveal className="hero-art">
          <Image
            src="/images/hero.webp"
            alt="A Stairwise crew in branded gear carrying a solid-wood table down a San Francisco street"
            width={1600}
            height={1067}
            priority
          />
        </Reveal>
      </div>

      <div className="trust-strip">
        <div className="wrap">
          <ul className="trust-inner">
            <li>Strong Crew, Careful Hands</li>
            <li><span className="dot" aria-hidden="true" />Upfront Pricing</li>
            <li><span className="dot" aria-hidden="true" />Same-Week Availability</li>
            <li><span className="dot" aria-hidden="true" />Satisfaction Guaranteed</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
