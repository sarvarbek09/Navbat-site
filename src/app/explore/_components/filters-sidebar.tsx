"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Props = {
  title: string;
  category: string;
  catHair: string;
  catNail: string;
  catSkin: string;
  catMassage: string;
  priceRange: string;
  minRating: string;
  distance: string;
  distanceUnit: string;
  availability: string;
  openNow: string;
  clearAll: string;
};

const PRICE_TIERS = ["$", "$$", "$$$", "$$$$"] as const;

export function FiltersSidebar({
  title, category, catHair, catNail, catSkin, catMassage,
  priceRange, minRating, distance, distanceUnit, availability, openNow, clearAll,
}: Props) {
  const categories = [
    { id: "hair",    label: catHair },
    { id: "nail",    label: catNail },
    { id: "skin",    label: catSkin },
    { id: "massage", label: catMassage },
  ];

  const [selectedCats, setSelectedCats]     = useState<string[]>(["hair"]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>(["$$"]);
  const [rating, setRating]                 = useState(4);
  const [dist, setDist]                     = useState(5);
  const [openNowChecked, setOpenNowChecked] = useState(false);

  const toggle = <T extends string>(arr: T[], id: T): T[] =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  const clearAll_ = () => {
    setSelectedCats([]);
    setSelectedPrices([]);
    setRating(4);
    setDist(5);
    setOpenNowChecked(false);
  };

  return (
    <aside className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5 shadow-soft-sm">
      <h2 className="text-sm font-bold text-foreground">{title}</h2>

      {/* Category */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{category}</p>
        {categories.map((cat) => {
          const checked = selectedCats.includes(cat.id);
          return (
            <label key={cat.id} className="flex cursor-pointer items-center gap-2.5 select-none">
              <span
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
                onClick={() => setSelectedCats(toggle(selectedCats, cat.id))}
                onKeyDown={(e) => e.key === "Enter" && setSelectedCats(toggle(selectedCats, cat.id))}
                className={`flex size-[17px] shrink-0 items-center justify-center rounded border transition-colors ${
                  checked ? "border-primary bg-primary" : "border-border bg-white hover:border-primary/60"
                }`}
              >
                {checked && (
                  <svg className="size-2.5 text-white" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-foreground">{cat.label}</span>
            </label>
          );
        })}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{priceRange}</p>
        <div className="flex gap-1.5">
          {PRICE_TIERS.map((tier) => {
            const active = selectedPrices.includes(tier);
            return (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedPrices(toggle(selectedPrices, tier))}
                aria-pressed={active}
                className={`flex h-9 min-w-[2.5rem] flex-1 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                  active ? "border-primary bg-primary text-white" : "border-border bg-white text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tier}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min Rating */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{minRating}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="transition-transform hover:scale-110 active:scale-95">
                <Star className={`size-5 transition-colors ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-border"}`} />
              </button>
            ))}
          </div>
          <span className="text-sm font-semibold text-primary">{rating}.0+</span>
        </div>
      </div>

      {/* Distance */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{distance}</p>
          <span className="text-sm font-semibold text-primary">{dist} {distanceUnit}</span>
        </div>
        <input
          type="range" min={1} max={20} value={dist}
          onChange={(e) => setDist(Number(e.target.value))}
          aria-label={distance}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-accent"
          style={{ accentColor: "rgb(var(--primary))" }}
        />
      </div>

      {/* Availability */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{availability}</p>
        <label className="flex cursor-pointer items-center gap-2.5 select-none">
          <span
            role="checkbox"
            aria-checked={openNowChecked}
            tabIndex={0}
            onClick={() => setOpenNowChecked((v) => !v)}
            onKeyDown={(e) => e.key === "Enter" && setOpenNowChecked((v) => !v)}
            className={`flex size-[17px] shrink-0 items-center justify-center rounded border transition-colors ${
              openNowChecked ? "border-primary bg-primary" : "border-border bg-white hover:border-primary/60"
            }`}
          >
            {openNowChecked && (
              <svg className="size-2.5 text-white" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="text-sm text-foreground">{openNow}</span>
        </label>
      </div>

      {/* Clear All */}
      <button
        type="button"
        onClick={clearAll_}
        className="mt-1 w-full rounded-xl border border-primary/20 bg-accent/40 py-2.5 text-sm font-bold text-primary transition-colors hover:border-primary/40 hover:bg-accent active:scale-[0.98]"
      >
        {clearAll}
      </button>
    </aside>
  );
}
