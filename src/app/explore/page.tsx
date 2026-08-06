import { SiteHeader } from "@/components/header/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getTranslations } from "next-intl/server";
import { ExploreGrid } from "./_components/explore-grid";

export async function generateMetadata() {
  const t = await getTranslations("explore");
  return {
    title: `${t("pageTitle")} — SalonFlow`,
    description: t("pageSubtitle"),
  };
}

export default async function ExplorePage() {
  const t = await getTranslations("explore");
  const tf = await getTranslations("explore.filters");

  const translations = {
    filtersTitle:      tf("title"),
    filterCategory:    tf("category"),
    catHair:           tf("categories.hair"),
    catNail:           tf("categories.nail"),
    catSkin:           tf("categories.skin"),
    catMassage:        tf("categories.massage"),
    priceRange:        tf("priceRange"),
    minRating:         tf("minRating"),
    distance:          tf("distance"),
    distanceUnit:      tf("distanceUnit"),
    availability:      tf("availability"),
    openNow:           tf("openNow"),
    clearAll:          tf("clearAll"),
    sortBy:            t("sortBy"),
    sortRecommended:   t("sortOptions.recommended"),
    sortTopRated:      t("sortOptions.topRated"),
    sortNearest:       t("sortOptions.nearest"),
    sortPriceLow:      t("sortOptions.priceLow"),
    sortPriceHigh:     t("sortOptions.priceHigh"),
    searchPlaceholder: t("searchPlaceholder"),
    salonsFound:       t("salonsFound", { count: 9 }), // will be overridden client-side
    noResults:         t("noResults"),
    noResultsHint:     t("noResultsHint"),
    bookNow:           t("bookNow"),
    saveFavourite:     t("saveFavourite"),
    away:              t("away"),
    more:              t("more"),
    paginationPrev:    t("pagination.prev"),
    paginationNext:    t("pagination.next"),
  };

  return (
    <main className="min-h-screen bg-secondary/30">
      <SiteHeader />
      <ExploreGrid translations={translations} />
      <SiteFooter />
    </main>
  );
}
