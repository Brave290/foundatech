"use client";

import Link from "next/link";
import { CheckCircle, Clock, ExternalLink } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Order = {
  id: string;
  reference: string;
  project_slug: string;
  customer_name: string;
  customer_email: string;
  amount_kobo: number;
  currency: string;
  status: string;
  access_token: string;
  paid_at: string | null;
  created_at: string;
};

export function DeliveryRoom({ order, mode }: { order: Order; mode: "confirmation" | "access" }) {
  const isPaid = order.status === "paid";
  const amount = order.amount_kobo;

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg text-center">
        {isPaid ? (
          <>
            <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" aria-hidden />
            </span>
            <h1 className="mb-3 font-serifdisplay text-3xl font-bold tracking-tight">Payment confirmed</h1>
            <p className="mb-8 text-muted-foreground">
              Thank you, {order.customer_name}. Your project delivery is being prepared.
            </p>
          </>
        ) : (
          <>
            <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Clock className="h-8 w-8 text-muted-foreground" aria-hidden />
            </span>
            <h1 className="mb-3 font-serifdisplay text-3xl font-bold tracking-tight">Payment pending</h1>
            <p className="mb-8 text-muted-foreground">
              Your payment is being processed. This usually takes less than a minute.
            </p>
          </>
        )}

        <div className="rounded-lg border border-border/60 bg-muted/20 p-6 text-left">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Order details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Reference</dt>
              <dd className="font-mono text-xs font-bold">{order.reference}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Project</dt>
              <dd className="font-bold capitalize">{order.project_slug.replace(/-/g, " ")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-bold">{order.currency} {(amount / 100).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${isPaid ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {order.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {isPaid && (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-2 text-sm font-bold">Your access link</p>
            <p className="mb-3 text-xs text-muted-foreground">
              Save this link — it gives you permanent access to your project files.
            </p>
            <code className="block break-all rounded-md bg-background p-3 font-mono text-xs text-muted-foreground">
              {typeof window !== "undefined" ? window.location.origin : ""}/delivery?token={order.access_token}
            </code>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/projects/${order.project_slug}`} className={cn(buttonVariants({ variant: "outline" }))}>
            View project <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link href="/" className={cn(buttonVariants())}>Back to home</Link>
        </div>
      </div>
    </div>
  );
}
