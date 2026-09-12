"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, User, Settings, Star, Mail, LogOut } from "lucide-react";
import { SignOut } from "@/components/admin/sign-out";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/founder", label: "Founder", icon: User },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/leads", label: "Leads", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="w-full border-b border-border/60 bg-muted/20 px-4 py-3 lg:w-60 lg:flex-shrink-0 lg:border-b-0 lg:border-r lg:py-8 lg:px-4">
      <Link href="/admin" className="mb-4 block font-display text-sm font-bold uppercase tracking-wider text-primary lg:mb-8">
        Founda Admin
      </Link>
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {LINKS.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{l.label}</span>
            </Link>
          );
        })}
        <div className="mt-auto hidden lg:block">
          <SignOut />
        </div>
      </nav>
    </aside>
  );
}
