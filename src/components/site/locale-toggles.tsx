"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { dictionaries, type DictKey, type LangKey } from "@/config/i18n";
import { cn } from "@/lib/utils";

export type CurrencyCode = "USD" | "NGN" | "GBP" | "CNY" | "CAD";

export const CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸", locale: "en-US", label: "US Dollar" },
  { code: "NGN", symbol: "₦", flag: "🇳🇬", locale: "en-NG", label: "Naira" },
  { code: "GBP", symbol: "£", flag: "🇬🇧", locale: "en-GB", label: "Pound Sterling" },
  { code: "CNY", symbol: "¥", flag: "🇨🇳", locale: "zh-CN", label: "Chinese Yuan" },
  { code: "CAD", symbol: "$", flag: "🇨🇦", locale: "en-CA", label: "Canadian Dollar" },
] as const;

export const LANGS = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "yo", flag: "🇳🇬", label: "Yorùbá" },
] as const;

interface LocaleState {
  currency: CurrencyCode;
  lang: LangKey;
  setCurrency: (c: CurrencyCode) => void;
  setLang: (l: LangKey) => void;
  format: (amount: number) => string;
  t: (key: DictKey) => string;
  veiling: boolean;
}

const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [lang, setLangState] = useState<LangKey>("en");
  const [veiling, setVeiling] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("founda-currency-v2") as CurrencyCode | null;
      const l = localStorage.getItem("founda-lang-v2") as LangKey | null;
      if (c && CURRENCIES.some((x) => x.code === c)) setCurrencyState(c);
      if (l && LANGS.some((x) => x.code === l)) setLangState(l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem("founda-currency-v2", c); } catch {}
  };
  const setLang = (l: LangKey) => {
    if (l === lang) return;
    const apply = () => {
      setLangState(l);
      try { localStorage.setItem("founda-lang-v2", l); } catch {}
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    setVeiling(true);
    window.setTimeout(() => {
      apply();
      window.setTimeout(() => setVeiling(false), 120);
    }, 420);
  };
  const format = (amount: number) => {
    const meta = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
    return new Intl.NumberFormat(meta.locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  };
  const t = (key: DictKey) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return (
    <LocaleContext.Provider value={{ currency, lang, setCurrency, setLang, format, t, veiling }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

function LocaleMenu({
  ariaLabel,
  options,
  value,
  onChange,
}: {
  ariaLabel: string;
  options: readonly { code: string; flag: string; label: string }[];
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.code === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs font-bold text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
      >
        <span aria-hidden="true" className="text-sm leading-none">{current?.flag}</span>
        {value.toUpperCase()}
        <ChevronDown aria-hidden="true" className={cn("h-3 w-3 transition-transform duration-base ease-soft", open && "rotate-180")} />
      </button>
      <div
        role="menu"
        className={cn(
          "absolute right-0 top-12 z-50 min-w-44 rounded-md border border-border/60 bg-background/95 p-1 shadow-lift backdrop-blur-xl transition-all duration-base ease-soft",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        {options.map((o) => (
          <button
            key={o.code}
            type="button"
            role="menuitem"
            onClick={() => { onChange(o.code); setOpen(false); }}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-xs transition-colors duration-fast hover:bg-accent",
              o.code === value ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span aria-hidden="true" className="text-sm leading-none">{o.flag}</span>
            <span className="flex-1">{o.label}</span>
            <span className="font-mono text-[10px] text-muted-foreground/70">{o.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LocaleToggles() {
  const { currency, setCurrency, lang, setLang, t } = useLocale();
  return (
    <div className="flex items-center gap-1">
      <LocaleMenu ariaLabel={t("currency")} options={CURRENCIES} value={currency} onChange={(c) => setCurrency(c as CurrencyCode)} />
      <LocaleMenu ariaLabel={t("language")} options={LANGS} value={lang} onChange={(l) => setLang(l as LangKey)} />
    </div>
  );
}
