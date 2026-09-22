"use client";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

const CALENDLY_URL = "https://calendly.com/adoumazzouz-aa/30min";

export default function CalendlyBadge() {
  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <button
        type="button"
        className="calendly-fab"
        aria-label="Book a free quote call"
        onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
      >
        Book
      </button>
    </>
  );
}

