import { HeroCanvas } from "@/components/home/hero-canvas";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { ServicesSection } from "@/components/home/services-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ProcessSection } from "@/components/home/process-section";
import { FounderSection } from "@/components/home/founder-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { FoundieTeaser } from "@/components/home/foundie-teaser";
import { Reveal } from "@/components/site/reveal";
import { getPublishedProjects } from "@/lib/data/projects";
import JsonLd from "@/components/seo/json-ld";

export default async function HomePage() {
  const projects = await getPublishedProjects();
  return (
    <>
      <JsonLd type="Organization" data={{
        name: "Founda Technologies",
        url: "https://foundatech.name.ng",
        logo: "https://foundatech.name.ng/logo.webp",
        description: "Custom websites, software, and digital products built by Founda Technologies.",
        telephone: "+2349017977963",
        email: "hello@foundatech.name.ng",
        sameAs: [
          "https://github.com/brave290",
          "https://x.com/bravehx",
        ],
      }} />
      <JsonLd type="WebSite" data={{
        name: "Founda Technologies",
        url: "https://foundatech.name.ng",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://foundatech.name.ng/projects?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }} />
      <HeroCanvas videoSrc={process.env.NEXT_PUBLIC_HERO_VIDEO} />
      <Reveal><PartnersMarquee /></Reveal>
      <Reveal><ServicesSection /></Reveal>
      <Reveal><ProcessSection /></Reveal>
      <Reveal><FeaturedProjects projects={projects} /></Reveal>
      <Reveal><FounderSection /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><PricingSection /></Reveal>
      <Reveal><FaqSection /></Reveal>
      <Reveal><FinalCta /></Reveal>
      <FoundieTeaser />
    </>
  );
}
