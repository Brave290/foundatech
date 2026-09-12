import { HeroCopy } from "@/components/home/hero-copy";
import { StartCta, WorkCta } from "@/components/home/hero-ctas";

/** Dark stage + amber glows. Optional video via NEXT_PUBLIC_HERO_VIDEO. Copy is client-rendered + translated. */
export function HeroCanvas({ videoSrc }: { videoSrc?: string }) {
  return (
    <section className="relative overflow-hidden">
      {videoSrc && (
        <video src={videoSrc} autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      )}
      <div aria-hidden="true" className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative grid min-h-[88svh] place-items-center py-20 text-center sm:py-24">
        <div className="max-w-3xl space-y-6">
          <HeroCopy />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <StartCta />
            <WorkCta />
          </div>
        </div>
      </div>
    </section>
  );
}
