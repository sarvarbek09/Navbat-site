"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";

export type SalonCardData = {
  id: string;
  name: string;
  priceTier: string;
  rating: number;
  distance: string;
  neighborhood: string;
  tags: string[];
  extraTagsCount?: number;
  imageUrl: string;
};

type Props = {
  salon: SalonCardData;
  bookNow: string;
  saveFavourite: string;
  away: string;
  more: string;
};

export function SalonCard({ salon, bookNow, saveFavourite, away, more }: Props) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden sm:h-52">
        <Image
          src={salon.imageUrl}
          alt={salon.name}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/50 bg-white/95 px-2.5 py-1 shadow-soft-sm backdrop-blur-sm">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          <span className="text-xs font-bold text-foreground">{salon.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 pb-1.5">
          <h3 className="text-base font-semibold leading-snug text-foreground">{salon.name}</h3>
          <span className="shrink-0 text-sm font-bold text-primary">{salon.priceTier}</span>
        </div>

        <div className="flex items-center gap-1.5 pb-3 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" aria-hidden />
          <span>{salon.distance} {away} · {salon.neighborhood}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pb-4">
          {salon.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent/60 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              {tag}
            </span>
          ))}
          {(salon.extraTagsCount ?? 0) > 0 && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{salon.extraTagsCount} {more}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Link
            href={`/salons/${salon.id}`}
            className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-white shadow-soft-sm transition-all hover:bg-primary/85 hover:shadow-soft active:scale-[0.98]"
          >
            {bookNow}
          </Link>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            aria-label={saveFavourite}
            aria-pressed={saved}
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-95 ${
              saved ? "border-primary/30 bg-primary/5 text-primary" : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-primary"
            }`}
          >
            <Heart className={`size-4 transition-all ${saved ? "fill-primary" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
