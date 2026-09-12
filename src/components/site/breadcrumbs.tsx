"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string, string> = {
  about: "About", services: "Services", projects: "Projects", pricing: "Pricing",
  faq: "FAQ", contact: "Contact", testimonials: "Reviews", privacy: "Privacy",
  terms: "Terms", refund: "Refund",
};

/** Auto breadcrumbs on every inner page. Hidden on home. */
export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const parts = pathname.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb" className="container pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
        <li>
          <Link href="/" aria-label="Home" className="transition-colors hover:text-foreground">
            <Home className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </li>
        {parts.map((p, i) => {
          const href = "/" + parts.slice(0, i + 1).join("/");
          const label = LABELS[p] ?? p.replace(/-/g, " ");
          const last = i === parts.length - 1;
          return (
            <li key={href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden />
              {last ? (
                <span aria-current="page" className="text-foreground">{label}</span>
              ) : (
                <Link href={href} className="transition-colors hover:text-foreground">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
