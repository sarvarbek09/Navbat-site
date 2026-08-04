import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="settings" />
    </>
  );
}
