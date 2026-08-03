import { getTranslations } from "next-intl/server";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as { quote: string; name: string; role: string }[];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <h2 className="font-heading pb-8 text-center text-2xl font-semibold tracking-tight text-foreground sm:pb-12 sm:text-3xl">
          {t("title")}
        </h2>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
