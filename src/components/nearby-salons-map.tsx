"use client";

import dynamic from "next/dynamic";
import type { NearbySalon } from "./nearby-salons-map-inner";

const NearbySalonsMapInner = dynamic(
  () => import("./nearby-salons-map-inner").then((mod) => mod.NearbySalonsMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full animate-pulse rounded-2xl bg-muted" />
    ),
  }
);

export function NearbySalonsMap({ salons }: { salons: NearbySalon[] }) {
  return <NearbySalonsMapInner salons={salons} />;
}
