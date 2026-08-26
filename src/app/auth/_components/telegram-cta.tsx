import Link from "next/link";
import { Send } from "lucide-react";

export function TelegramCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
    >
      <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      {label}
    </Link>
  );
}
