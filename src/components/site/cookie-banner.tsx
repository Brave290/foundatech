"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** First-visit mini banner. Decision persisted; never shown again after choice. */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("founda-cookie-consent")) setShow(true);
    } catch {}
  }, []);

  const decide = (v: "accepted" | "declined") => {
    try {
      localStorage.setItem("founda-cookie-consent", v);
    } catch {}
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-4 bottom-4 z-[85] mx-auto max-w-md rounded-lg border border-border/60 bg-background/95 p-4 shadow-lift backdrop-blur-xl transition-all duration-slow ease-soft sm:inset-x-auto sm:right-6 sm:mx-0",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        We use essential cookies to keep the site working and optional analytics to improve it. We never sell your data.
      </p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => decide("accepted")} className={cn(buttonVariants({ size: "sm" }))}>
          Accept all
        </button>
        <button type="button" onClick={() => decide("declined")} className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
          Essential only
        </button>
        <Link href="/privacy" className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline">
          Policy
        </Link>
      </div>
    </div>
  );
}
