import { SiteHeader } from "@/components/header/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SalonGallery } from "./_components/salon-gallery";
import { SalonTabs, SpecialistsSection } from "./_components/salon-tabs";
import { LocationSidebar } from "./_components/location-sidebar";
import { Heart, Share2, MapPin, Star, Clock, BadgeCheck } from "lucide-react";

// Breakpoints summary:
// mobile (≤640px):  stacked layout — hero image, info, mobile gallery, tabs full-width, sidebar below tabs
// tablet (641–1024px): 2-col gallery, tabs + sidebar stacked
// desktop (1025px+): main content (tabs) left + sticky sidebar right, exactly as Figma

const SALON_IMAGES = [
  "/images/salon-velvet-loft.png",
  "/images/salon-lumina-spa.png",
  "/images/salon-iron-silk.png",
  "/images/salon-velvet-loft.png",
  "/images/salon-lumina-spa.png",
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  void id; // would fetch real salon name
  return {
    title: "Lumière Wellness & Salon — SalonFlow",
    description: "Book a premium hair, skin, or wellness service at Lumière Wellness & Salon in New York.",
  };
}

export default async function SalonDetailPage({ params }: Props) {
  const { id } = await params;
  void id; // would query DB in production

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

        {/* ── Header ── */}
        <header className="pb-5">
          {/* Premium badge */}
          <div className="mb-2 flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
              Premium Partner
            </span>
          </div>

          {/* Title row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Lumière Wellness &amp; Salon
            </h1>
            {/* Action icons */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Save"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-soft-sm transition-colors hover:border-primary/30 hover:text-primary active:scale-95"
              >
                <Heart className="size-4.5" />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-soft-sm transition-colors hover:border-primary/30 hover:text-primary active:scale-95"
              >
                <Share2 className="size-4.5" />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">4.9</span>
              <span>(1,240 Reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-primary" />
              248 West 4th Street, New York, NY 10014
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0" />
              Open until 9:00 PM
            </span>
          </div>
        </header>

        {/* ── Gallery ── */}
        <div className="pb-8">
          <SalonGallery images={SALON_IMAGES} name="Lumière Wellness & Salon" />
        </div>

        {/* ── Body: tabs + sidebar ── */}
        {/*
          Layout:
          mobile/tablet: single column (tabs then sidebar below)
          desktop: [tabs flex-1] + [sidebar 340px sticky]
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* Left: tabs */}
          <div className="min-w-0 flex-1">
            <SalonTabs />

            {/* Specialists section below tabs (always visible, matches Figma bottom section) */}
            <div className="mt-10 border-t border-border pt-8">
              <SpecialistsSection />
            </div>
          </div>

          {/* Right: sidebar (sticky on desktop) */}
          <aside className="w-full lg:w-[340px] lg:shrink-0 lg:sticky lg:top-24 xl:w-[360px]">
            <LocationSidebar />
          </aside>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
