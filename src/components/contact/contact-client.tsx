"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { submitContact } from "@/lib/admin/actions";
import { BotShieldCheck } from "@/components/site/botshield-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactClient() {
  const [queued, setQueued] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [human, setHuman] = useState(false);
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && message.trim().length > 9 && human;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setBusy(true);
    setError("");
    const result = await submitContact(name.trim(), email.trim(), message.trim());
    if ("error" in result) {
      setError(result.error);
      setBusy(false);
      return;
    }
    setQueued(true);
    setBusy(false);
  }

  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">Contact</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">Ready when you are</h1>
        <p className="mb-10 text-muted-foreground">
          Share what you&apos;re building. We&apos;ll reply in writing with a plan, a price, and a date — within 48 hours.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
          className="mb-14 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lift transition-all duration-base ease-soft hover:-translate-y-0.5"
        >
          <Mail className="h-5 w-5" aria-hidden /> {siteConfig.email}
        </a>
      </div>

      <div className="mx-auto max-w-xl rounded-lg border border-border/60 bg-muted/20 p-6 sm:p-8">
        {queued ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-7 w-7 text-primary" aria-hidden />
            </span>
            <h2 className="font-serifdisplay text-2xl font-bold">Message received.</h2>
            <p className="text-sm text-muted-foreground">We reply in writing within 48 hours — plan, price, and date.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ct-name">Your name</Label>
                <Input id="ct-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Amina Bello" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ct-email">Email</Label>
                <Input id="ct-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ct-message">Project details</Label>
              <Textarea id="ct-message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="What are you building, and what should it do?" />
            </div>
            <BotShieldCheck onValid={setHuman} />
            {error && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" aria-hidden /> {error}
              </p>
            )}
            <Button type="submit" disabled={!valid || busy} className="w-full min-h-12">
              {busy ? "Sending..." : "Send message"}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">Protected by BotShield. We never share your details.</p>
          </form>
        )}
      </div>
    </div>
  );
}
