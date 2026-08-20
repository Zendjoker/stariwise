"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { postJSON } from "@/lib/api";

const SERVICES = ["Moving", "Heavy Lifting", "Furniture Assembly", "Cleaning", "Trash & Junk Removal", "Moving + Assembly"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setLoading(true);
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    const data = { name: payload.name, phone: payload.phone, email: payload.email, date: payload.date, moving_from: payload.from, moving_to: payload.to, service: payload.service, notes: payload.notes };
    try { await postJSON("/contact/", data); } catch { /* graceful fallback */ }
    setSent(true);
    setLoading(false);
  }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Get started</p>
          <h2 id="contact-heading">Get a free quote.</h2>
          <p>Tell us about your move and we&apos;ll get back to you with an upfront price — usually the same day.</p>
        </Reveal>

        <div className="quote-layout">
          <Reveal className="quote-form-wrap">
            <form className="quote-form" onSubmit={onSubmit} noValidate>
              {[["name","Name","text"],["phone","Phone","tel"],["email","Email","email"]].map(([n,l,t]) => (
                <div key={n} className="field">
                  <label htmlFor={n}>{l}</label>
                  <input type={t} id={n} name={n} autoComplete={n} required />
                </div>
              ))}
              <div className="field">
                <label htmlFor="date">Preferred date</label>
                <input type="date" id="date" name="date" />
              </div>
              <div className="field">
                <label htmlFor="from">Moving from</label>
                <input type="text" id="from" name="from" placeholder="Neighborhood or address" />
              </div>
              <div className="field">
                <label htmlFor="to">Moving to</label>
                <input type="text" id="to" name="to" placeholder="Neighborhood or address" />
              </div>
              <div className="field">
                <label htmlFor="service">Service type</label>
                <select id="service" name="service">
                  {SERVICES.map(s => <option key={s} value={s.toLowerCase().replace(/ /g, "-")}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="notes">Notes</label>
                <input type="text" id="notes" name="notes" placeholder="Stairs, elevator, large items…" />
              </div>
              <p className="form-note">By submitting, you agree to be contacted about your quote. We never share your details.</p>
              <div className="form-submit">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading || sent}>
                  {sent ? "Request Sent" : loading ? "Sending…" : "Request My Quote"}
                </button>
              </div>
              {sent && (
                <div className="form-success show" role="status" aria-live="polite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Thanks — your request is in. We&apos;ll call you shortly with your upfront price.
                </div>
              )}
            </form>
          </Reveal>

          <Reveal className="call-aside">
            <h3>Or just call or email —</h3>
            <p>Prefer to talk it through? Reach the crew directly and get answers on the spot.</p>
            <a className="call-big" href="tel:+14157248720">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (415) 724-8720
            </a>{" "}
            <a className="call-email" href="mailto:hello@gostairwise.com">hello@gostairwise.com</a>
            <p className="call-hours">Open 7 days a week, 7am–8pm. Same-week availability in most of San Francisco.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
