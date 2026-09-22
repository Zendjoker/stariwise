import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service: Stairwise",
  description:
    "Terms of Service for Stairwise, a San Francisco moving, heavy lifting, and furniture assembly company.",
  alternates: { canonical: "https://gostairwise.com/terms" },
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="wrap">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: January 1, 2026</p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the Stairwise website and
          booking of moving, heavy lifting, furniture assembly, cleaning, and junk removal
          services (&quot;Services&quot;) provided by Stairwise (&quot;Stairwise&quot;, &quot;we&quot;, &quot;us&quot;) in the San
          Francisco Bay Area. By using our website or booking a Service, you agree to these Terms.
        </p>

        <h2>1. Booking &amp; Pricing</h2>
        <p>
          Services are billed per person, per hour, at the rates published on our website at the
          time of booking. Quotes provided before a job begins are estimates; final charges are
          based on actual time worked. There are no extra charges for stairs, walk-ups, narrow
          staircases, long carries, or fuel within our normal service area.
        </p>

        <h2>2. Scheduling &amp; Cancellations</h2>
        <p>
          We ask for at least 24 hours&apos; notice to reschedule or cancel a booking. Late
          cancellations or no-shows may be subject to a minimum call-out fee to cover crew time
          already reserved for your job.
        </p>

        <h2>3. Customer Responsibilities</h2>
        <p>
          You are responsible for providing accurate information about the job (item sizes,
          access, parking, building rules) so we can staff the crew and equipment appropriately.
          You must disclose any items of unusual value, fragility, or hazard before work begins.
        </p>

        <h2>4. Insurance &amp; Liability</h2>
        <p>
          Stairwise carries commercial liability and cargo insurance. Claims for damage must be
          reported within 48 hours of the job with photos and a description of the item. Our
          liability for any claim is limited to the depreciated value of the item or the amount
          paid for the Service, whichever is greater, except where limited by applicable law.
        </p>

        <h2>5. Payments</h2>
        <p>
          Payment is due upon completion of the Service unless a different arrangement was agreed
          in writing. We accept the payment methods listed at checkout or by our crew lead.
        </p>

        <h2>6. Prohibited Use</h2>
        <p>
          You may not use our website or Services for any unlawful purpose, to transport
          prohibited or hazardous materials, or to request assistance with illegal activity.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of our website or Services
          after changes are posted constitutes acceptance of the updated Terms.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about these Terms can be sent to{" "}
          <a href="mailto:hello@gostairwise.com">hello@gostairwise.com</a> or by calling{" "}
          <a href="tel:+14157248720">(415) 724-8720</a>.
        </p>
      </div>
    </main>
  );
}
