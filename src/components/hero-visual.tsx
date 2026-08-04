"use client";

import { motion } from "framer-motion";
import {
  BatteryFull,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  RotateCcw,
  Scissors,
  SignalHigh,
  Star,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";

export type HeroMockupLabels = {
  confirmedTitle: string;
  confirmedSubtitle: string;
  salonCardName: string;
  ratingValue: string;
  ratingCount: string;
  statusConfirmed: string;
  specialistName: string;
  customerLabel: string;
  customerName: string;
  serviceLabel: string;
  serviceName: string;
  dateTimeLabel: string;
  dateTimeValue: string;
  priceLabel: string;
  priceValue: string;
  directionsButton: string;
  rescheduleButton: string;
};

type HeroVisualProps = {
  labels: HeroMockupLabels;
};

type FloatCardProps = {
  children: ReactNode;
  className: string;
  entranceDelay: number;
  entranceFrom: { x?: number; y?: number };
  floatDuration: number;
  floatDelay: number;
  floatDistance?: number;
};

/**
 * Two nested motion.divs on purpose: the outer plays the one-shot entrance
 * (fade/slide in), the inner loops an infinite float. Merging both sets of
 * animate/transition props on a single motion.div makes framer-motion drop
 * the infinite loop in favor of the one-shot transition.
 */
function FloatCard({
  children,
  className,
  entranceDelay,
  entranceFrom,
  floatDuration,
  floatDelay,
  floatDistance = 10,
}: FloatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...entranceFrom }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: entranceDelay }}
      className={"absolute z-20 " + className}
    >
      <motion.div
        animate={{ y: [0, -floatDistance, 0] }}
        transition={{
          duration: floatDuration,
          delay: entranceDelay + 0.6 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-3 shadow-soft-lg backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-2 last:border-0">
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
      <span className="text-[10px] font-bold text-foreground">{value}</span>
    </div>
  );
}

