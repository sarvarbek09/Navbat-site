"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder: string;
  shortcutHint: string;
  className?: string;
};

export function SearchBar({ placeholder, shortcutHint, className }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/salons?q=${encodeURIComponent(query)}` : "/salons");
    inputRef.current?.blur();
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        "hidden w-[300px] max-w-full shrink items-center gap-2 rounded-2xl border border-white/70 bg-white/55 px-3.5 py-2 shadow-sm backdrop-blur-xl transition-colors duration-300 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-md lg:flex " +
        (className ?? "")
      }
    >
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {!focused && !value && (
        <kbd className="hidden shrink-0 rounded-md border border-border/70 bg-white/70 px-1.5 py-0.5 font-sans text-[11px] font-medium text-muted-foreground xl:inline-block">
          {shortcutHint}
        </kbd>
      )}
    </form>
  );
}
