"use client";

import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { subscribe } from "@/lib/admin/actions";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const valid = /.+@.+\..+/.test(email);

  if (done) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Check className="h-4 w-4 text-primary" aria-hidden /> You&apos;re on the list. First issue lands soon.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setBusy(true);
    setError("");
    const result = await subscribe(email.trim());
    if ("error" in result) {
      setError(result.error);
      setBusy(false);
      return;
    }
    setDone(true);
    setBusy(false);
  }

  return (
    <div>
      <form className="flex flex-wrap items-center gap-2" onSubmit={handleSubmit}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address for newsletter"
          className="h-10 max-w-xs flex-1 rounded-full bg-background"
          disabled={busy}
        />
        <button type="submit" disabled={!valid || busy} className={cn(buttonVariants({ size: "sm" }), "h-10 rounded-full px-4")}>
          <Send className="h-3.5 w-3.5" aria-hidden /> {busy ? "..." : "Subscribe"}
        </button>
      </form>
      {error && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
          <AlertCircle className="h-3 w-3" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
