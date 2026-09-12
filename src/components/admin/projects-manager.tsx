"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { DeleteProjectButton } from "@/components/admin/projects/delete-button";
import type { DbProject } from "@/lib/data/projects";

export function ProjectsManager({ projects }: { projects: DbProject[] }) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<DbProject | null>(null);

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Content</p>
          <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Projects</h1>
        </div>
        <Button onClick={() => setCreating(true)} className="min-h-11">
          <Plus className="h-4 w-4" aria-hidden /> New
        </Button>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background p-4">
            <div className="min-w-0">
              <p className="truncate font-serifdisplay text-lg font-bold">{p.name}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">/{p.slug} · {p.category}</p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              {p.featured && <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary sm:inline">Featured</span>}
              {!p.published && <span className="hidden rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">Draft</span>}
              <Button variant="outline" size="sm" onClick={() => setEditing(p)}>
                <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
              </Button>
              <DeleteProjectButton id={p.id} />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogTitle className="font-serifdisplay text-xl font-bold">New project</DialogTitle>
          <ProjectForm onDone={() => setCreating(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogTitle className="font-serifdisplay text-xl font-bold">Edit {editing?.name}</DialogTitle>
          {editing && <ProjectForm initial={editing as never} onDone={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
