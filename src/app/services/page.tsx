import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { SiteFooter } from "@/components/site-footer";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="services" />
      <SiteFooter />
    </>
  );
}
