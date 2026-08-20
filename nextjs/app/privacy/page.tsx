import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Stairwise",
  description:
    "Privacy Policy for Stairwise, a San Francisco moving, heavy lifting, and furniture assembly company.",
  alternates: { canonical: "https://gostairwise.com/privacy" },
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="wrap">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: January 1, 2026</p>

        <p>
          Stairwise (&quot;Stairwise&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. This Privacy Policy
          explains what information we collect through our website and booking process, how we
          use it, and the choices you have.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Contact details you provide, such as name, phone number, email, and service address.</li>
          <li>Booking details, including job description, photos of items, and preferred dates.</li>
          <li>Basic usage data such as pages visited and browser type, collected automatically.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>
          We use this information to schedule and staff your job, communicate about your booking,
          process payments, respond to inquiries, and improve our website and Services. We do not
          sell your personal information.
        </p>

        <h2>3. Sharing Information</h2>
        <p>
          We share information with crew members assigned to your job, payment processors, and
          service providers who help us operate (such as email and hosting providers), only as
          needed to deliver our Services. We may disclose information if required by law.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Our website may use cookies or similar local storage to remember preferences (for
          example, whether you have already seen a promotional offer) and to understand site
          usage. You can control cookies through your browser settings.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain booking and contact information for as long as needed to provide Services,
          meet legal or accounting obligations, and resolve disputes.
        </p>

        <h2>6. Your Choices</h2>
        <p>
          You can request access to, correction of, or deletion of your personal information by
          contacting us at <a href="mailto:hello@gostairwise.com">hello@gostairwise.com</a>.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date above
          reflects the most recent changes.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about this Privacy Policy can be sent to{" "}
          <a href="mailto:hello@gostairwise.com">hello@gostairwise.com</a> or by calling{" "}
          <a href="tel:+14157248720">(415) 724-8720</a>.
        </p>
      </div>
    </main>
  );
}
