import { SiteHeader } from "@/components/header/site-header";
import { ComingSoonPage } from "@/components/coming-soon-page";

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <ComingSoonPage namespace="signup" />
    </>
  );
}
