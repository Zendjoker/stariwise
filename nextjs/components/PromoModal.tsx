"use client";
import { useState, useEffect } from "react";
import { postJSON } from "@/lib/api";

const SEEN_KEY = "sw_promo_seen";

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem(SEEN_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 12000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) { setOpen(true); clearTimeout(timer); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* noop */ }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try { await postJSON("/lead/", { email, source: "first-service-20" }); } catch { /* fallback */ }
    setDone(true);
    setLoading(false);
    try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* noop */ }
  };

  if (!open) return null;

  return (
    <div className="promo open" aria-hidden="false" role="dialog" aria-modal aria-labelledby="promoTitle" onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="promo-card">
        <button className="promo-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
        <div className="promo-banner">
          <div className="promo-pct">20% OFF</div>
          <p>your first Stairwise service</p>
        </div>
        <div className="promo-body">
          {!done ? (
            <>
              <h3 id="promoTitle">Claim your new-customer discount</h3>
              <p>Drop your email and we&apos;ll send a 20%-off code for your first move, lift, assembly, or clean in San Francisco.</p>
              <form className="promo-form" onSubmit={submit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required />
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>{loading ? "Sending…" : "Send my 20% code"}</button>
              </form>
              <p className="promo-fine">No spam. One email with your code. Unsubscribe anytime.</p>
            </>
          ) : (
            <div className="promo-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <strong>You&apos;re in! Check your inbox.</strong>
              <span>Your 20%-off code is on its way. Mention it when you book.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
