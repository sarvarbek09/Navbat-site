"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AuthScene = dynamic(() => import("./auth-scene").then((mod) => mod.AuthScene), {
  ssr: false,
});

/** Skips mounting the WebGL canvas entirely for prefers-reduced-motion, not just pausing it. */
export function AuthSceneLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!mediaQuery.matches);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <AuthScene />
    </div>
  );
}
