import { cn } from "@/lib/utils";

/**
 * Logo strategy: when Mus'ab drops public/logo.webp (his real brand file),
 * we render it pixel-perfect. Until then, the hand-traced SVG stands in.
 * Server decides once per render — zero client cost.
 */
export function FoundaLogo({
  variant = "full",
  src,
  className,
}: {
  variant?: "mark" | "full";
  src?: string;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {src ? (
        <img src={src} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
      ) : (
        <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="founda-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path d="M14 34 L20 14 H34 L31 20 H25 L23 26 H32 L29 32 H18" fill="url(#founda-amber)" />
          <path d="M10 38 Q 24 42 38 38" stroke="url(#founda-amber)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {variant === "full" && (
        <span className="flex flex-col leading-none max-[360px]:hidden">
          <span className="font-display text-lg font-bold tracking-tight">Founda</span>
          <span className="logo-sub font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Technologies</span>
        </span>
      )}
    </span>
  );
}
