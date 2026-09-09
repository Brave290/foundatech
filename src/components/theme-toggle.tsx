"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // avoids hydration mismatch (Layer 6)

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-11 w-11 rounded-md"
    >
      {mounted && resolvedTheme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </Button>
  );
}
