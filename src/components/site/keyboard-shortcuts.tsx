"use client";

import { useEffect, useState } from "react";
import { Keyboard, Moon, X } from "lucide-react";

interface ToastState {
  message: string;
  icon: React.ReactNode;
  key: number;
}

export function KeyboardShortcuts() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const showToast = (message: string, icon: React.ReactNode) => {
      clearTimeout(timeout);
      setToast({ message, icon, key: Date.now() });
      timeout = setTimeout(() => setToast(null), 2000);
    };

    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.key === "k") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          'input[type="search"], input[name="search"], input[placeholder*="search" i], input[placeholder*="Search" i], [data-command-k]'
        );
        if (input) {
          input.focus();
        } else {
          document.dispatchEvent(new CustomEvent("foundie:toggle-chat"));
        }
        showToast("Search", <Keyboard className="h-4 w-4" />);
      }

      if (meta && e.key === "/") {
        e.preventDefault();
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        try {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch {}
        showToast(isDark ? "Dark mode" : "Light mode", <Moon className="h-4 w-4" />);
      }

      if (e.key === "Escape") {
        const openDialog = document.querySelector("[data-slot='dialog-content']");
        if (openDialog) {
          const closeBtn = document.querySelector<HTMLElement>(
            "[data-slot='dialog-close']"
          );
          closeBtn?.click();
          showToast("Closed", <X className="h-4 w-4" />);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timeout);
    };
  }, []);

  if (!toast) return null;

  return (
    <div
      key={toast.key}
      className="pointer-events-none fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/95 px-4 py-2 text-sm text-muted-foreground shadow-lg backdrop-blur-xl">
        {toast.icon}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
