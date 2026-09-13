"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: MessageSquare },
  { href: "/admin", label: "Admin", icon: Settings },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/projects/")) return null;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 sm:hidden",
        "bg-background/80 backdrop-blur-lg border-t border-border/60",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] leading-tight transition-colors duration-fast",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
