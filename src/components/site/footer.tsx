"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/components/site/locale-toggles";
import { useVeilClasses } from "@/components/site/veil";
import { StatusDot } from "@/components/site/status-dot";
import { FooterNewsletter } from "@/components/site/footer-newsletter";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/config/i18n";

function GithubIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.1.8.9 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>;
}
function LinkedinIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>;
}
function XIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z"/></svg>;
}
function TelegramIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm4.64 6.8-1.57 7.38c-.12.54-.43.67-.87.42l-2.43-1.79-1.17 1.13c-.13.13-.24.24-.49.24l.17-2.47 4.5-4.06c.2-.17-.04-.27-.3-.1l-5.57 3.5-2.4-.74c-.52-.17-.53-.52.11-.78l9.37-3.61c.43-.16.81.1.67.75z"/></svg>;
}

const SOCIAL_ICONS: Record<string, ReactNode> = {
  github: <GithubIcon className="h-5 w-5" />,
  x: <XIcon className="h-4 w-4" />,
  linkedin: <LinkedinIcon className="h-5 w-5" />,
  telegram: <TelegramIcon className="h-5 w-5" />,
};

// Discriminated union: translatable columns vs hardcoded legal column
type ColumnDef =
  | { heading: DictKey; links: { href: string; label: string }[]; useDict: true }
  | { heading: "legal"; links: { href: string; label: string }[]; useDict: false };

const COLUMNS: ColumnDef[] = [
  {
    heading: "product",
    useDict: true,
    links: [
      { href: "/services", label: "services" },
      { href: "/projects", label: "projects" },
      { href: "/pricing", label: "pricing" },
      { href: "/faq", label: "faq" },
      { href: "/contact", label: "contact" },
    ],
  },
  {
    heading: "company",
    useDict: true,
    links: [
      { href: "/about", label: "about" },
      { href: "/testimonials", label: "reviews" },
    ],
  },
  {
    heading: "legal",
    useDict: false,
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund", label: "Refund Policy" },
    ],
  },
];

const LEGAL_HEADING: Record<string, string> = {
  en: "Legal", fr: "Mentions légales", ar: "قانوني", yo: "Òfin",
};

export function Footer({ logo }: { logo: ReactNode }) {
  const veil = useVeilClasses();
  const { t, lang } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={cn("mt-auto border-t bg-muted/30", veil)}>
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="mb-5 inline-block">{logo}</Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="mb-6 text-xs text-muted-foreground/80">{siteConfig.credit}.</p>
            <div className="flex flex-wrap gap-3">
              {siteConfig.socials.map((s) => (
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/60 text-muted-foreground transition-all duration-base ease-soft hover:-translate-y-0.5 hover:bg-accent hover:text-foreground">
                  {SOCIAL_ICONS[s.key]}
                </a>
              ))}
              <a href={`mailto:${siteConfig.email}`} aria-label="Email us" className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/60 text-muted-foreground transition-all duration-base ease-soft hover:-translate-y-0.5 hover:bg-accent hover:text-foreground">
                <Mail className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 font-display text-sm font-bold">
                {col.useDict ? t(col.heading) : LEGAL_HEADING[lang] ?? "Legal"}
              </h3>
              <ul className="space-y-4 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted-foreground transition-colors duration-fast hover:text-foreground">
                      {col.useDict ? t(l.label as DictKey) : l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-1 font-display text-sm font-bold">Field notes, monthly.</h3>
              <p className="text-xs text-muted-foreground">One email a month: what we shipped, what we learned. No noise.</p>
            </div>
            <FooterNewsletter />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2024&ndash;{year} {siteConfig.name}. {t("rights")}</p>
          <StatusDot />
        </div>
      </div>
    </footer>
  );
}
