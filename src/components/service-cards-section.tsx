import { Heart, Star, Filter, ChevronDown } from "lucide-react";

export function ServiceCardsSection() {
  const categories = [
    "Barchasi",
    "Soch",
    "Manikyur",
    "Pedikyur",
    "Kosmetologiya",
    "Massaj",
    "Makiyaj",
  ];

  const services = [
    {
      id: 1,
      name: "Soch kesish va stil",
      rating: 4.8,
      reviews: 125,
      description: "Professional soch kesish va stil yaratish xizmati",
      duration: "45-60 daqiqa",
      price: "80,000 so'm",
      image: "/images/services-hero.png",
    },
    {
      id: 2,
      name: "Manikyur klassik",
      rating: 4.9,
      reviews: 98,
      description: "Klassik manikyur va qo'l parvarishi",
      duration: "30-45 daqiqa",
      price: "45,000 so'm",
      image: "/images/services-hero-2.png",
    },
    {
      id: 3,
      name: "Obyaviy massaj",
      rating: 4.7,
      reviews: 76,
      description: "Relaks va obyaviy massaj seansi",
      duration: "60-90 daqiqa",
      price: "120,000 so'm",
      image: "/images/services-hero-3.png",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Category Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (index === 0
                    ? "bg-primary text-white"
                    : "border border-border/70 bg-white/60 text-muted-foreground hover:bg-white/80 hover:text-foreground")
                }
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-border/70 bg-white/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/80 hover:text-foreground">
              <Filter className="size-4" />
              Filtrlar
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-border/70 bg-white/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/80 hover:text-foreground">
              Narx
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
          Mashhur xizmatlar
        </h2>

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden rounded-2xl border border-border/70 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
                <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white">
                  <Heart className="size-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{service.rating}</span>
                  </div>
                </div>

                <p className="mb-3 text-sm text-muted-foreground">
                  {service.description}
                </p>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{service.duration}</span>
                  <span className="font-semibold text-foreground">{service.price}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-xl border border-border/70 bg-white/60 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/80 hover:text-foreground">
                    Ko'rish
                  </button>
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-xl border border-border/70 bg-white/60 px-8 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-white/80 hover:text-foreground">
            Ko'proq ko'rish
          </button>
        </div>
      </div>
    </section>
  );
}
