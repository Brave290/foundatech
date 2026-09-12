/** Single source of truth. Contacts + socials from ENV so any operator changes them without touching code. */
export const siteConfig = {
  name: "Founda Technologies",
  shortName: "Founda",
  nameExpansion: "Foundation of Digital Africa",
  tagline: "Building technology that solves real problems.",
  description:
    "Founda is a technology company building digital solutions, products, and infrastructure to solve real problems and accelerate Africa's digital future — especially Nigeria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://foundatech.name.ng",
  email: "hello@foundatech.name.ng",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "",
  city: "Lagos, Nigeria",
  credit: "Built by Brave Hx Technology, a subsidiary of Founda Technologies",
  socials: [
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB && { key: "github", label: "GitHub", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB },
    process.env.NEXT_PUBLIC_SOCIAL_X && { key: "x", label: "X", url: process.env.NEXT_PUBLIC_SOCIAL_X },
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN && { key: "linkedin", label: "LinkedIn", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN },
    process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM && { key: "telegram", label: "Telegram", url: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM },
  ].filter(Boolean) as { key: string; label: string; url: string }[],
};
export type SiteConfig = typeof siteConfig;
