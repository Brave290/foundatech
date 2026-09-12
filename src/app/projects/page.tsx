import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProjects } from "@/lib/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Real projects built by Founda Technologies — websites, software, and digital products.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">Projects</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          Real work, real results
        </h1>
        <p className="text-muted-foreground">
          Every project here shipped with real clients, real users, and real outcomes.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-lg border border-border/60 bg-muted/20 p-8 text-center">
          <p className="font-serifdisplay text-lg font-bold">Projects coming soon</p>
          <p className="mt-1 text-sm text-muted-foreground">We&apos;re showcasing our work here. Check back soon.</p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-primary/5 via-muted/30 to-background p-8 transition-all duration-base ease-soft hover:-translate-y-1 hover:shadow-lift sm:p-10"
            >
              {p.preview_url && (
                <img src={p.preview_url} alt={`${p.name} preview`} className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity group-hover:opacity-30" />
              )}
              <span className="relative z-10 absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] text-primary sm:right-8 sm:top-8">
                {p.year}
              </span>
              <p className="relative z-10 mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{p.category}</p>
              <h2 className="relative z-10 mb-3 font-serifdisplay text-2xl font-bold tracking-tight sm:text-3xl">{p.name}</h2>
              <p className="relative z-10 text-sm text-muted-foreground">{p.summary}</p>
              <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-base ease-soft group-hover:scale-110 sm:bottom-8 sm:right-8">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
