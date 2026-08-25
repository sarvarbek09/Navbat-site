import { Search, MapPin } from "lucide-react";

export function SearchHero() {
  return (
    <section className="flex min-h-[600px] items-center justify-center bg-gradient-to-b from-secondary/50 to-background px-4 py-20">
      <div className="w-full max-w-4xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
          Go'zallik xizmatlarini kashf eting
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base lg:text-lg">
          Sizga eng yaqin eng yaxshi go'zallik salonlarini toping
          <br />
          Xizmatlar, narxlar va mijozlar sharhlarini ko'ring
        </p>
        
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-white/80 p-2 shadow-lg backdrop-blur-sm sm:flex-row sm:p-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-white/60 px-4 py-3 transition-colors focus-within:border-primary/50 focus-within:bg-white/80">
              <Search className="size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Xizmat yoki salon nomini kiriting..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-white/60 px-4 py-3 transition-colors focus-within:border-primary/50 focus-within:bg-white/80">
              <MapPin className="size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Manzil yoki tuman"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            
            <button className="rounded-xl bg-gradient-to-r from-primary to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 sm:px-8">
              Qidirish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
