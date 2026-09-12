"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocale } from "@/components/site/locale-toggles";
import { cn } from "@/lib/utils";

const VeilContext = createContext<{ hidden: boolean } | null>(null);

/** Owns the load state; combines with locale veiling so EVERY surface blurs together. */
export function VeilProvider({ children }: { children: ReactNode }) {
  const { veiling } = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
      return;
    }
    const done = () => setLoaded(true);
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
    const safety = window.setTimeout(done, 2500);
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", done);
    };
  }, []);

  return <VeilContext.Provider value={{ hidden: !loaded || veiling }}>{children}</VeilContext.Provider>;
}

/**
 * Veil classes for any surface. CRITICAL RULE: once revealed we leave NO
 * transform/filter class behind (only opacity), so position:fixed descendants
 * (drawer, backdrop, back-to-top) stay viewport-anchored. skip = ignore veil
 * while the drawer is open, so an open drawer never jumps during a lang swap.
 */
export function useVeilClasses(skip = false) {
  const ctx = useContext(VeilContext);
  const { veiling } = useLocale();
  const hidden = (ctx?.hidden ?? false) && !skip;
  return cn(
    "transition-all ease-soft",
    veiling ? "duration-[450ms]" : "duration-[1100ms]",
    hidden ? "scale-[1.01] opacity-0 blur-lg" : "opacity-100"
  );
}
