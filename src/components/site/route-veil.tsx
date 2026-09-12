"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** On every navigation (forward or back): brief frosted veil + small amber spinner. */
export function RouteVeil() {
  const pathname = usePathname();
  const first = useRef(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setBusy(true);
    const t = window.setTimeout(() => setBusy(false), 420);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!busy) return null;

  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-background/70 backdrop-blur-md" aria-hidden="true">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
