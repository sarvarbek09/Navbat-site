import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "./faq-accordion";

export async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[768px] px-10">
        <h2 className="font-heading pb-10 text-center text-2xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
