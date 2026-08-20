"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const RATES: Record<string, number> = {
  "Moving Help": 55,
  "Furniture Assembly": 62,
  "Heavy Lifting": 65,
  "Cleaning": 65,
  "Trash & Junk Removal": 29,
  "Offices": 55,
};

const PRICES = [
  { label: "Heavy Lifting", sub: "Pianos, safes, appliances & oversized items", rate: 65, note: "Equipment, straps, and dollies included.", featured: false },
  { label: "Moving Help", sub: "Local moves, loading & unloading", rate: 55, note: "Packing materials and transport within SF included.", featured: true },
  { label: "Furniture Assembly", sub: "Flat-pack, wall mounting & anchoring", rate: 62, note: "Packaging removed and recycled at no extra charge.", featured: false },
  { label: "Trash & Junk Removal", sub: "Furniture, appliances & clutter hauled away", rate: 29, note: "+ disposal fees quoted upfront.", featured: false },
  { label: "Cleaning", sub: "Move-in & move-out cleans", rate: 65, note: "All supplies provided. Can be booked standalone.", featured: false },
  { label: "Offices", sub: "Commercial moves, desks & office setup", rate: 55, note: "After-hours & weekend scheduling available.", featured: false },
];

const ShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
);

function money(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default function Pricing() {
  const [service, setService] = useState("Moving Help");
  const [movers, setMovers] = useState(2);
  const [hours, setHours] = useState(3);

  const base = RATES[service];
  const discount = movers >= 4 ? 0.2 : movers === 3 ? 0.1 : 0;
  const eff = base * (1 - discount);
  const total = eff * movers * hours;

  return (
    <section id="pricing" className="bg-grey" aria-labelledby="pricing-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-heading">
            <a className="head-link" href="#contact">Transparent hourly rates.</a>
          </h2>
          <p>Per person, per hour. No charges for stairs, long carries, or fuel. The quote is the price.</p>
          <div className="head-cta">
            <a className="btn btn-primary" href="#contact">Get a free quote</a>
            <a className="btn btn-outline" href="sms:+14157248720?&body=Hi%20Stairwise%2C%20I%27d%20like%20a%20quote%20for%3A%20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Text us
            </a>
          </div>
        </Reveal>

        <div className="pricing-grid">
          {PRICES.map((p) => (
            <Reveal key={p.label} as="article" className={`price-card${p.featured ? " featured" : ""}`}>
              <p className="price-tag-label">{p.label}</p>
              <p className="price-sublabel">{p.sub}</p>
              <p className="price-amount">${p.rate}<span> / person / hr</span></p>
              <p className="price-note">{p.note}</p>
            </Reveal>
          ))}
        </div>

        {/* Live calculator */}
        <Reveal className="calc" id="calc">
          <div className="calc-panel">
            <div className="calc-head">
              <p className="eyebrow">Estimate your job</p>
              <h3>Live pricing calculator</h3>
              <p>Pick a service, choose your crew size and hours — discounts apply automatically. 3-mover crews save 10%, 4-mover crews save 20%.</p>
            </div>

            <div className="field">
              <label htmlFor="calcService">Service</label>
              <select id="calcService" value={service} onChange={e => setService(e.target.value)}>
                {Object.entries(RATES).map(([name, rate]) => (
                  <option key={name} value={name}>{name} — ${rate} / person / hr</option>
                ))}
              </select>
            </div>

            <div className="calc-fields-row">
              <div className="field">
                <label htmlFor="calcMovers">Movers <span className="calc-field-val">{movers}</span></label>
                <input type="range" id="calcMovers" min={1} max={6} step={1} value={movers} onChange={e => setMovers(+e.target.value)} />
                <div className="calc-scale" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>
              </div>

              <div className="field">
                <label htmlFor="calcHours">Hours <span className="calc-field-val">{hours}</span></label>
                <input type="range" id="calcHours" min={1} max={12} step={0.5} value={hours} onChange={e => setHours(+e.target.value)} />
                <div className="calc-scale" aria-hidden="true"><span>1</span><span>4</span><span>8</span><span>12</span></div>
              </div>
            </div>
          </div>

          <aside className="calc-summary" aria-live="polite">
            <p className="calc-summary-label">Estimated total</p>
            <p className="calc-total">{money(Math.round(total * 100) / 100)}</p>
            {discount > 0 && <p className="calc-discount-badge">{Math.round(discount * 100)}% crew discount applied</p>}
            <ul className="calc-breakdown">
              <li><span>Base rate</span><span>{money(base)} / person / hr</span></li>
              {discount > 0 && <li><span>Discounted rate</span><span>{money(Math.round(eff * 100) / 100)} / person / hr</span></li>}
              <li><span>Crew &amp; time</span><span>{movers} {movers === 1 ? "mover" : "movers"} × {hours} {hours === 1 ? "hr" : "hrs"}</span></li>
            </ul>
            <p className="calc-fineprint">Estimate only. Junk removal disposal fees quoted separately. We confirm the final rate before work begins.</p>
            <a className="btn btn-primary btn-lg" href="#contact">Book this crew</a>
          </aside>
        </Reveal>

        <div className="pricing-promise">
          <ul className="promise-list reveal">
            {[
              { strong: "No stair fees, ever.", body: "Steep hills and four-flight walk-ups are what we're built for — you're never charged extra for them." },
              { strong: "No long-carry or fuel surcharges.", body: "Distance from the truck to your door is on us, and so is the gas to get there." },
              { strong: "The quote is the price.", body: "We confirm the rate before we begin. No rounding up, no line-item surprises at the end." },
            ].map(({ strong, body }) => (
              <li key={strong}><ShieldCheck /><span><strong>{strong}</strong> {body}</span></li>
            ))}
          </ul>
          <Reveal className="payment-box">
            <h3>Accepted payment methods</h3>
            <p>All major credit and debit cards (Visa, Mastercard, Amex, Discover), cash, Zelle, Apple Pay, and Venmo. Payment collected after the job is complete. A receipt is provided every time.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
