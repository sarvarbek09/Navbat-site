import { getTranslations } from "next-intl/server";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as { quote: string; name: string; role: string }[];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-10">
        <h2 className="font-heading pb-12 text-center text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
