import { Clock, Sparkles, Star, type LucideIcon } from "lucide-react";

export type BookingCardData = {
  id: string;
  icon?: LucideIcon;
  price: number;
  currency?: string;
  name: string;
  description: string;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
};

type BookingCardProps = BookingCardData;

export function BookingCard({
  icon: Icon = Sparkles,
  price,
  currency = "$",
  name,
  description,
  durationMinutes,
  rating,
  reviewCount,
}: BookingCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border-2 border-transparent bg-card/80 p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px]">
      <div className="flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
          <Icon className="size-5 text-primary-foreground" />
        </div>
        <span className="text-base text-primary">
          {currency}
          {price}
        </span>
      </div>

      <h3 className="pt-2 text-base text-foreground">{name}</h3>
      <p className="text-base text-muted-foreground">{description}</p>

      <div className="flex flex-wrap items-center gap-4 pt-2 text-base text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-[15px]" />
          {durationMinutes} daq
        </span>
        <span className="flex items-center gap-1">
          <Star className="size-[15px]" />
          {rating} ({reviewCount} sharh)
        </span>
      </div>
    </div>
  );
}
