export type ServiceSeed = { title: string; blurb: string };

export type ProjectSeed = {
  slug: string; name: string; category: string; summary: string; tags: string[];
  year: number; featured: boolean; previewUrl?: string;
  challenge?: string; approach?: string; outcome?: string; highlights?: string[];
};

export const serviceSeeds: ServiceSeed[] = [
  { title: "Web Development", blurb: "Fast, secure marketing sites and web apps built on Next.js and Supabase." },
  { title: "Custom Software", blurb: "Dashboards, portals and automation that remove manual work from your business." },
  { title: "UI/UX Design", blurb: "Figma-first design systems that feel premium and convert visitors into customers." },
  { title: "Creative Solutions", blurb: "Brand identity, motion and content that make your product look as good as it works." },
];

export type FaqSeed = { q: string; a: string };
export const faqSeeds: FaqSeed[] = [
  { q: "How fast can you start my project?", a: "After your brief and payment, most projects kick off within 48 hours. You get a delivery timeline in writing." },
  { q: "What does a typical project cost?", a: "Indicative tiers are on the pricing page. Every project is quoted in writing before you pay, and the quote is fixed unless scope changes." },
  { q: "Do I own everything you build?", a: "Yes. Code, design files and accounts hand over to you at launch. No lock-in, no hostage repos." },
  { q: "What happens after launch?", a: "We fix bugs free for 30 days and stay reachable after that. Maintenance plans are optional, never forced." },
];

export type PricingSeed = { tier: string; tagline: string; fromUsd: number };
export const pricingSeeds: PricingSeed[] = [
  { tier: "Starter", tagline: "Marketing site or landing page", fromUsd: 450 },
  { tier: "Business", tagline: "Full website + admin dashboard", fromUsd: 1200 },
  { tier: "Platform", tagline: "Custom product end-to-end", fromUsd: 3500 },
];

export const currencyRates: Record<string, number> = { USD: 1, NGN: 1550, GBP: 0.79, CNY: 7.2, CAD: 1.36 };
