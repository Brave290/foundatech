"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { pricingSeeds, currencyRates } from "@/config/content";
import { useLocale } from "@/components/site/locale-toggles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Three tiers, "from" prices that flip live when user changes currency. Featured tier highlighted. */
export function PricingSection() {
  const { t, currency, format } = useLocale();
  const rate = currencyRates[currency] ?? 1;

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container">
        <div className="mb-14 max-w-2xl md:max-w-none md:text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">05 · {t("pricing")}</p>
          <h2 className="font-serifdisplay text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight tracking-tight">
            {t("pricing")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Indicative starting rates. Every project is quoted in writing before you pay.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingSeeds.map((tier, i) => {
            const featured = i === 1;
            const price = format(tier.fromUsd * rate);
            return (
              <article
                key={tier.tier}
                className={cn(
                  "relative flex flex-col rounded-lg border p-8 transition-all duration-base ease-soft",
                  featured
                    ? "border-primary bg-primary/5 shadow-lift"
                    : "border-border/60 bg-background hover:-translate-y-0.5 hover:shadow-card"
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Most chosen
                  </span>
                )}
                <h3 className="mb-2 font-serifdisplay text-2xl font-bold tracking-tight">{tier.tier}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{tier.tagline}</p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">from</span>
                  <span className="font-serifdisplay text-4xl font-bold tracking-tight">{price}</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  {["Responsive design", "SEO foundations", "Contact form", "Admin dashboard"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className={cn(buttonVariants({ variant: featured ? "default" : "outline" }), "mt-auto")}>
                  {t("pricing")} details <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
