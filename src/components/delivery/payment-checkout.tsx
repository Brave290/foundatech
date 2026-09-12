"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  projectSlug: string;
  projectName: string;
  amountKobo: number;
  currency?: string;
};

export function PaymentCheckout({ projectSlug, projectName, amountKobo, currency = "NGN" }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/paystack/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug,
          customerName: name.trim(),
          customerEmail: email.trim(),
          amountKobo,
          currency,
        }),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
        setBusy(false);
        return;
      }
      window.location.href = json.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="lg" className="min-h-12" />}>
        <ShoppingCart className="h-4 w-4" aria-hidden /> Get started
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="font-serifdisplay text-xl font-bold">Order {projectName}</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Pay securely via Paystack. You&apos;ll get instant access to your project files after payment.
        </p>
        <form onSubmit={handlePay} className="space-y-4 pt-2">
          <div className="rounded-lg bg-muted/20 p-4 text-center">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-serifdisplay text-3xl font-bold">
              {currency === "NGN" ? "₦" : currency} {(amountKobo / 100).toLocaleString()}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pay-name">Your name</Label>
            <Input id="pay-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Amina Bello" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pay-email">Email (for delivery access)</Label>
            <Input id="pay-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={!valid || busy} className="w-full min-h-12">
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Redirecting to Paystack...</> : "Pay now"}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">Secured by Paystack. Your payment details never touch our servers.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
