"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Popover } from "radix-ui";

const STORAGE_KEY = "navbat_city";

export type City = { key: string; label: string };

type LocationSelectorProps = {
  cities: City[];
  selectLabel: string;
};

export function LocationSelector({ cities, selectLabel }: LocationSelectorProps) {
  const [cityKey, setCityKey] = useState(cities[0]?.key ?? "");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && cities.some((city) => city.key === saved)) {
      setCityKey(saved);
    }
  }, [cities]);

  function selectCity(key: string) {
    setCityKey(key);
    localStorage.setItem(STORAGE_KEY, key);
  }

  const activeCity = cities.find((city) => city.key === cityKey) ?? cities[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="group hidden h-9 items-center gap-1.5 rounded-xl border border-border/70 bg-white/60 px-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:flex"
          aria-label={selectLabel}
        >
          <MapPin className="size-3.5 text-primary" />
          <span>{activeCity?.label}</span>
          <ChevronDown className="size-3 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={10} align="end" asChild>
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="z-[60] max-h-80 w-52 overflow-y-auto rounded-2xl border border-border/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {cities.map((city) => (
              <button
                key={city.key}
                type="button"
                onClick={() => selectCity(city.key)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
              >
                {city.label}
                {cityKey === city.key && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
