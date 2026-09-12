"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Eclipse morph: icons cross-rotate through scale-zero, amber burst ring on every flip, squash on press. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [burst, setBurst] = useState(0);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(dark ? "light" : "dark");
        setBurst((b) => b + 1);
      }}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition-transform duration-base ease-soft hover:bg-accent active:scale-90"
    >
      {mounted && burst > 0 && (
        <span
          key={burst}
          aria-hidden="true"
          className="toggle-burst absolute inset-0 rounded-full border-2 border-primary/60"
        />
      )}
      <span aria-hidden="true" className="relative block h-5 w-5">
        <Sun
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-slow ease-soft",
            dark ? "-rotate-[120deg] scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
            !dark && "group-hover:rotate-90"
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-slow ease-soft",
            dark ? "rotate-0 scale-100 opacity-100" : "rotate-[120deg] scale-0 opacity-0",
            dark && "group-hover:-rotate-12"
          )}
        />
      </span>
    </button>
  );
}
