"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setErr(error.message);
    else setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-border/60 bg-muted/20 p-6 text-center">
        <p className="mb-2 font-serifdisplay text-xl font-bold">Check your email</p>
        <p className="text-sm text-muted-foreground">We sent a magic sign-in link to <strong>{email}</strong>. Click it to enter the dashboard.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="admin-email">Admin email</Label>
        <Input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@foundatech.name.ng" />
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      <Button type="submit" disabled={busy} className="w-full min-h-11">
        {busy ? "Sending..." : "Email me a magic link"}
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">No passwords. Supabase emails you a one-time sign-in link.</p>
    </form>
  );
}
