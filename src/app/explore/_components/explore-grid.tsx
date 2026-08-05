"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SalonCard, type SalonCardData } from "./salon-card";
import { FiltersSidebar } from "./filters-sidebar";
import { Pagination } from "./pagination";

/**
 * Responsive layout:
 *   mobile  (< 768px)   : 1-col grid, filter toggle button above
 *   tablet  (768–1023px): 2-col grid, filter toggle + slide-down panel
 *   desktop (≥ 1024px)  : fixed sidebar (220px) + 3-col grid
 *
 * All translations are passed as props from the server component (explore/page.tsx)
 * so locale switching works correctly without a full page reload.
 */

export type ExploreTranslations = {
  filtersTitle: string;
  filterCategory: string;
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
  sortBy: string;
  sortRecommended: string;
  sortTopRated: string;
  sortNearest: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  searchPlaceholder: string;
  salonsFound: string;
  noResults: string;
  noResultsHint: string;
  bookNow: string;
  saveFavourite: string;
  away: string;
  more: string;
  paginationPrev: string;
  paginationNext: string;
};

const MOCK_SALONS: SalonCardData[] = [
  { id: "1", name: "Luminary Hair Studio",  priceTier: "$$",   rating: 4.9, distance: "1.2", neighborhood: "Downtown",     tags: ["Haircut", "Balayage"],         extraTagsCount: 3, imageUrl: "/images/salon-velvet-loft.png" },
  { id: "2", name: "Prism Nail Gallery",    priceTier: "$$$",  rating: 4.7, distance: "2.5", neighborhood: "West End",     tags: ["Manicure", "Gel-X", "Art"],    imageUrl: "/images/salon-lumina-spa.png" },
  { id: "3", name: "The Gent's Cut",        priceTier: "$$",   rating: 4.8, distance: "0.8", neighborhood: "Uptown",      tags: ["Classic Cut", "Shave", "Beard"], imageUrl: "/images/salon-iron-silk.png" },
  { id: "4", name: "Glow Skin Clinic",      priceTier: "$$$$", rating: 5.0, distance: "3.1", neighborhood: "Heights",     tags: ["HydraFacial", "Peels"],         imageUrl: "/images/salon-velvet-loft.png" },
  { id: "5", name: "Color Lab Collective",  priceTier: "$$$",  rating: 4.6, distance: "1.9", neighborhood: "Arts District", tags: ["Vivids", "Corrective"],       imageUrl: "/images/salon-lumina-spa.png" },
  { id: "6", name: "Serene Wellness Spa",   priceTier: "$$$",  rating: 4.9, distance: "4.5", neighborhood: "Riverside",   tags: ["Deep Tissue", "Hot Stone"],    imageUrl: "/images/salon-iron-silk.png" },
  { id: "7", name: "The Mane Studio",       priceTier: "$$",   rating: 4.7, distance: "1.1", neighborhood: "Midtown",     tags: ["Blowout", "Extensions"],       imageUrl: "/images/salon-velvet-loft.png" },
  { id: "8", name: "Zen Body & Soul",       priceTier: "$$$",  rating: 4.8, distance: "2.2", neighborhood: "East Side",   tags: ["Reiki", "Aromatherapy"],       imageUrl: "/images/salon-lumina-spa.png" },
  { id: "9", name: "Luxe Nail Lounge",      priceTier: "$$",   rating: 4.5, distance: "0.6", neighborhood: "Westwood",    tags: ["Acrylics", "Nail Art"],        imageUrl: "/images/salon-iron-silk.png" },
];

const ITEMS_PER_PAGE = 6;
const TOTAL_PAGES = 13;

type Props = { translations: ExploreTranslations };

export function ExploreGrid({ translations: tr }: Props) {
  const [search, setSearch]       = useState("");
  const [sortBy, setSortBy]       = useState("recommended");
  const [page, setPage]           = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = MOCK_SALONS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const sortOptions = [
    { value: "recommended", label: tr.sortRecommended },
    { value: "topRated",    label: tr.sortTopRated },
    { value: "nearest",     label: tr.sortNearest },
    { value: "priceLow",    label: tr.sortPriceLow },
    { value: "priceHigh",   label: tr.sortPriceHigh },
  ];

  const filterProps = {
    title:        tr.filtersTitle,
    category:     tr.filterCategory,
    catHair:      tr.catHair,
    catNail:      tr.catNail,
    catSkin:      tr.catSkin,
    catMassage:   tr.catMassage,
    priceRange:   tr.priceRange,
    minRating:    tr.minRating,
    distance:     tr.distance,
    distanceUnit: tr.distanceUnit,
    availability: tr.availability,
    openNow:      tr.openNow,
    clearAll:     tr.clearAll,
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">

      {/* Mobile / Tablet: filter toggle */}
      <div className="flex items-center justify-between pb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="mobile-filters"
          className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft-sm transition-colors hover:border-primary/40 hover:text-primary"
        >
          {filtersOpen ? <X className="size-4" aria-hidden /> : <SlidersHorizontal className="size-4" aria-hidden />}
          {tr.filtersTitle}
        </button>
        <span className="text-sm text-muted-foreground">{filtered.length} {tr.salonsFound.replace(/\d+\s?/, "")}</span>
      </div>

      {/* Mobile filter panel */}
      {filtersOpen && (
        <div id="mobile-filters" className="pb-6 lg:hidden">
          <FiltersSidebar {...filterProps} />
        </div>
      )}

      <div className="flex gap-6 lg:gap-8">

        {/* Sidebar — desktop only */}
        <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[240px]">
          <FiltersSidebar {...filterProps} />
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">

          {/* Search + Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-soft-sm transition-shadow focus-within:ring-2 focus-within:ring-primary/30">
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={tr.searchPlaceholder}
                aria-label={tr.searchPlaceholder}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </label>

            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">{tr.sortBy}:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label={tr.sortBy}
                  className="cursor-pointer appearance-none rounded-xl border border-border bg-white py-3 pl-4 pr-9 text-sm font-medium text-foreground shadow-soft-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">▾</span>
              </div>
            </div>
          </div>

          {/* Result count — desktop */}
          <p className="hidden text-sm text-muted-foreground lg:block">
            {filtered.length} {tr.salonsFound.replace(/\d+\s?/, "")}
          </p>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map((salon) => (
                <SalonCard
                  key={salon.id}
                  salon={salon}
                  bookNow={tr.bookNow}
                  saveFavourite={tr.saveFavourite}
                  away={tr.away}
                  more={tr.more}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-semibold text-foreground">{tr.noResults}</p>
              <p className="max-w-sm text-sm text-muted-foreground">{tr.noResultsHint}</p>
            </div>
          )}

          {/* Pagination */}
          <div className="pt-2">
            <Pagination
              page={page}
              total={TOTAL_PAGES}
              onChange={setPage}
              prevLabel={tr.paginationPrev}
              nextLabel={tr.paginationNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
