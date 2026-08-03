import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { SiteFooter } from "@/components/site-footer";

export default function OffersPage() {
  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="offers" />
      <SiteFooter />
    </>
  );
}
