"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HeaderNav, type NavLink } from "./header-nav";
import { AuthActions } from "./auth-actions";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

type HeaderShellProps = {
  navLinks: NavLink[];
  forBusinessLabel: string;
  loginLabel: string;
  signUpLabel: string;
};

export function HeaderShell({ navLinks, forBusinessLabel, loginLabel, signUpLabel }: HeaderShellProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-secondary/70 backdrop-blur-xl supports-[backdrop-filter]:bg-secondary/55">
      <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-8 lg:gap-12">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="SalonFlow bosh sahifasi">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.06 }}
              className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25"
            >
              <Sparkles className="size-4" />
            </motion.span>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Salon<span className="text-primary">Flow</span>
            </span>
          </Link>

          <HeaderNav navLinks={navLinks} />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link
            href="/business"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-white/70 hover:text-foreground lg:inline-flex"
          >
            {forBusinessLabel}
          </Link>
          <AuthActions loginLabel={loginLabel} signUpLabel={signUpLabel} />
          <MobileNav
            navLinks={navLinks}
            forBusinessLabel={forBusinessLabel}
            loginLabel={loginLabel}
            signUpLabel={signUpLabel}
          />
        </div>
      </div>
    </header>
  );
}
