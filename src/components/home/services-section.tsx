"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceSeeds } from "@/config/content";
import { useLocale } from "@/components/site/locale-toggles";

/** Four disciplines, one standard. Editorial grid, not generic cards. */
export function ServicesSection() {
  const { t } = useLocale();
  return (
    <section className="border-t border-border/60 bg-background py-20 sm:py-28">
      <div className="container">
        <div className="mb-14 max-w-2xl md:max-w-none md:text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">01 · {t("services")}</p>
          <h2 className="font-serifdisplay text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight">{t("servicesTitle")}</h2>
          <p className="mt-4 text-muted-foreground">{t("servicesSub")}</p>
        </div>

        <div className="grid gap-px bg-border/60 sm:grid-cols-2">
          {serviceSeeds.map((s, i) => (
            <article
              key={s.title}
              className="group relative bg-background p-8 transition-colors duration-base ease-soft hover:bg-accent/40 sm:p-10"
            >
              <span className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:right-8 sm:top-8">
                0{i + 1}
              </span>
              <h3 className="mb-3 font-serifdisplay text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h3>
              <p className="max-w-md text-sm text-muted-foreground sm:text-base">{s.blurb}</p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-base ease-soft group-hover:translate-x-1"
              >
                {t("learnMore")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
