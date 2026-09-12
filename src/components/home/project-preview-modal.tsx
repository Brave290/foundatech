"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import type { ProjectSeed } from "@/config/content";
import { cn } from "@/lib/utils";

export function ProjectPreviewModal({ project, hasPreview, open, onOpenChange }: {
  project: ProjectSeed | null; hasPreview: boolean; open: boolean; onOpenChange: (v: boolean) => void;
}) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <DialogTitle className="sr-only">{project.name} preview</DialogTitle>
        <div className="flex items-center gap-2 rounded-t-lg border-b border-border/60 bg-muted/40 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 truncate rounded-full bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground">
            {project.previewUrl ?? `foundatech.name.ng/projects/${project.slug}`}
          </span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 via-muted/30 to-background">
          {hasPreview ? (
            <img src={`/previews/${project.slug}.webp`} alt={`${project.name} preview`} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <span className="font-serifdisplay text-6xl font-bold text-primary/30 sm:text-8xl">{project.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="space-y-4 p-6">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{project.category}</p>
            <h2 className="font-serifdisplay text-2xl font-bold tracking-tight">{project.name}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/projects/${project.slug}`} onClick={() => onOpenChange(false)} className={cn(buttonVariants())}>
              View case study
            </Link>
            {project.previewUrl && (
              <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }))}>
                View live demo <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}