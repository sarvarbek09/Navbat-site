"use client";

import { useState } from "react";
import { ServicesTab } from "./services-tab";

// Breakpoints:
// mobile: horizontally scrollable tab bar
// tablet+: normal tab row with border-bottom underline

const TABS = ["Services", "About", "Staff", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export function SalonTabs() {
  const [active, setActive] = useState<Tab>("Services");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`shrink-0 px-5 pb-3 pt-2 text-sm font-semibold transition-colors focus:outline-none ${
              active === tab
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-6">
        {active === "Services" && <ServicesTab />}
        {active === "About" && (
          <div className="text-sm text-muted-foreground">
            <p>
              Lumière Wellness & Salon is a premium boutique offering bespoke hair, skin, and
              wellness experiences in the heart of New York City. Our team of certified professionals
              combines artistry with the latest techniques to deliver transformative results.
            </p>
          </div>
        )}
        {active === "Staff" && (
          <SpecialistsSection />
        )}
        {active === "Reviews" && (
          <div className="text-sm text-muted-foreground">Reviews coming soon.</div>
        )}
      </div>
    </div>
  );
}

// Specialists section (shown at bottom of page AND in Staff tab)
import Image from "next/image";
import { Star } from "lucide-react";

const SPECIALISTS = [
  { name: "Elena Rodriguez", role: "Master Stylist", rating: 5.0, image: "/images/salon-velvet-loft.png" },
  { name: "Dr. Simon Chen", role: "Aesthetics Director", rating: 4.9, image: "/images/salon-lumina-spa.png" },
  { name: "Mila Kunis", role: "Color Specialist", rating: 4.8, image: "/images/salon-iron-silk.png" },
  { name: "James Park", role: "Senior Stylist", rating: 4.7, image: "/images/salon-velvet-loft.png" },
];

export function SpecialistsSection() {
  return (
    <div>
      <h3 className="pb-5 text-lg font-bold text-foreground">Our Specialists</h3>
      {/* 
        mobile: 2-column grid 
        tablet+: 4-column row (as Figma)
      */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SPECIALISTS.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2 text-center">
            <div className="relative size-20 overflow-hidden rounded-full border-2 border-border sm:size-24">
              <Image src={s.image} alt={s.name} fill sizes="96px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.role}</p>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-foreground">{s.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
