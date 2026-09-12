"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle, XCircle } from "lucide-react";
import { updateLeadStatus } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
};

export function LeadsManager({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const newLeads = leads.filter((l) => l.status === "new");
  const handled = leads.filter((l) => l.status !== "new");

  async function handleStatus(id: string, status: "replied" | "closed") {
    setBusy(id);
    await updateLeadStatus(id, status);
    router.refresh();
    setBusy(null);
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Inquiries</p>
        <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contact form submissions. Mark as replied or closed when handled.</p>
      </div>

      {newLeads.length === 0 ? (
        <div className="rounded-lg border border-border/60 bg-muted/20 p-8 text-center">
          <p className="font-serifdisplay text-lg font-bold">No new leads</p>
          <p className="mt-1 text-sm text-muted-foreground">When someone submits the contact form, it appears here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">New ({newLeads.length})</h2>
          {newLeads.map((l) => (
            <div key={l.id} className="rounded-lg border border-border/60 bg-background p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{l.name}</p>
                  <a href={`mailto:${l.email}`} className="flex items-center gap-1 font-mono text-xs text-primary hover:underline">
                    <Mail className="h-3 w-3" aria-hidden /> {l.email}
                  </a>
                  <p className="font-mono text-[10px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={busy === l.id} onClick={() => handleStatus(l.id, "replied")}>
                    <CheckCircle className="h-3.5 w-3.5" aria-hidden /> Replied
                  </Button>
                  <Button size="sm" variant="destructive" disabled={busy === l.id} onClick={() => handleStatus(l.id, "closed")}>
                    <XCircle className="h-3.5 w-3.5" aria-hidden /> Close
                  </Button>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{l.message}</p>
            </div>
          ))}
        </div>
      )}

      {handled.length > 0 && (
        <div className="mt-10 space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Handled ({handled.length})</h2>
          {handled.map((l) => (
            <div key={l.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 px-4 py-3 text-sm">
              <div className="min-w-0">
                <span className="font-bold">{l.name}</span>
                <span className="ml-2 text-muted-foreground">{l.email}</span>
              </div>
              <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] ${l.status === "replied" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {l.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
