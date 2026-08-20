import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/useAuth";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PromoModal from "@/components/PromoModal";
import Lightbox from "@/components/Lightbox";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stairwise — Movers, Heavy Lifting & Furniture Assembly in San Francisco",
  description:
    "Stairwise is a San Francisco moving, heavy lifting, and furniture assembly company. Sure-footed on steep hills, walk-ups, and narrow Victorian staircases. Upfront pricing. Call (415) 724-8720.",
  keywords:
    "movers San Francisco, furniture assembly San Francisco, heavy lifting movers SF, San Francisco moving company, walk-up movers SF",
  authors: [{ name: "Stairwise" }],
  robots: "index, follow",
  alternates: { canonical: "https://gostairwise.com/" },
  openGraph: {
    type: "website",
    siteName: "Stairwise",
    title: "Stairwise — Movers, Heavy Lifting & Furniture Assembly in San Francisco",
    description:
      "San Francisco's moving, heavy lifting & furniture assembly crew. Full-service for hills, walk-ups, and narrow staircases. Upfront pricing.",
    url: "https://gostairwise.com/",
    images: [
      {
        url: "https://gostairwise.com/images/hero.webp",
        alt: "A Stairwise crew carrying furniture down a San Francisco street",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stairwise — San Francisco Movers, Lifting & Furniture Assembly",
    description: "San Francisco's moving, heavy lifting & furniture assembly crew. Upfront pricing. Call (415) 724-8720.",
    images: ["https://gostairwise.com/images/hero.webp"],
  },
  other: { "theme-color": "#123F36" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      name: "Stairwise",
      description: "San Francisco moving, heavy lifting, and furniture assembly company.",
      url: "https://gostairwise.com/",
      logo: "https://gostairwise.com/images/logo.png",
      image: "https://gostairwise.com/images/hero.webp",
      telephone: "+14157248720",
      email: "hello@gostairwise.com",
      slogan: "San Francisco's moving, heavy lifting & furniture assembly crew.",
      areaServed: [
        "San Francisco","Daly City","South San Francisco","Brisbane","Colma",
        "Oakland","Berkeley","Richmond","Alameda","San Leandro","Hayward",
        "San Ramon","Walnut Creek","San Mateo","Palo Alto","Mill Valley","San Rafael",
      ],
      address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 37.7749, longitude: -122.4194 },
      priceRange: "$$",
      openingHours: "Mo-Su 07:00-20:00",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does your pricing work?", acceptedAnswer: { "@type": "Answer", text: "All services are billed per person, per hour. Rates: Moving Help $55, Furniture Assembly $62, Heavy Lifting $65, Cleaning $65, and Trash & Junk Removal $29. No extra charges for stairs, long carries, or fuel." } },
        { "@type": "Question", name: "Are you insured?", acceptedAnswer: { "@type": "Answer", text: "Yes. Stairwise carries liability and cargo insurance on every job. We can provide a certificate of insurance for your building on request." } },
        { "@type": "Question", name: "Do you charge extra for stairs and walk-ups?", acceptedAnswer: { "@type": "Answer", text: "Never. Steep San Francisco hills, four-flight walk-ups, and narrow Victorian staircases are all included in your hourly rate." } },
        { "@type": "Question", name: "Which areas do you serve?", acceptedAnswer: { "@type": "Answer", text: "All of San Francisco and the Peninsula through San Mateo to Palo Alto, plus the East Bay including Oakland, Berkeley, Richmond, Alameda, San Leandro, Hayward, San Ramon, and Walnut Creek, north to Mill Valley and San Rafael." } },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <MobileNav />
          {children}
          <Footer />
          <ScrollToTop />
          <PromoModal />
          <Lightbox />
        </AuthProvider>
      </body>
    </html>
  );
}
