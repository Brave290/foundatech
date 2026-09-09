import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

/** Placeholder hero — proves tokens, fonts, theme toggle work. Real hero ships in Wave 2. */
export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <header className="container flex items-center justify-between py-4">
        <span className="font-display text-lg font-bold">{siteConfig.shortName}</span>
        <ThemeToggle />
      </header>
      <section className="container grid min-h-[80vh] place-items-center pb-24 text-center">
        <div className="max-w-2xl space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{siteConfig.nameExpansion}</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{siteConfig.tagline}</h1>
          <p className="text-lg text-muted-foreground">Wave 1 is alive: tokens, fonts, themes and SEO foundations are in place. The real homepage lands next.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="min-h-11">
              <Link href="/contact">Start a project <ArrowRight className="ml-2 h-4 w-4" aria-hidden /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link href="/projects"><FolderOpen className="mr-2 h-4 w-4" aria-hidden /> See our work</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
