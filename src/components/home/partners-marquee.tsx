import { partners } from "@/config/partners";

/** Quiet-luxury strip: italic serif, muted ink, wide air — the reference-image voice. Pauses on hover. */
export function PartnersMarquee() {
  const loop = [...partners, ...partners];
  return (
    <section aria-label="Partners we have built with" className="marquee overflow-hidden py-8">
      <div className="marquee-track flex w-max items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
        {loop.map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            className="whitespace-nowrap font-serif text-xl italic font-medium text-foreground/50 sm:text-2xl"
          >
            {p.name}
          </span>
        ))}
      </div>
    </section>
  );
}
