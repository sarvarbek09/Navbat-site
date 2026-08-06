"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// Breakpoints:
// mobile: full-width single column, price + add stacked
// tablet+: price right-aligned, add button next to it (as Figma)

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: number;
};

type ServiceGroup = {
  category: string;
  items: ServiceItem[];
};

const MOCK_SERVICES: ServiceGroup[] = [
  {
    category: "Hair Styling & Care",
    items: [
      {
        id: "s1",
        name: "Signature Haircut & Blowout",
        description:
          "Includes a personalized consultation, deep wash, signature cut, and a professional blowout finish.",
        durationMin: 60,
        price: 120,
      },
      {
        id: "s2",
        name: "Balayage / Ombré Treatment",
        description:
          "Hand-painted highlights for a natural, sun-kissed look. Includes toning and bond-builder.",
        durationMin: 180,
        price: 350,
      },
    ],
  },
  {
    category: "Facial & Skin Therapy",
    items: [
      {
        id: "s3",
        name: "HydraFacial Deluxe",
        description:
          "Deep cleansing, exfoliation, and hydration with specialized serums and light therapy.",
        durationMin: 45,
        price: 195,
      },
    ],
  },
];

export function ServicesTab() {
  const [added, setAdded] = useState<string[]>([]);

  const toggle = (id: string) =>
    setAdded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="flex flex-col gap-8">
      {MOCK_SERVICES.map((group) => (
        <section key={group.category}>
          <h3 className="pb-4 text-lg font-bold text-foreground">{group.category}</h3>

          <div className="flex flex-col divide-y divide-border">
            {group.items.map((item) => {
              const isAdded = added.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{item.durationMin} min</p>
                  </div>

                  {/* Price + Add */}
                  <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:items-end">
                    <span className="text-xl font-bold text-primary">${item.price}</span>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                        isAdded
                          ? "bg-accent text-accent-foreground border border-primary/30"
                          : "bg-accent/60 text-primary hover:bg-accent border border-transparent"
                      }`}
                    >
                      <Plus className={`size-4 transition-transform ${isAdded ? "rotate-45" : ""}`} />
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
