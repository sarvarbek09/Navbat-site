import type { Config } from "tailwindcss";

// CSS vars store raw "R G B" channels (see globals.css), so wrapping them
// like this is what makes opacity modifiers (bg-primary/50, etc.) work in
// Tailwind v3 — a plain "var(--x)" string can't be split into an alpha
// channel at build time.
// Tailwind's JIT engine accepts a function here at runtime, but the
// `tailwindcss` Config type doesn't model that case — cast so the two agree.
function withOpacity(variable: string): string {
  return ((({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      // --x stores space-separated "R G B" channels, so the alpha must be
      // appended with the modern `rgb(r g b / a)` slash syntax. The legacy
      // `rgba(r g b, a)` form mixes space- and comma-separated arguments,
      // which is invalid CSS — the browser drops the whole declaration and
      // every color utility (bg-primary, text-primary, ...) silently renders
      // as nothing.
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  }) as unknown) as string;
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: withOpacity("--border"),
        input: withOpacity("--input"),
        ring: withOpacity("--ring"),
        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
        primary: {
          DEFAULT: withOpacity("--primary"),
          foreground: withOpacity("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacity("--secondary"),
          foreground: withOpacity("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: withOpacity("--destructive"),
          foreground: withOpacity("--destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacity("--muted"),
          foreground: withOpacity("--muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          foreground: withOpacity("--accent-foreground"),
        },
        popover: {
          DEFAULT: withOpacity("--popover"),
          foreground: withOpacity("--popover-foreground"),
        },
        card: {
          DEFAULT: withOpacity("--card"),
          foreground: withOpacity("--card-foreground"),
        },
        sidebar: {
          DEFAULT: withOpacity("--sidebar"),
          foreground: withOpacity("--sidebar-foreground"),
          primary: withOpacity("--sidebar-primary"),
          "primary-foreground": withOpacity("--sidebar-primary-foreground"),
          accent: withOpacity("--sidebar-accent"),
          "accent-foreground": withOpacity("--sidebar-accent-foreground"),
          border: withOpacity("--sidebar-border"),
          ring: withOpacity("--sidebar-ring"),
        },
        chart: {
          "1": withOpacity("--chart-1"),
          "2": withOpacity("--chart-2"),
          "3": withOpacity("--chart-3"),
          "4": withOpacity("--chart-4"),
          "5": withOpacity("--chart-5"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
      boxShadow: {
        // Soft UI elevation: a neutral shadow layer for depth + a faint
        // brand-tinted layer for glow, instead of flat/generic black shadows.
        "soft-sm":
          "0 1px 2px 0 rgb(var(--foreground) / 0.04), 0 1px 3px 0 rgb(var(--primary) / 0.06)",
        soft: "0 2px 8px -2px rgb(var(--foreground) / 0.06), 0 4px 16px -4px rgb(var(--primary) / 0.10)",
        "soft-lg":
          "0 8px 24px -4px rgb(var(--foreground) / 0.08), 0 12px 32px -8px rgb(var(--primary) / 0.14)",
        "soft-xl":
          "0 16px 40px -8px rgb(var(--foreground) / 0.10), 0 20px 48px -12px rgb(var(--primary) / 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
