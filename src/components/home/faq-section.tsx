"use client";

import { faqSeeds } from "@/config/content";
import { useLocale } from "@/components/site/locale-toggles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/** Four most-common questions. Translated chrome, English content until Wave 3 adds locale columns. */
export function FaqSection() {
  const { t } = useLocale();

  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl md:max-w-none md:text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">06 · {t("faq")}</p>
          <h2 className="font-serifdisplay text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight tracking-tight">{t("faq")}</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion className="space-y-3" defaultValue={["item-0"]}>
            {faqSeeds.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-lg border border-border/60 bg-background px-6">
                <AccordionTrigger className="py-5 text-left font-serifdisplay text-base font-semibold hover:no-underline sm:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
