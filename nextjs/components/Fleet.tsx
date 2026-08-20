import Reveal from "./Reveal";

export default function Fleet() {
  return (
    <section id="fleet" aria-labelledby="fleet-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Fleet &amp; team</p>
          <h2 id="fleet-heading">A deep bench, sized to your job.</h2>
          <p>Enough crews and the right vans to match any move — from a single heavy item to a full-home haul — with the availability to get there fast.</p>
        </Reveal>

        <div className="fleet-grid">
          <Reveal className="fleet-stat">
            <span className="fleet-num">30<span>+</span></span>
            <h3>Crews available</h3>
            <p>Across San Francisco, so there&apos;s always a team ready for your neighborhood and your timeline.</p>
          </Reveal>

          <Reveal className="fleet-stat">
            <span className="fleet-num">5<span>+</span></span>
            <h3>Years average experience</h3>
            <p>In moving, cleaning, assembly, and junk removal — seasoned hands on every job.</p>
          </Reveal>

          <Reveal className="fleet-card">
            <span className="icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </span>
            <h3>Vans sized to the job</h3>
            <p>Small, medium, and large vans on hand — we bring the right size so you never pay for space you don&apos;t need.</p>
          </Reveal>

          <Reveal className="fleet-card">
            <span className="icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
            </span>
            <h3>Same &amp; next-day availability</h3>
            <p>Booked last minute? We keep slots open for same-day and next-day jobs across the city.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
