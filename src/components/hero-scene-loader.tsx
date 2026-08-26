"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
});

/**
 * WebGL sparkle field kills battery on low-end phones and is pure decoration —
 * skip mounting the canvas at all for prefers-reduced-motion instead of just
 * pausing the animation loop.
 */
export function HeroSceneLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!mediaQuery.matches);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
