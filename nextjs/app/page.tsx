import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyStairwise from "@/components/WhyStairwise";
import WorkGallery from "@/components/WorkGallery";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ServiceArea from "@/components/ServiceArea";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyStairwise />
      <WorkGallery />
      <HowItWorks />
      <Pricing />
      <ServiceArea />
      <Reviews />
      <Contact />
      <FAQ />
    </main>
  );
}
