import { SiteHeader } from "@/components/header/site-header";
import { BlogHeroSection } from "@/components/blog-hero-section";
import { SiteFooter } from "@/components/site-footer";

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <BlogHeroSection />
      <SiteFooter />
    </>
  );
}
