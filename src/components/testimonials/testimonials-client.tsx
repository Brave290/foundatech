"use client";

import { useState } from "react";
import { Star, Check, AlertCircle } from "lucide-react";
import { submitReview } from "@/lib/admin/actions";
import { BotShieldCheck } from "@/components/site/botshield-check";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function TestimonialsClient() {
  const [open, setOpen] = useState(false);
  const [queued, setQueued] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [human, setHuman] = useState(false);
  const valid = name.trim().length > 1 && quote.trim().length > 9 && human;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setBusy(true);
    setError("");
    const result = await submitReview(name.trim(), quote.trim());
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
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">Testimonials</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">Real voices, real reviews</h1>
        <p className="mb-12 text-muted-foreground">We never invent quotes. Every review here comes from a client who chose to share their experience.</p>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Star className="h-7 w-7 text-primary" aria-hidden />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className={cn(buttonVariants({ size: "lg" }), "min-h-12")}>Would you love to leave a review?</DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle className="font-serifdisplay text-xl font-bold">Share your experience</DialogTitle>
            {queued ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-6 w-6 text-primary" aria-hidden />
                </span>
                <p className="text-sm text-muted-foreground">Thank you. Your review is queued for verification — real voices only, published after a quick human check.</p>
                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="rv-name">Your name</Label>
                  <Input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Amina Bello" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rv-quote">Your review</Label>
                  <Textarea id="rv-quote" value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4} placeholder="What did we build for you, and how did it go?" />
                </div>
                <BotShieldCheck onValid={setHuman} />
                {error && (
                  <p className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" aria-hidden /> {error}
                  </p>
                )}
                <Button type="submit" disabled={!valid || busy} className="w-full min-h-11">
                  {busy ? "Submitting..." : "Submit for verification"}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">Reviews are manually verified before publishing. No incentives, no edits to your words.</p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
