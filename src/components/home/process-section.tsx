"use client";

import { useLocale } from "@/components/site/locale-toggles";
import type { DictKey } from "@/config/i18n";

/** Four steps from idea to launch. Serif numerals + connector line. */
export function ProcessSection() {
  const { t } = useLocale();
  const steps: { num: string; title: DictKey; desc: DictKey }[] = [
    { num: "01", title: "step1", desc: "step1d" },
    { num: "02", title: "step2", desc: "step2d" },
    { num: "03", title: "step3", desc: "step3d" },
    { num: "04", title: "step4", desc: "step4d" },
  ];

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container">
        <div className="mb-14 max-w-2xl md:max-w-none md:text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">02 · {t("processTitle").split(" ")[0]}</p>
          <h2 className="font-serifdisplay text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight">{t("processTitle")}</h2>
          <p className="mt-4 text-muted-foreground">{t("processSub")}</p>
        </div>

        <ol className="relative grid gap-10 md:grid-cols-4">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-[1.4rem] hidden h-px bg-border md:block" />
          {steps.map((s) => (
            <li key={s.num} className="relative">
              <div className="relative z-10 mb-5 flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full border border-primary/40 bg-background">
                <span className="font-serif text-xl font-bold text-primary">{s.num}</span>
              </div>
              <h3 className="mb-2 font-serifdisplay text-lg font-bold tracking-tight">{t(s.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(s.desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
