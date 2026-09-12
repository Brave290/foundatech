"use client";

import { useState, useEffect } from "react";
import { Star, Check, AlertCircle } from "lucide-react";
import { useLocale } from "@/components/site/locale-toggles";
import { submitReview } from "@/lib/admin/actions";
import { BotShieldCheck } from "@/components/site/botshield-check";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Testimonial = { quote: string; author: string; role: string | null };

export function TestimonialsSection() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [queued, setQueued] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [human, setHuman] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const valid = name.trim().length > 1 && quote.trim().length > 9 && human;

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => { if (d.testimonials) setTestimonials(d.testimonials); })
      .catch(() => {});
  }, []);

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
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">04 · {t("reviews")}</p>
          <h2 className="font-serifdisplay text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight tracking-tight">{t("reviews")}</h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((test, i) => (
              <figure key={i} className="rounded-lg border border-border/60 bg-background p-6">
                <blockquote className="mb-4 text-sm italic leading-relaxed text-foreground">&ldquo;{test.quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3 text-xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{test.author}</div>
                    {test.role && <div className="text-muted-foreground">{test.role}</div>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-7 w-7 text-primary" aria-hidden />
            </div>
            <p className="mb-2 font-serifdisplay text-2xl font-bold tracking-tight">Real voices, real reviews.</p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We never invent quotes. When clients share their experience, it appears here after verification.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={cn(buttonVariants({ size: "default" }))}>Leave us a review</DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogTitle className="font-serifdisplay text-xl font-bold">Share your experience</DialogTitle>
              {queued ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-6 w-6 text-primary" aria-hidden />
                  </span>
                  <p className="text-sm text-muted-foreground">Thank you. Your review is queued for verification — real voices only.</p>
                  <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <Label htmlFor="hs-name">Your name</Label>
                    <Input id="hs-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Amina Bello" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="hs-quote">Your review</Label>
                    <Textarea id="hs-quote" value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4} placeholder="What did we build for you, and how did it go?" />
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
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