export function HeroVisual({ labels }: HeroVisualProps) {
  return (
    <div className="relative mx-auto flex h-[560px] w-full max-w-[440px] items-center justify-center sm:h-[640px] lg:h-[680px]">
      {/* Depth blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-6 bottom-4 size-64 rounded-full bg-accent/40 blur-3xl" />
      </div>

      {/* iPhone 17 Pro Max mockup */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Side controls */}
        <div className="absolute -left-[3px] top-[118px] h-8 w-[3px] rounded-l-sm bg-gradient-to-b from-[#5a5a5e] to-[#2c2c2e] sm:top-[136px] sm:h-9" />
        <div className="absolute -left-[3px] top-[164px] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-[#5a5a5e] to-[#2c2c2e] sm:top-[188px] sm:h-14" />
        <div className="absolute -left-[3px] top-[222px] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-[#5a5a5e] to-[#2c2c2e] sm:top-[250px] sm:h-14" />
        <div className="absolute -right-[3px] top-[178px] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-[#5a5a5e] to-[#2c2c2e] sm:top-[204px] sm:h-20" />

        {/* Titanium frame */}
        <div className="relative h-[470px] w-[228px] rounded-[3rem] bg-gradient-to-b from-[#4a4a4d] via-[#232326] to-[#151517] p-[3px] shadow-soft-xl ring-1 ring-black/40 sm:h-[544px] sm:w-[264px]">
          <div className="h-full w-full rounded-[2.9rem] bg-black p-2">
            {/* Screen */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-primary/10 via-white to-accent/25">
              {/* Glass reflection */}
              <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.06)_22%,rgba(255,255,255,0)_45%)]" />

              {/* Status bar */}
              <div className="relative z-10 flex items-center justify-between px-6 pb-1 pt-3 text-foreground">
                <span className="text-[11px] font-semibold">9:41</span>
                <div className="flex items-center gap-1">
                  <SignalHigh className="size-3" />
                  <Wifi className="size-3" />
                  <BatteryFull className="size-3.5" />
                </div>
              </div>

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2 z-20 flex h-[18px] w-[68px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5 sm:h-5 sm:w-[76px]">
                <span className="size-1 rounded-full bg-[#1c1c1e] ring-1 ring-white/10" />
              </div>

              {/* Screen header */}
              <div className="relative z-10 flex items-center px-4 pb-2 pt-3.5">
                <button
                  type="button"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/70 text-foreground shadow-sm backdrop-blur-sm"
                  aria-hidden
                >
                  <ChevronLeft className="size-3.5" />
                </button>
              </div>

              {/* Confirmed badge */}
              <div className="relative z-10 mx-5 mt-1 flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-700">
                  {labels.statusConfirmed}
                </span>
              </div>

              {/* Salon + specialist card */}
              <div className="relative z-10 mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-soft-sm">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-primary text-white">
                  <Scissors className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-foreground">{labels.salonCardName}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{labels.specialistName}</p>
                </div>
              </div>

              {/* Booking details */}
              <div className="relative z-10 mx-4 mt-3 rounded-2xl bg-white/90 px-3.5 py-1 shadow-soft-sm">
                <DetailRow label={labels.customerLabel} value={labels.customerName} />
                <DetailRow label={labels.serviceLabel} value={labels.serviceName} />
                <DetailRow label={labels.dateTimeLabel} value={labels.dateTimeValue} />
                <DetailRow label={labels.priceLabel} value={labels.priceValue} />
              </div>

              {/* Actions */}
              <div className="relative z-10 mx-4 mb-4 mt-auto flex items-stretch gap-2">
                <span className="flex h-12 flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-border/70 bg-white/80 px-1 shadow-sm">
                  <MapPin className="size-3.5 text-primary" />
                  <span className="text-[8px] font-semibold leading-none whitespace-nowrap text-foreground">
                    {labels.directionsButton}
                  </span>
                </span>
                <span className="flex h-12 flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-primary to-violet-500 px-1 shadow-sm">
                  <RotateCcw className="size-3.5 text-white" />
                  <span className="text-[8px] font-semibold leading-none whitespace-nowrap text-white">
                    {labels.rescheduleButton}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <FloatCard
        className="-left-2 top-12 sm:-left-8"
        entranceFrom={{ x: -16 }}
        entranceDelay={0.2}
        floatDuration={5}
        floatDelay={0}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-4" />
        </span>
        <div>
          <p className="text-xs font-bold text-foreground">{labels.confirmedTitle}</p>
          <p className="text-[11px] text-muted-foreground">{labels.confirmedSubtitle}</p>
        </div>
      </FloatCard>

      <FloatCard
        className="-right-2 top-1/3 sm:-right-10"
        entranceFrom={{ x: 16 }}
        entranceDelay={0.35}
        floatDuration={6}
        floatDelay={0.4}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-primary text-white">
          <Scissors className="size-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">{labels.salonCardName}</p>
          <p className="text-[11px] text-muted-foreground">{labels.serviceName}</p>
        </div>
      </FloatCard>

      <FloatCard
        className="bottom-10 right-0 sm:-right-6"
        entranceFrom={{ y: 16 }}
        entranceDelay={0.5}
        floatDuration={5.5}
        floatDelay={0.2}
      >
        <Star className="size-4 fill-amber-400 text-amber-400" />
        <div>
          <p className="text-xs font-bold text-foreground">{labels.ratingValue}</p>
          <p className="text-[11px] text-muted-foreground">{labels.ratingCount}</p>
        </div>
      </FloatCard>

      <FloatCard
        className="-left-4 bottom-24 sm:-left-10"
        entranceFrom={{ y: -16 }}
        entranceDelay={0.65}
        floatDuration={6.5}
        floatDelay={0.6}
        floatDistance={8}
      >
        <span className="flex size-6 items-center justify-center text-primary">
          <CalendarClock className="size-5" />
        </span>
      </FloatCard>
    </div>
  );
}
