import { pricingSeeds, currencyRates } from "@/config/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent starting rates for web development, software, and digital products.",
};

export default function PricingPage() {
  const symbols: Record<string, string> = { USD: "$", NGN: "₦", GBP: "£", CNY: "¥", CAD: "C$" };

  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">Pricing</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          Transparent starting rates
        </h1>
        <p className="text-muted-foreground">
          Every project is quoted in writing before you pay. These are indicative starting prices.
        </p>
      </div>

      <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
        {pricingSeeds.map((tier, i) => {
          const featured = i === 1;
          return (
            <article
              key={tier.tier}
              className={`relative flex flex-col rounded-lg border p-8 ${
                featured ? "border-primary bg-primary/5 shadow-lift" : "border-border/60 bg-background"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most chosen
                </span>
              )}
              <h2 className="mb-2 font-serifdisplay text-2xl font-bold tracking-tight">{tier.tier}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{tier.tagline}</p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">from</span>
                <span className="font-serifdisplay text-4xl font-bold tracking-tight">${tier.fromUsd}</span>
              </div>
              <p className="mt-auto text-xs text-muted-foreground">
                ~{symbols.NGN} {(tier.fromUsd * currencyRates.NGN).toLocaleString()} NGN · ~{symbols.GBP} {(tier.fromUsd * currencyRates.GBP).toFixed(0)} GBP
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Prices exclude VAT where applicable. Fixed quotes after your brief — no surprises.
      </p>
    </div>
  );
}
