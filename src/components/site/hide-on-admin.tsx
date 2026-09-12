"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Wraps public chrome so it disappears inside /admin (clean app feel). */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
