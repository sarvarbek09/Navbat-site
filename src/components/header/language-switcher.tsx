"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Popover } from "radix-ui";
import { setLocale } from "@/actions/locale.actions";
import type { Locale } from "@/i18n/request";

const languages: { code: Locale; label: string }[] = [
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const activeLanguage = languages.find((language) => language.code === locale) ?? languages[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={isPending}
          className="group flex h-9 items-center gap-1.5 rounded-xl border border-border/70 bg-white/60 px-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50"
          aria-label="Tilni tanlash"
        >
          <Globe className="size-3.5 text-primary" />
          <span className="hidden sm:inline">{activeLanguage.code.toUpperCase()}</span>
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
            className="z-[60] w-44 rounded-2xl border border-border/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => setLocale(lang.code))}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary disabled:opacity-50"
              >
                {lang.label}
                {locale === lang.code && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
