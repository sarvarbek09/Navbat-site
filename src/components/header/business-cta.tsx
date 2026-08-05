import Link from "next/link";
import { Store } from "lucide-react";

type BusinessCtaProps = {
  label: string;
};

export function BusinessCta({ label }: BusinessCtaProps) {
  return (
    <Link
      href="/business"
      className="hidden items-center gap-1.5 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:shadow-sm lg:inline-flex"
    >
      <Store className="size-4" />
      {label}
    </Link>
  );
}
