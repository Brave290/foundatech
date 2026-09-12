import Link from "next/link";
import { FoundaLogo } from "@/components/brand/founda-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUICK = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-background">
      <div className="flex min-h-full flex-col">
        <header className="container flex h-16 items-center">
          <Link href="/" aria-label="Founda Technologies home">
            <FoundaLogo variant="full" />
          </Link>
        </header>
        <main className="grid flex-1 place-items-center px-6 py-16 text-center">
          <div className="max-w-lg space-y-6">
            <p className="font-mono text-6xl font-bold tracking-tight text-primary/40 sm:text-8xl">404</p>
            <h1 className="font-serifdisplay text-3xl font-bold tracking-tight sm:text-4xl">This page took a leave of absence.</h1>
            <p className="text-muted-foreground">The link may be old or mistyped. Let's get you back to solid ground.</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK.map((q) => (
                <Link key={q.href} href={q.href} className={cn(buttonVariants({ variant: q.href === "/" ? "default" : "outline", size: "sm" }))}>
                  {q.label}
                </Link>
              ))}
            </div>
          </div>
        </main>
        <footer className="container pb-8">
          <p className="font-mono text-[11px] text-muted-foreground">&copy; {new Date().getFullYear()} Founda Technologies</p>
        </footer>
      </div>
    </div>
  );
}