"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/site/locale-toggles";
import { cn } from "@/lib/utils";

/** Whole-page frosted veil on first load + language switch. Fixed overlay = traps nothing. */
export function FirstLoadVeil() {
  const { veiling } = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
      return;
    }
    const started = Date.now();
    const finish = () => window.setTimeout(() => setLoaded(true), Math.max(0, 700 - (Date.now() - started)));
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const safety = window.setTimeout(finish, 2500);
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);

  const hidden = !loaded || veiling;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[95] bg-background/70 backdrop-blur-xl transition-opacity ease-soft",
        veiling ? "duration-[450ms]" : "duration-[1100ms]",
        hidden ? "opacity-100" : "opacity-0"
      )}
    />
  );
}