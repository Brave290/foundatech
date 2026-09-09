/** Single source of truth for brand facts. Admin settings (DB) will override these in Wave 3. */
export const siteConfig = {
  name: "Founda Technologies",
  shortName: "Founda",
  nameExpansion: "Foundation Of Useful Digital Solutions",
  tagline: "Building technology that solves real problems.",
  description:
    "Founda Technologies builds websites, software and digital products that solve real problems for African and international businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://foundatech.name.ng",
  email: "hello@foundatech.name.ng",   // TODO: confirm with Mus'ab
  whatsapp: "",                          // TODO: add real number
  city: "Lagos, Nigeria",                // TODO: confirm city
  credit: "Built by Brave Hx Technology, a subsidiary of Founda Technologies",
  socials: [] as { label: string; url: string }[], // admin-fed later; footer hides empty ones (no fake icons)
};
export type SiteConfig = typeof siteConfig;
