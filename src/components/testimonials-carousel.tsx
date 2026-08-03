"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = { quote: string; name: string; role: string };

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-carousel-card]")[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const scrollByCard = (direction: 1 | -1) => {
    scrollToIndex(Math.min(Math.max(activeIndex + direction, 0), items.length - 1));
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-carousel-card]");
    let closest = 0;
    let closestDistance = Infinity;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.name}
            data-carousel-card
            className="relative w-[85%] shrink-0 snap-center rounded-2xl border border-border bg-secondary/30 p-8 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg sm:w-[45%] lg:w-[31%]"
          >
            <Quote className="absolute right-6 top-6 size-8 text-primary/10" strokeWidth={1.5} />

            <div className="flex gap-1 pb-5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>

            <p className="pb-7 text-base leading-relaxed text-foreground">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                <UserRound className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Oldingi"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`${i + 1}-sharh`}
              aria-current={activeIndex === i}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-300",
                activeIndex === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Keyingi"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
