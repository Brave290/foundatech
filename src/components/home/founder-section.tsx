import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function FounderSection() {
  let founder: { name: string; role: string; bio: string | null; photo_url: string | null; tags: string[] | null } | null = null;
  try {
    const admin = createAdminClient();
    const { data } = await admin.from("founder").select("name, role, bio, photo_url, tags").maybeSingle();
    founder = data;
  } catch {}

  const name = founder?.name ?? "Mus'ab";
  const role = founder?.role ?? "Founder & Lead Engineer";
  const bio = founder?.bio ?? "Designer-turned-engineer building Founda Technologies from Lagos. Obsessed with craft, clarity, and shipping technology that solves real problems for African businesses and beyond.";
  const tags = founder?.tags ?? ["Brand Identity", "UI/UX Design", "Next.js", "Supabase", "Prompt Engineering", "Mentorship"];
  const photoUrl = founder?.photo_url;
  const initials = name.charAt(0).toUpperCase();

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">The mind behind Founda</p>
        <h2 className="mb-10 font-serifdisplay text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight tracking-tight">Meet the founder</h2>

        <div className="grid gap-8 overflow-hidden rounded-lg border border-border/60 bg-muted/20 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/10 via-muted/30 to-background md:aspect-auto">
            {photoUrl ? (
              <img src={photoUrl} alt={`${name} — ${role}`} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="font-serifdisplay text-8xl font-bold text-primary/30">{initials}</span>
              </div>
            )}
          </div>
          <div className="p-8 sm:p-10">
            <h3 className="font-serifdisplay text-2xl font-bold tracking-tight">{name}</h3>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{role}</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              At Founda, we don&apos;t just deliver projects — we teach, document and hand over everything, so your team grows with the product.
            </p>
            <div className="mb-6 flex flex-wrap gap-1.5">
              {tags.map((t: string) => (
                <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>
              ))}
            </div>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline" }))}>
              More about us <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
