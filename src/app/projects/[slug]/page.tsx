import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/lib/data/projects";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const admin = createAdminClient();
  const { data } = await admin.from("projects").select("slug").eq("published", true);
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Link href="/projects" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to projects
        </Link>
        <div className="mb-10 overflow-hidden rounded-lg border border-border/60">
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/10 via-muted/30 to-background">
            {project.preview_url ? (
              <img src={project.preview_url!} alt={`${project.name} preview`} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="font-serifdisplay text-7xl font-bold text-primary/30 sm:text-9xl">{project.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">{project.category} · {project.year}</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">{project.name}</h1>
        <p className="mb-10 text-lg text-muted-foreground">{project.summary}</p>
        <div className="mb-10 grid gap-8 md:grid-cols-3">
          {project.challenge && (
            <div>
              <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-primary">Challenge</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.challenge}</p>
            </div>
          )}
          {project.approach && (
            <div>
              <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-primary">Approach</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.approach}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-primary">Outcome</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.outcome}</p>
            </div>
          )}
        </div>
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-10 rounded-lg border border-border/60 bg-muted/20 p-6">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Highlights</h2>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-10 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "min-h-12")}>
            View live demo <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}