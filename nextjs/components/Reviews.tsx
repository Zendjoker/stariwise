import Reveal from "./Reveal";
import Link from "next/link";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.9L12 17.5 5.7 20.6l1.6-6.9L2 9.1l7-.6z"/></svg>
);

const REVIEWS = [
  { name: "Marisa T.", loc: "Pacific Heights walk-up", job: "Furniture moving, 4th floor", quote: "They carried a sofa up four flights in a Victorian on Fillmore without a single scuff on the walls. The quote never changed. I've already recommended them to two neighbors." },
  { name: "Devon R.", loc: "Bernal Heights", job: "Piano moving", quote: "We had an upright piano that two other companies wouldn't touch on our Bernal Heights hill. Stairwise showed up with the right straps and had it inside in twenty minutes. Genuinely impressive." },
  { name: "Priya K.", loc: "SoMa loft", job: "Furniture assembly", quote: "Booked them to assemble a full bedroom set and a standing desk. On time, tidy, and they hauled every box away. The whole apartment was livable by lunch. Exactly what I hoped for." },
];

export default function Reviews() {
  return (
    <section className="bg-grey" aria-labelledby="reviews-heading">
      <div className="wrap wrap-wide">
        <Reveal className="section-head center">
          <p className="eyebrow">In their words</p>
          <h2 id="reviews-heading">What San Francisco says.</h2>
        </Reveal>

        <div className="reviews-grid">
          {REVIEWS.map(({ name, loc, job, quote }) => (
            <Reveal key={name} as="figure" className="review-card">
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

        <p className="reviews-more">
          <Link href="/reviews">Read more Stairwise reviews →</Link>
        </p>
      </div>
    </section>
  );
}
