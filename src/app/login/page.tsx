import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="login" />
      {/* LOGIN page /login da emas, auth/login da */}
    </>
  );
}
