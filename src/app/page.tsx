import { SiteHeader } from "@/components/header/site-header";
import { HeroSection } from "@/components/hero-section";
import { PopularServicesSection } from "@/components/popular-services-section";
import { FeaturedSalonsSection } from "@/components/featured-salons-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NearbySalonsSection } from "@/components/nearby-salons-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <PopularServicesSection />
      <FeaturedSalonsSection />
      <TestimonialsSection />
      <NearbySalonsSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
