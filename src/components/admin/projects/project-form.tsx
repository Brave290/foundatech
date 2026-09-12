"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProject } from "@/lib/admin/actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectSeed } from "@/config/content";

type Props = {
  initial?: ProjectSeed & { id?: string; preview_url?: string; live_url?: string; published?: boolean };
};

export function ProjectForm({ initial, onDone }: Props & { onDone?: () => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    category: initial?.category ?? "",
    summary: initial?.summary ?? "",
    year: initial?.year ?? new Date().getFullYear(),
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
    live_url: initial?.live_url ?? "",
    preview_url: initial?.preview_url ?? "",
    challenge: initial?.challenge ?? "",
    approach: initial?.approach ?? "",
    outcome: initial?.outcome ?? "",
    tags: (initial?.tags ?? []).join(", "),
    highlights: (initial?.highlights ?? []).join(", "),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        highlights: form.highlights.split(",").map((t) => t.trim()).filter(Boolean),
      };
      await saveProject(payload as never, initial?.id);
      if (onDone) onDone();
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required placeholder="botshield" />
        </div>
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="BotShield" />
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Security · SaaS" />
        </div>
        <div className="space-y-1.5">
          <Label>Year</Label>
          <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Summary</Label>
        <Textarea rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Tags (comma separated)</Label>
          <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Next.js, Supabase" />
        </div>
        <div className="space-y-1.5">
          <Label>Live URL</Label>
          <Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} placeholder="https://..." />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Preview image</Label>
        <ImageUpload
          bucket="previews"
          path={`${form.slug || "untitled"}.webp`}
          currentUrl={form.preview_url}
          onUploaded={async (url) => {
            setForm({ ...form, preview_url: url });
            if (initial?.id) {
              await saveProject({ preview_url: url } as never, initial.id);
              router.refresh();
            }
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Challenge</Label>
          <Textarea rows={3} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Approach</Label>
          <Textarea rows={3} value={form.approach} onChange={(e) => setForm({ ...form, approach: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Outcome</Label>
          <Textarea rows={3} value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Highlights (comma separated)</Label>
        <Input value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy} className="min-h-11">{busy ? "Saving..." : initial ? "Save changes" : "Create project"}</Button>
        <Button type="button" variant="outline" onClick={() => (onDone ? onDone() : router.push("/admin/projects"))}>Cancel</Button>
      </div>
    </form>
  );
}
