import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";

export default async function SettingsPage() {
  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="settings" />
    </>
  );
}
