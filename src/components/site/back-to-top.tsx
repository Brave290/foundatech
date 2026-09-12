"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useVeilClasses } from "@/components/site/veil";

/** Left-edge back-to-top with live scroll-progress ring. Outer div = position + visibility, inner button = veil. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<HTMLSpanElement>(null);
  const veil = useVeilClasses();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (ringRef.current) {
          ringRef.current.style.background = `conic-gradient(hsl(var(--ring)) ${p * 360}deg, hsl(var(--border)) 0deg)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-4 z-40 transition-all duration-base ease-soft",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          })
        }
        aria-label="Back to top"
        className={cn("group relative block h-12 w-12", veil)}
      >
        <span ref={ringRef} className="absolute inset-0 rounded-full" />
        <span className="glass absolute inset-[3px] grid place-items-center rounded-full">
          <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-base ease-soft group-hover:-translate-y-0.5" aria-hidden="true">
            <path d="M3 9.5 8 4.5l5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 12.5h5" stroke="hsl(var(--ring))" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
