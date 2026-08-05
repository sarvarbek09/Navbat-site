"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Smart windowed pagination.
 *
 * Algorithm:
 *   Always show: first page, last page, current page, current±1.
 *   Insert "…" wherever there is a gap of 2+.
 *
 * Example (total=13, current=6):
 *   1 … 5 [6] 7 … 13
 *
 * Example (total=13, current=3):
 *   1 2 [3] 4 … 13
 *
 * Example (total=13, current=12):
 *   1 … 11 [12] 13
 */

function buildPages(current: number, total: number): (number | "…")[] {
  const set = new Set<number>();
  set.add(1);
  set.add(total);
  set.add(current);
  if (current - 1 >= 1) set.add(current - 1);
  if (current + 1 <= total) set.add(current + 1);

  const sorted = Array.from(set).sort((a, b) => a - b);
  const result: (number | "…")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("…");
    }
    result.push(sorted[i]);
  }
  return result;
}

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  pageLabel?: (n: number) => string;
};

export function Pagination({
  page,
  total,
  onChange,
  prevLabel = "Previous",
  nextLabel = "Next",
  pageLabel = (n) => `Page ${n}`,
}: Props) {
  if (total <= 1) return null;
  const pages = buildPages(page, total);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label={prevLabel}
        className="flex size-9 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground shadow-soft-sm transition-all hover:border-primary/40 hover:text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex size-9 items-center justify-center text-sm text-muted-foreground select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={pageLabel(p)}
            aria-current={page === p ? "page" : undefined}
            className={`flex size-9 items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              page === p
                ? "bg-primary text-white shadow-soft-sm"
                : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        aria-label={nextLabel}
        className="flex size-9 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground shadow-soft-sm transition-all hover:border-primary/40 hover:text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
