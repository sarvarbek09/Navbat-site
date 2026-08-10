import { SiteHeader } from "@/components/header/site-header";
import { SearchHero } from "@/components/search-hero";
import { ServiceCardsSection } from "@/components/service-cards-section";
import { SiteFooter } from "@/components/site-footer";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <SearchHero />
      <ServiceCardsSection />
      <SiteFooter />
    </>
  );
}
