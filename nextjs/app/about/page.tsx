import type { Metadata } from "next";
import Image from "next/image";
import Fleet from "@/components/Fleet";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Stairwise: Our Crew, Fleet & Story | San Francisco",
  description:
    "Stairwise is a San Francisco moving, heavy lifting, and furniture assembly company built for the city's hills and walk-ups. Meet the crew, the fleet, and how we work.",
  alternates: { canonical: "https://gostairwise.com/about" },
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "About Stairwise: Our Crew, Fleet & Story",
    description:
      "Meet the San Francisco crew behind Stairwise: 30+ crews, a fleet sized to every job, and years of experience on the city's toughest moves.",
    url: "https://gostairwise.com/about",
    images: [{ url: "https://gostairwise.com/images/hero.webp" }],
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="wrap about-hero-grid">
          <Reveal className="hero-copy" style={{ maxWidth: 620 }}>
            <h1 id="about-heading">Built for San Francisco&apos;s hardest moves.</h1>
            <p className="hero-sub" style={{ maxWidth: "48ch" }}>
              Stairwise started with a simple observation: most moving companies quote flat,
              ground-floor jobs and struggle the moment a staircase, a hill, or a tight doorway
              shows up. San Francisco is almost never flat. So we built a crew, a fleet, and a
              pricing model specifically for the city we work in.
            </p>
          </Reveal>
          <Reveal className="hero-art">
            <Image
              src="/images/work-web/vans-1.webp"
              alt="A Stairwise van loaded for a San Francisco job"
              width={1100}
              height={619}
              priority
            />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="story-heading">
        <div className="wrap about-story-grid">
          <div>
            <Reveal className="section-head">
              <p className="eyebrow">Our story</p>
              <h2 id="story-heading">From one crew to a citywide operation.</h2>
            </Reveal>
            <Reveal>
              <p style={{ opacity: 0.85, lineHeight: 1.7, marginBottom: "1.2rem" }}>
                We started by taking on the jobs other movers turned down. Fourth-floor walk-ups
                with no elevator, upright pianos on Bernal Heights hills, narrow Victorian
                staircases that need a straps-and-patience approach instead of brute force. That
                specialization is still what defines us today.
              </p>
              <p style={{ opacity: 0.85, lineHeight: 1.7, marginBottom: "1.2rem" }}>
                Every crew member is trained on stair technique, load balancing, and building
                etiquette, protecting hallways, elevators, and treads is as much a part of the job
                as the lifting itself. We carry commercial liability and cargo insurance on every
                job, and we quote per person, per hour, with no surcharges for the terrain that
                makes San Francisco San Francisco.
              </p>
              <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
                Today Stairwise covers San Francisco, the Peninsula, and the East Bay, with the
                fleet and crew depth to take on anything from a single heavy item to a full
                office relocation.
              </p>
            </Reveal>
          </div>
          <Reveal className="hero-art">
            <Image
              src="/images/work-web/heavy-2.webp"
              alt="Stairwise crew heavy lifting on a San Francisco job"
              width={1100}
              height={734}
            />
          </Reveal>
        </div>
      </section>

      <Fleet />

      <section className="bg-grey" aria-labelledby="hire-heading">
        <div className="wrap" style={{ maxWidth: 820, textAlign: "center" }}>
          <Reveal className="section-head center">
            <p className="eyebrow">Get to know the crew</p>
            <h2 id="hire-heading">Ready to book, or just have questions?</h2>
            <p>Call, text, or send a quote request, we&apos;ll walk you through pricing and availability.</p>
          </Reveal>
          <Reveal className="hero-cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary btn-lg" href="/#contact">Get a Free Quote</a>
            <a className="btn btn-outline btn-lg" href="tel:+14157248720">Call (415) 724-8720</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
