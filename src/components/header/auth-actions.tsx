import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuthActionsProps = {
  loginLabel: string;
  signUpLabel: string;
};

export function AuthActions({ loginLabel, signUpLabel }: AuthActionsProps) {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Button
        variant="ghost"
        size="lg"
        className="h-10 rounded-xl px-3.5 text-sm font-semibold text-muted-foreground hover:bg-white/70 hover:text-foreground sm:px-4"
        asChild
      >
        <Link href="/auth/login">{loginLabel}</Link>
      </Button>
      <Button
        size="lg"
        className="group h-10 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-500 px-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:px-5"
        asChild
      >
        <Link href="/auth/register">
          <span>{signUpLabel}</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}
