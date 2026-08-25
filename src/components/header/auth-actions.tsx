import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Visible on md+ (768px and above).
 * Tablet: compact height/padding. Desktop: full size.
 */
export function AuthActions({ loginLabel, signUpLabel }: { loginLabel: string; signUpLabel: string }) {
  return (
    <div className="hidden items-center gap-1 md:flex lg:gap-1.5">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 rounded-xl px-3 text-sm font-semibold text-muted-foreground hover:bg-white/70 hover:text-foreground lg:h-9 lg:px-4"
        asChild
      >
        <Link href="/auth/login">{loginLabel}</Link>
      </Button>
      <Button
        size="sm"
        className="group h-8 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-500 px-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 lg:h-9 lg:px-4"
        asChild
      >
        <Link href="/auth/register">
          <span>{signUpLabel}</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5 lg:size-4" />
        </Link>
      </Button>
    </div>
  );
}
