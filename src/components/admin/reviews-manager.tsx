"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { moderateReview } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

type Review = {
  id: string;
  name: string;
  quote: string;
  status: string;
  created_at: string;
};

export function ReviewsManager({ reviews }: { reviews: Review[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const pending = reviews.filter((r) => r.status === "pending");
  const resolved = reviews.filter((r) => r.status !== "pending");

  async function handleModerate(id: string, status: "approved" | "rejected") {
    setBusy(id);
    await moderateReview(id, status);
    router.refresh();
    setBusy(null);
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Moderation</p>
        <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">Verified reviews appear on the testimonials page. Rejected reviews are discarded.</p>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-lg border border-border/60 bg-muted/20 p-8 text-center">
          <p className="font-serifdisplay text-lg font-bold">All caught up</p>
          <p className="mt-1 text-sm text-muted-foreground">No pending reviews to moderate.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Pending ({pending.length})</h2>
          {pending.map((r) => (
            <div key={r.id} className="rounded-lg border border-border/60 bg-background p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={busy === r.id} onClick={() => handleModerate(r.id, "approved")}>
                    <Check className="h-3.5 w-3.5" aria-hidden /> Approve
                  </Button>
                  <Button size="sm" variant="destructive" disabled={busy === r.id} onClick={() => handleModerate(r.id, "rejected")}>
                    <X className="h-3.5 w-3.5" aria-hidden /> Reject
                  </Button>
                </div>
              </div>
              <p className="text-sm italic text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="mt-10 space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">History ({resolved.length})</h2>
          {resolved.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 px-4 py-3 text-sm">
              <div className="min-w-0">
                <span className="font-bold">{r.name}</span>
                <span className="ml-2 truncate text-muted-foreground">&ldquo;{r.quote}&rdquo;</span>
              </div>
              <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] ${r.status === "approved" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
