"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = { quote: string; name: string; role: string };

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

const AUTO_PLAY_DELAY = 4500;

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 32 },
        },
      },
      defaultAnimation: {
        duration: 900,
        easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      },
      slideChanged(instance) {
        setActiveIndex(instance.track.details.rel);
      },
    },
    [
      (instance) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);
        const nextTimeout = () => {
          clearNextTimeout();
          if (mouseOver) return;
          timeout = setTimeout(() => instance.next(), AUTO_PLAY_DELAY);
        };

        instance.on("created", () => {
          instance.container.addEventListener("mouseenter", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          instance.container.addEventListener("mouseleave", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        instance.on("dragStarted", clearNextTimeout);
        instance.on("animationEnded", nextTimeout);
        instance.on("updated", nextTimeout);
        instance.on("destroyed", clearNextTimeout);
      },
    ]
  );

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {items.map((item) => (
          <article
            key={item.name}
            className="keen-slider__slide flex h-auto"
          >
            <div className="relative flex w-full flex-col rounded-2xl border border-border bg-secondary/30 p-6 shadow-soft transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-soft-lg sm:p-8">
              <Quote className="absolute right-6 top-6 size-8 text-primary/10" strokeWidth={1.5} />

              <div className="flex gap-1 pb-5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>

              <p className="pb-7 text-base leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                  <UserRound className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BadgeCheck
                      className="size-4 shrink-0 fill-[#0095f6] text-white"
                      aria-label="Tasdiqlangan akkaunt"
                    />
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => slider.current?.prev()}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Oldingi"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2" aria-label="Sharhlar navigatsiyasi">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => slider.current?.moveToIdx(i)}
              aria-label={`${i + 1}-sharh`}
              aria-current={activeIndex === i}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-300 ease-in-out",
                activeIndex === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => slider.current?.next()}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Keyingi"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
