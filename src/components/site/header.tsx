"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggles, useLocale } from "@/components/site/locale-toggles";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/config/i18n";

const NAV: { key: DictKey; href: string }[] = [
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export function Header({ logo }: { logo: ReactNode }) {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const b = document.body;
    if (open) {
      const y = window.scrollY;
      b.style.position = "fixed";
      b.style.top = `-${y}px`;
      b.style.left = "0";
      b.style.right = "0";
      b.style.overflow = "hidden";
    } else {
      const top = b.style.top;
      b.style.position = "";
      b.style.top = "";
      b.style.left = "";
      b.style.right = "";
      b.style.overflow = "";
      if (top) window.scrollTo(0, Math.abs(parseInt(top, 10) || 0));
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      const b = document.body;
      b.style.position = "";
      b.style.top = "";
      b.style.left = "";
      b.style.right = "";
      b.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "glass sticky top-0 z-50 w-full border-b border-border/60 transition-all duration-base ease-soft",
          condensed ? "py-2 shadow-card" : "py-3"
        )}
      >
        <div className="container flex h-12 items-center justify-between gap-3">
          <Link href="/" aria-label={siteConfig.name} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="hide-logo-sub">{logo}</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Primary">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors duration-fast hover:text-foreground">
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="flex h-11 items-center gap-1 max-[380px]:gap-0.5">
            <LocaleToggles />
            {siteConfig.phone && (
              <Link href={`tel:${siteConfig.phone}`} aria-label={t("call")} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden md:inline-flex")}>
                <Phone className="h-4 w-4" aria-hidden />
              </Link>
            )}
            {siteConfig.whatsapp && (
              <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={t("whatsapp")} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden md:inline-flex")}>
                <MessageCircle className="h-4 w-4" aria-hidden />
              </Link>
            )}
            <ThemeToggle />
            <Link href="/contact" className={cn(buttonVariants({ size: "default" }), "hidden min-h-11 md:inline-flex")}>
              {t("start")} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-fast hover:bg-accent lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-[2px] w-6 rounded-full bg-foreground" />
                <span className="h-[2px] w-6 rounded-full bg-foreground" />
                <span className="h-[2px] w-6 rounded-full bg-foreground" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[55] bg-background/80 backdrop-blur-sm transition-opacity duration-slow ease-soft lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-[75vw] max-w-[300px] flex-col border-l border-border/60 bg-background/95 px-6 pb-8 pt-5 overscroll-contain backdrop-blur-2xl transition-transform duration-[600ms] ease-soft lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-12 items-center justify-between">
          <span className="hide-logo-sub">{logo}</span>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("closeMenu")}
            className="group flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-fast hover:bg-accent"
          >
            <X className="h-6 w-6 transition-transform duration-base ease-soft group-hover:rotate-90" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
          {NAV.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
              className={cn(
                "group flex items-baseline gap-4 font-display text-3xl font-bold transition-all duration-slow ease-soft",
                open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}
            >
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <span className="transition-all duration-base ease-soft group-hover:translate-x-1.5 group-hover:text-primary">{t(l.key)}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.phone && (
            <Link href={`tel:${siteConfig.phone}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              <Phone className="h-3.5 w-3.5" aria-hidden /> {t("call")}
            </Link>
          )}
          {siteConfig.whatsapp && (
            <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> {t("whatsapp")}
            </Link>
          )}
        </div>

        <div className="mt-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Founda Technologies
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{siteConfig.email}</p>
        </div>
      </div>
    </>
  );
}
