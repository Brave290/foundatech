import { serviceSeeds } from "@/config/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, custom software, UI/UX design and creative solutions from Founda Technologies.",
};

export default function ServicesPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">Services</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          What we build
        </h1>
        <p className="text-muted-foreground">
          Four disciplines, one standard: careful craft, real results.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        {serviceSeeds.map((s, i) => (
          <article key={s.title} className="rounded-lg border border-border/60 bg-background p-8">
            <div className="mb-3 flex items-baseline gap-4">
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h2 className="font-serifdisplay text-2xl font-bold tracking-tight">{s.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{s.blurb}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
