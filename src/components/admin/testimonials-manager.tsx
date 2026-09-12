"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  source: string | null;
  verified: boolean;
  sort_order: number;
};

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setBusy(id);
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const admin = createAdminClient();
    await admin.from("testimonials").delete().eq("id", id);
    router.refresh();
    setBusy(null);
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Content</p>
          <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Testimonials</h1>
        </div>
        <Button onClick={() => setCreating(true)} className="min-h-11">
          <Plus className="h-4 w-4" aria-hidden /> New
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-lg border border-border/60 bg-muted/20 p-8 text-center">
          <p className="font-serifdisplay text-lg font-bold">No testimonials yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Approved reviews from the moderation queue appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {testimonials.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background p-4">
              <div className="min-w-0">
                <p className="truncate font-bold">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-mono text-xs text-muted-foreground">{t.author} · {t.source ?? "direct"}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(t)}>
                  <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
                </Button>
                <Button variant="destructive" size="sm" disabled={busy === t.id} onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <TestimonialForm
          initial={editing}
          onDone={() => { setCreating(false); setEditing(null); router.refresh(); }}
        />
      )}
    </div>
  );
}

function TestimonialForm({ initial, onDone }: { initial: Testimonial | null; onDone: () => void }) {
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const admin = createAdminClient();
    if (initial) {
      await admin.from("testimonials").update({ quote, author, role: role || null }).eq("id", initial.id);
    } else {
      await admin.from("testimonials").insert({ quote, author, role: role || null, verified: true, source: "admin" } as never);
    }
    onDone();
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-lg border border-border/60 bg-background p-6">
        <h2 className="font-serifdisplay text-xl font-bold">{initial ? "Edit" : "New"} testimonial</h2>
        <div className="space-y-1.5">
          <Label>Quote</Label>
          <Textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Author name</Label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Role (optional)</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="CEO, Acme Corp" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={busy} className="min-h-11">{busy ? "Saving..." : "Save"}</Button>
          <Button type="button" variant="outline" onClick={onDone}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
