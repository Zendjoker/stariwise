"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  { q: "How does your pricing work?", a: "All services are billed per person, per hour. Rates are: Moving Help $55, Furniture Assembly $62, Heavy Lifting $65, Cleaning $65, and Trash & Junk Removal $29. Junk removal also carries disposal fees that are always quoted upfront. There are no extra charges for stairs, long carries, or fuel." },
  { q: "Are you insured?", a: "Yes. Stairwise carries liability and cargo insurance on every job. We're happy to provide a certificate of insurance for your building on request, just ask when you book." },
  { q: "Do you charge extra for stairs and walk-ups?", a: "Never. Stairs and walk-ups are exactly what Stairwise is built for. Steep San Francisco hills, four-flight climbs, and narrow Victorian staircases are all included in your hourly rate. No surprise surcharges." },
  { q: "Can you assemble furniture without a move?", a: "Absolutely. Furniture assembly is a standalone service. Whether it's a single flat-pack wardrobe or a full apartment of new furniture, we'll build it, level it, mount what needs mounting, and remove all the packaging." },
  { q: "How far ahead should I schedule?", a: "Booking a few days ahead is ideal, but we keep same-day and next-day slots open across the city. Call or request a quote and we'll tell you exactly what's available." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), cash, Zelle, Apple Pay, and Venmo. Payment is collected only after the job is complete, and you'll always get a receipt." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="bg-grey" aria-labelledby="faq-heading">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-heading">Frequently asked.</h2>
        </Reveal>

        <Reveal className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={q} className={`faq-item${isOpen ? " open" : ""}`}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => toggle(i)}>
                  {q}
                  <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? 500 : 0 }}>
                  <div className="faq-a-inner">{a}</div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
