import { faqSeeds } from "@/config/content";
import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about working with Founda Technologies.",
};

export default function FaqPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">FAQ</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          Common questions
        </h1>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion className="space-y-3">
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
  );
}
