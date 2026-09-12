"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/site/locale-toggles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Closing conversion moment. Big serif headline, amber gradient accent, single CTA. */
export function FinalCta() {
  const { t } = useLocale();

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">07 · {t("contact")}</p>
          <h2 className="font-serifdisplay text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Share what you're building. We'll reply in writing with a plan, a price, and a date — within 48 hours.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "min-h-12 px-8")}>
              {t("start")} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={`mailto:${siteConfig.email}`} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "min-h-12 px-8")}>
              Email us instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
