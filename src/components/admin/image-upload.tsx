"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function ImageUpload({
  bucket,
  path,
  currentUrl,
  onUploaded,
}: {
  bucket: "previews" | "team";
  path: string;
  currentUrl?: string;
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  async function handleFile(file: File) {
    setBusy(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      const res = await uploadImage({ bucket, path, dataUrl, contentType: file.type });
      if ("url" in res) onUploaded(res.url);
      else alert(res.error);
      setBusy(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      {preview && (
        <div className="relative aspect-video overflow-hidden rounded-md border border-border/60 bg-muted/20">
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUploaded(""); }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 hover:bg-background"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border/60 bg-muted/20 px-4 py-3 text-sm hover:bg-accent/40">
        <Upload className="h-4 w-4" aria-hidden />
        <span>{busy ? "Uploading..." : preview ? "Replace image" : "Choose image"}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}
