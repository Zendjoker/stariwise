import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Reviews: What San Francisco Says About Stairwise",
  description:
    "Read Stairwise customer reviews from across San Francisco: moving, heavy lifting, furniture assembly, cleaning, and junk removal jobs done right.",
  alternates: { canonical: "https://gostairwise.com/reviews" },
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Reviews: What San Francisco Says About Stairwise",
    description: "Customer reviews from San Francisco moving, heavy lifting, and furniture assembly jobs.",
    url: "https://gostairwise.com/reviews",
    images: [{ url: "https://gostairwise.com/images/hero.webp" }],
  },
};

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.9L12 17.5 5.7 20.6l1.6-6.9L2 9.1l7-.6z"/></svg>
);

const REVIEWS = [
  { name: "Marisa T.", loc: "Pacific Heights", job: "Furniture moving, 4th floor walk-up", quote: "They carried a sofa up four flights in a Victorian on Fillmore without a single scuff on the walls. The quote never changed. I've already recommended them to two neighbors." },
  { name: "Devon R.", loc: "Bernal Heights", job: "Piano moving", quote: "We had an upright piano that two other companies wouldn't touch on our Bernal Heights hill. Stairwise showed up with the right straps and had it inside in twenty minutes. Genuinely impressive." },
  { name: "Priya K.", loc: "SoMa", job: "Furniture assembly", quote: "Booked them to assemble a full bedroom set and a standing desk. On time, tidy, and they hauled every box away. The whole apartment was livable by lunch. Exactly what I hoped for." },
  { name: "Alan W.", loc: "Nob Hill", job: "Full apartment move", quote: "Two-bedroom move from a fourth-floor walk-up to a building with a tiny elevator. They planned the whole thing before touching a box and finished faster than quoted." },
  { name: "Camille D.", loc: "Noe Valley", job: "Move-out cleaning", quote: "Used them for a move-out clean on a short deadline. Kitchen and bathrooms were spotless, got our full deposit back. Would book again without thinking twice." },
  { name: "Jordan M.", loc: "Mission District", job: "Junk removal", quote: "Cleared out a garage full of old furniture and appliances in under two hours. Quoted upfront, no surprise fees when the truck was full." },
  { name: "Sana F.", loc: "Russian Hill", job: "Heavy lifting, gym equipment", quote: "Needed a squat rack and full home gym moved down three flights of narrow stairs. They came with the right equipment and didn't scratch a single wall." },
  { name: "Theo B.", loc: "Financial District", job: "Office relocation", quote: "Moved our 12-person office over a weekend, desks, monitors, filing cabinets, all reassembled and labeled by Monday morning. Zero downtime for the team." },
  { name: "Renee K.", loc: "Cow Hollow", job: "Furniture assembly & mounting", quote: "Assembled a wardrobe, a crib, and mounted two TVs in one visit. Careful with the walls, cleaned up all the packaging, and were done in about three hours." },
];

export default function ReviewsPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
        <div className="wrap">
          <Reveal className="hero-copy" style={{ maxWidth: 760 }}>
            <h1 id="reviews-page-heading">What San Francisco says about Stairwise.</h1>
            <p className="hero-sub" style={{ maxWidth: "60ch" }}>
              Real jobs across the city: moving, heavy lifting, furniture assembly, cleaning,
              junk removal, and office relocations. Here&apos;s what customers told us afterward.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="reviews-list-heading">
        <div className="wrap wrap-wide">
          <Reveal className="section-head center">
            <p className="eyebrow">Job by job</p>
            <h2 id="reviews-list-heading">Recent customer reviews.</h2>
          </Reveal>
          <div className="reviews-grid">
            {REVIEWS.map(({ name, loc, job, quote }) => (
              <Reveal key={name + job} as="figure" className="review-card">
                <div className="stars" aria-label="Five out of five stars">
                  {[...Array(5)].map((_, i) => <Star key={i} />)}
                </div>
                <blockquote>{quote}</blockquote>
                <figcaption className="review-meta">
                  <span className="review-name">
                    <strong>{name}</strong>
                    <span className="review-loc">{loc} &middot; {job}</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey" aria-labelledby="reviews-cta-heading">
        <div className="wrap" style={{ maxWidth: 760, textAlign: "center" }}>
          <Reveal className="section-head center">
            <p className="eyebrow">Get a quote</p>
            <h2 id="reviews-cta-heading">Ready to book your crew?</h2>
            <p>Upfront pricing, no stair fees, and a crew that knows every hill and walk-up in the city.</p>
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
