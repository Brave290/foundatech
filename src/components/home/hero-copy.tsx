"use client";

import { useLocale } from "@/components/site/locale-toggles";

/** Title cascades word-by-word from above. key={lang} replays the drop on every language switch. */
export function HeroCopy() {
  const { t, lang } = useLocale();
  const words = t("title").split(" ");

  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">{t("badge")}</p>
      <h1
        key={lang}
        className="font-serifdisplay text-[clamp(1.85rem,7vw,4.4rem)] font-bold leading-[1.08] tracking-tight text-balance"
      >
        {words.map((w, i) => (
          <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <span className="word-drop inline-block" style={{ animationDelay: `${180 + i * 90}ms` }}>
              {w}
            </span>
          </span>
        )).reduce<React.ReactNode[]>((acc, el, i) => (i ? [...acc, " ", el] : [el]), [])}
      </h1>
      <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">{t("sub")}</p>
    </>
  );
}
