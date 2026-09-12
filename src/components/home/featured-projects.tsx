"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLocale } from "@/components/site/locale-toggles";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DbProject } from "@/lib/data/projects";

export function FeaturedProjects({ projects }: { projects: DbProject[] }) {
  const { t } = useLocale();
  const [active, setActive] = useState<DbProject | null>(null);

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">03 · {t("projects")}</p>
            <h2 className="font-serifdisplay text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight tracking-tight">{t("work")}</h2>
          </div>
          <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}>
            {t("explore")} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="group w-[230px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-border/60 bg-background text-left transition-all duration-base ease-soft hover:-translate-y-1 hover:shadow-lift sm:w-[270px]"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 via-muted/30 to-background">
                {p.preview_url ? (
                  <img src={p.preview_url} alt={`${p.name} preview`} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <span className="font-serifdisplay text-5xl font-bold text-primary/25">{p.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.category}</span>
                <h3 className="font-serifdisplay text-base font-bold tracking-tight">{p.name}</h3>
              </div>
            </button>
          ))}
          <Link
            href="/projects"
            className="flex w-[150px] flex-shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 text-muted-foreground transition-colors duration-base ease-soft hover:border-primary/50 hover:text-foreground"
          >
            <span className="font-serifdisplay text-lg font-bold">View all</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-2 sm:hidden">
          <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
            {t("explore")} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-lg overflow-hidden p-0">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.name}</DialogTitle>
              <div className="relative aspect-video bg-muted/30">
                {active.preview_url ? (
                  <img src={active.preview_url} alt={`${active.name} preview`} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <span className="font-serifdisplay text-6xl font-bold text-primary/25">{active.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{active.category} · {active.year}</p>
                  <h2 className="font-serifdisplay text-xl font-bold tracking-tight">{active.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{active.summary}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link href={`/projects/${active.slug}`} onClick={() => setActive(null)} className={cn(buttonVariants({ size: "sm" }))}>
                    View case study
                  </Link>
                  {active.live_url && (
                    <a href={active.live_url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
                      Live demo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
