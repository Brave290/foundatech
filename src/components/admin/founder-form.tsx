"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveFounder } from "@/lib/admin/actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { initial: Record<string, unknown> | null };

export function FounderForm({ initial }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: (initial?.name as string) ?? "",
    role: (initial?.role as string) ?? "",
    bio: (initial?.bio as string) ?? "",
    photo_url: (initial?.photo_url as string) ?? "",
    twitter: (initial?.twitter as string) ?? "",
    linkedin: (initial?.linkedin as string) ?? "",
    github: (initial?.github as string) ?? "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await saveFounder(form);
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Content</p>
        <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Founder Profile</h1>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Mus'ab" />
          </div>
          <div className="space-y-1.5">
            <Label>Role / title</Label>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Founder & CEO" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Bio</Label>
          <Textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell the world about the founder..." />
        </div>

        <div className="space-y-1.5">
          <Label>Photo</Label>
          <ImageUpload
            bucket="team"
            path="founder.webp"
            currentUrl={form.photo_url}
            onUploaded={(url) => setForm({ ...form, photo_url: url })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Twitter / X</Label>
            <Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/..." />
          </div>
          <div className="space-y-1.5">
            <Label>LinkedIn</Label>
            <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="space-y-1.5">
            <Label>GitHub</Label>
            <Input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={busy} className="min-h-11">{busy ? "Saving..." : "Save profile"}</Button>
      </form>
    </div>
  );
}
