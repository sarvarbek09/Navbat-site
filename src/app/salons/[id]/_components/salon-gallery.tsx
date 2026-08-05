"use client";

import Image from "next/image";
import { useState } from "react";

// Breakpoints:
// mobile (≤640px): single column, stacked images
// tablet (641–1024px): 2-column grid
// desktop (1025px+): large image left + 2×2 grid right (as in Figma)

type Props = {
  images: string[];
  name: string;
};

export function SalonGallery({ images, name }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const main = images[0];
  const thumbs = images.slice(1, 5);

  return (
    <>
      {/* Desktop: left main + right 2×2 grid */}
      <div className="hidden overflow-hidden rounded-2xl sm:grid sm:grid-cols-[1fr_1fr] sm:gap-2 lg:grid-cols-[1.6fr_1fr]">
        {/* Main image */}
        <div
          className="relative cursor-pointer overflow-hidden rounded-l-2xl"
          style={{ minHeight: "380px" }}
          onClick={() => setLightbox(0)}
        >
          <Image
            src={main}
            alt={`${name} interior`}
            fill
            sizes="(min-width: 1024px) 55vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </div>

        {/* 2×2 thumbnail grid */}
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => {
            const src = thumbs[i] ?? main;
            return (
              <div
                key={i}
                className="relative cursor-pointer overflow-hidden rounded-lg"
                style={{ minHeight: "186px" }}
                onClick={() => setLightbox(i + 1)}
              >
                <Image
                  src={src}
                  alt={`${name} photo ${i + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
                {/* Top-right corner radius for first thumb */}
                {i === 1 && <span className="pointer-events-none absolute inset-0 rounded-tr-2xl" />}
                {/* Bottom-right corner radius for last thumb */}
                {i === 3 && <span className="pointer-events-none absolute inset-0 rounded-br-2xl" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: single scrollable image */}
      <div className="sm:hidden">
        <div className="relative h-60 w-full overflow-hidden rounded-2xl">
          <Image
            src={main}
            alt={`${name} interior`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {thumbs.map((src, i) => (
            <div key={i} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
              <Image src={src} alt={`${name} photo ${i + 2}`} fill sizes="112px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox === 0 ? main : (thumbs[lightbox - 1] ?? main)}
              alt={name}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-2xl object-contain"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-white text-foreground shadow-soft hover:bg-muted"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
