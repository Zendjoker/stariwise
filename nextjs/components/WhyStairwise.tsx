import Reveal from "./Reveal";

export default function WhyStairwise() {
  return (
    <section id="why" className="bg-grey" aria-labelledby="why-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">The Stairwise difference</p>
          <h2 id="why-heading">Built for San Francisco stairs.</h2>
          <p>Most crews quote flat, wide, ground-floor moves. San Francisco isn&apos;t that. We plan for the terrain that trips everyone else up.</p>
        </Reveal>

        <div className="feature-grid">
          {[
            { title: "Steep hills", body: "We stage the truck, chock the wheels, and carry with control on the grades that make Muni brakes squeal." },
            { title: "Four-flight walk-ups", body: "No elevator, no problem. We pace the crew, protect the treads, and keep every trip up and down safe." },
            { title: "Narrow Victorian staircases", body: "Tight winders and low landings need angles, patience, and hoisting straps, all things we bring standard." },
            { title: "Tight doorways & parking", body: "We measure doorframes, remove doors when needed, and handle street parking and temporary permit rules." },
          ].map(({ title, body }) => (
            <Reveal key={title} className="feature-block">
              <svg className="icon-line" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 26l7-9 5 5 6-11 8 13z"/><path d="M3 26h26"/></svg>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="goat-tie">Sure-footed on the terrain nobody else wants, the same instinct that keeps a mountain goat steady on a cliff keeps our crew steady on your stairs.</p>
        </Reveal>
      </div>
    </section>
  );
}
