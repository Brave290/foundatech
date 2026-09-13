"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DbProject } from "@/lib/data/projects";

interface CompareClientProps {
  projects: DbProject[];
}

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: DbProject[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((p) => p.slug === value);

  return (
    <div className="relative">
      <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full min-w-[200px] items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/50"
      >
        <span className="truncate font-medium">{selected?.name ?? "Select project"}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-border/60 bg-background shadow-lg">
            <div className="max-h-60 overflow-y-auto p-1">
              {options.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    onChange(p.slug);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent/50",
                    p.slug === value && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="truncate">{p.name}</span>
                  {p.slug === value && (
                    <Check className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CompareClient({ projects }: CompareClientProps) {
  const [selected, setSelected] = useState<string[]>(
    projects.slice(0, Math.min(3, projects.length)).map((p) => p.slug)
  );

  const selectedProjects = selected
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as DbProject[];

  const updateSelection = (index: number, slug: string) => {
    const next = [...selected];
    next[index] = slug;
    setSelected(next);
  };

  const addColumn = () => {
    const used = new Set(selected);
    const available = projects.find((p) => !used.has(p.slug));
    if (available && selected.length < 3) {
      setSelected([...selected, available.slug]);
    }
  };

  const removeColumn = (index: number) => {
    if (selected.length > 2) {
      setSelected(selected.filter((_, i) => i !== index));
    }
  };

  if (projects.length === 0) {
    return (
      <div className="container py-20 sm:py-28">
        <div className="mx-auto max-w-xl rounded-lg border border-border/60 bg-muted/20 p-8 text-center">
          <p className="font-serifdisplay text-lg font-bold">No projects yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check back soon — we&apos;re adding projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to projects
        </Link>

        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">
          Compare
        </p>
        <h1 className="mb-4 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          Compare projects
        </h1>
        <p className="mb-10 text-muted-foreground">
          Select 2–3 projects to view them side by side.
        </p>

        <div className="mb-10 flex flex-wrap items-end gap-4">
          {selected.map((slug, i) => (
            <div key={i} className="flex items-end gap-2">
              <Dropdown
                label={`Project ${i + 1}`}
                options={projects}
                value={slug}
                onChange={(s) => updateSelection(i, s)}
              />
              {selected.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mb-0.5 h-10 w-10"
                  onClick={() => removeColumn(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          {selected.length < 3 && projects.length > selected.length && (
            <Button variant="outline" size="sm" className="mb-0.5" onClick={addColumn}>
              + Add project
            </Button>
          )}
        </div>

        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div
            className={cn(
              "grid min-w-[640px] gap-4",
              selectedProjects.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            )}
          >
            {selectedProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col overflow-hidden">
                <CardHeader>
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {project.category}
                  </p>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <p className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5">
                  {project.summary && (
                    <div>
                      <h3 className="mb-1 font-display text-xs font-bold uppercase tracking-wider text-primary">
                        Summary
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>
                  )}

                  {project.tags.length > 0 && (
                    <div>
                      <h3 className="mb-1.5 font-display text-xs font-bold uppercase tracking-wider text-primary">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-primary">
                        Highlights
                      </h3>
                      <ul className="space-y-1.5">
                        {project.highlights.slice(0, 5).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary"
                              aria-hidden
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      View case study <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
