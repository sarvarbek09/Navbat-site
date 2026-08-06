import { MapPin, CheckCircle, Leaf } from "lucide-react";

// Breakpoints:
// mobile/tablet (≤1024px): shown below tabs as full-width card
// desktop (1025px+): sticky right sidebar

const HOURS = [
  { days: "Mon – Fri", hours: "9:00 AM – 9:00 PM" },
  { days: "Sat – Sun", hours: "10:00 AM – 6:00 PM" },
];

const WHY_CHOOSE = [
  {
    icon: CheckCircle,
    title: "Certified Professionals",
    desc: "Top-tier experts with over 10 years experience.",
    color: "text-primary",
  },
  {
    icon: Leaf,
    title: "Organic Products",
    desc: "We only use premium, cruelty-free botanicals.",
    color: "text-emerald-500",
  },
];

export function LocationSidebar() {
  return (
    <div className="flex flex-col gap-5">
      {/* Map placeholder */}
      <div className="overflow-hidden rounded-2xl border border-border shadow-soft-sm">
        <div className="flex h-40 items-center justify-center bg-muted/60">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <MapPin className="size-8 text-primary/40" />
            <span className="text-xs">Map preview</span>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="p-4">
          <p className="pb-3 text-sm font-bold text-foreground">Location & Hours</p>
          <p className="pb-4 text-sm text-muted-foreground">
            248 West 4th Street, New York, NY 10014
          </p>

          <div className="flex flex-col gap-2 pb-4">
            {HOURS.map((row) => (
              <div key={row.days} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{row.days}</span>
                <span className="font-semibold text-foreground">{row.hours}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full rounded-xl border border-primary/30 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 active:scale-[0.99]"
          >
            Get Directions
          </button>
        </div>
      </div>

      {/* Why choose us */}
      <div className="rounded-2xl border border-border bg-white p-4 shadow-soft-sm">
        <p className="pb-3 text-sm font-bold text-foreground">Why choose us?</p>
        <div className="flex flex-col gap-4">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="flex gap-3">
              <item.icon className={`mt-0.5 size-5 shrink-0 ${item.color}`} />
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
