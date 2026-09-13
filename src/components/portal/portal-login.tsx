"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function PortalLogin() {
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
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/portal/dashboard` },
    });
    if (error) setErr(error.message);
    else setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a magic sign-in link to <strong>{email}</strong>. Click it to access your projects.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your portal</CardTitle>
        <CardDescription>Enter the email you used when purchasing your project.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="portal-email">Email address</Label>
            <Input id="portal-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" disabled={busy} className="w-full min-h-11">
            {busy ? "Sending..." : "Email me a magic link"}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">No passwords required. We'll email you a one-time sign-in link.</p>
        </form>
      </CardContent>
    </Card>
  );
}
