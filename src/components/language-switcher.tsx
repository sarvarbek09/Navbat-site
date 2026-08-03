"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
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

  return (
    <label className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-muted-foreground has-[select:focus]:ring-2 has-[select:focus]:ring-ring/50">
      <Globe className="size-4 shrink-0" />
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as Locale;
          startTransition(() => {
            setLocale(next);
          });
        }}
        className="cursor-pointer bg-transparent pr-1 font-medium text-foreground focus:outline-none disabled:opacity-50"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
