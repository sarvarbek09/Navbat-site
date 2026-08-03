import { BookingCard, type BookingCardData } from "./booking-card";

type ServiceListProps = {
  title?: string;
  subtitle?: string;
  services: BookingCardData[];
};

export function ServiceList({
  title = "Xizmatni tanlang",
  subtitle = "Bizning premium sog'lomlashtirish xizmatlaridan birini tanlang.",
  services,
}: ServiceListProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-base text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <BookingCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
}
