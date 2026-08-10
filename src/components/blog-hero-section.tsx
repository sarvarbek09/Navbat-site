import { Clock, Calendar } from "lucide-react";

export function BlogHeroSection() {
  const categories = [
    "Barchasi",
    "Soch",
    "Teri",
    "Manikyur",
    "Go'zallik",
    "Trendlar",
    "Maslahatlar",
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Go'zallik olamidan foydali maslahatlar
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
            Sochingizdan tortib terigacha - hamma narsa uchun eng yaxshi maslahatlar va trendlar
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
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

        {/* Featured Blog Card */}
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden lg:h-96 lg:w-1/2">
              <img
                src="https://picsum.photos/800/600?random=4"
                alt="Featured blog post"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
              {/* Date and Reading Time */}
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>2024 yil 15 avgust</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>5 daqiqa o'qish</span>
                </div>
              </div>

              {/* Category and Title */}
              <div className="mb-3">
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Soch parvarishi
                </span>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                  Quruq sochlarni tiklash uchun 10 ta eng samarali usul
                </h2>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm text-muted-foreground sm:text-base lg:text-lg">
                Quruq, sinuvchi sochlaringizni jonlantirish uchun professional maslahatlar va uyda qo'llash mumkin bo'lgan samarali usullar. Biz sizga eng yaxshi natijalarni ta'minlaydigan usullarni tanlaymiz.
              </p>

              {/* Read Button */}
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 sm:text-base">
                O'qish
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
