"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type LogoProps = {
  scrolled: boolean;
};

export function Logo({ scrolled }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="SalonFlow bosh sahifasi">
      <motion.span
        animate={{ scale: scrolled ? 0.88 : 1 }}
        whileHover={{ rotate: 8, scale: scrolled ? 0.94 : 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25"
      >
        <Sparkles className="size-4" />
      </motion.span>
      <motion.span
        animate={{ scale: scrolled ? 0.94 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="font-heading text-xl font-bold tracking-tight text-foreground origin-left sm:text-2xl"
      >
        Salon<span className="text-primary">Flow</span>
      </motion.span>
    </Link>
  );
}
