"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Frontend BotShield layer: honeypot field + human timing + explicit check.
 * Real cryptographic token verification wires in Wave 4 via /api/botshield.
 */
export function BotShieldCheck({ onValid }: { onValid: (v: boolean) => void }) {
  const [checked, setChecked] = useState(false);
  const [honey, setHoney] = useState("");
  const mountedAt = useRef(Date.now());
  const human = checked && honey === "" && Date.now() - mountedAt.current > 1500;

  useEffect(() => {
    onValid(human);
  }, [human, onValid]);

  return (
    <div className="space-y-2">
      <label
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-md border border-border/60 bg-muted/20 px-4 py-3 text-sm transition-colors duration-fast hover:bg-accent/40",
          checked && "border-primary/50 bg-primary/5"
        )}
      >
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <ShieldCheck className={cn("h-4 w-4", checked ? "text-primary" : "text-muted-foreground")} aria-hidden />
        <span>I'm human — BotShield protected</span>
      </label>
      <input
        type="text"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        placeholder="Leave empty"
      />
    </div>
  );
}