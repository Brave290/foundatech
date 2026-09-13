import { createAdminClient } from "@/lib/supabase/admin";

export type RagChunk = {
  source: string;
  title: string;
  content: string;
};

function sanitizeSearch(input: string): string {
  return input.replace(/[^\w\s]/g, " ").replace(/%/g, "").replace(/_/g, " ").trim().slice(0, 200);
}

export async function retrieveContext(query: string, limit = 8): Promise<RagChunk[]> {
  const admin = createAdminClient();
  const searchQuery = sanitizeSearch(query);
  if (!searchQuery) return [];

  const { data: projects } = await admin
    .from("projects")
    .select("name, category, summary, challenge, approach, outcome, highlights, tags")
    .eq("published", true)
    .or(`name.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
    .limit(3);

  const { data: settings } = await admin
    .from("settings")
    .select("key, value")
    .limit(30);

  const { data: founder } = await admin
    .from("founder")
    .select("name, role, bio")
    .maybeSingle();

  const chunks: RagChunk[] = [];

  // Founder info
  if (founder) {
    chunks.push({
      source: "founder",
      title: "Founder",
      content: [
        founder.name && `Name: ${founder.name}`,
        founder.role && `Role: ${founder.role}`,
        founder.bio && `Bio: ${founder.bio}`,
      ].filter(Boolean).join(". "),
    });
  }

  // Platform info (always included)
  chunks.push({
    source: "platform",
    title: "Founda Technologies Overview",
    content: `Founda Technologies is a technology company based in Lagos, Nigeria, founded by Mus'ab. We build custom websites, software, mobile apps, and digital products for businesses across Africa. Our tagline is "Foundation of Digital Africa". We specialize in web development, custom software, UI/UX design, mobile apps, and creative digital solutions. We serve startups, SMEs, and enterprises. Our process has 4 phases: Discovery, Design, Build, Launch. We use modern tech stacks including React, Next.js, Node.js, Python, Supabase, PostgreSQL, and cloud deployment via Vercel and AWS.`,
  });

  // Pricing info (always included)
  chunks.push({
    source: "pricing",
    title: "Pricing Tiers",
    content: `Founda Technologies offers 3 pricing tiers: Starter (₦250,000 or $300) for landing pages and MVPs with up to 5 pages, basic SEO, 1 revision round, delivered in 1-2 weeks. Growth (₦750,000 or $900) for full web apps and custom dashboards with up to 15 pages, advanced features, database integration, 3 revision rounds, delivered in 2-4 weeks. Enterprise (Custom pricing) for complex systems, mobile apps, AI integration, dedicated team, SLA, unlimited revisions, delivered in 4-8 weeks. All tiers include hosting setup, domain configuration, and deployment. Payment is via Paystack (cards, bank transfer, USSD). We accept NGN, USD, GBP, CNY, CAD.`,
  });

  // Services (always included)
  chunks.push({
    source: "services",
    title: "Services",
    content: `Founda Technologies offers: Web Development (custom websites, e-commerce, landing pages), Software Development (custom business tools, dashboards, APIs), Mobile App Development (iOS, Android, cross-platform), UI/UX Design (user research, wireframes, prototypes, design systems), Creative Solutions (brand identity, graphics, motion design), Cloud & DevOps (hosting, CI/CD, scaling), AI Integration (chatbots, automation, data analysis). We work with startups, SMEs, and enterprises across Nigeria and Africa.`,
  });

  // Contact info
  chunks.push({
    source: "contact",
    title: "Contact Information",
    content: `Contact Founda Technologies: Phone: 09017977963, WhatsApp: 09151186880, Email: hello@foundatech.name.ng, Website: foundatech.name.ng. Based in Lagos, Nigeria. For inquiries, use the contact form on the website or call directly.`,
  });

  // Social links
  chunks.push({
    source: "social",
    title: "Social Media",
    content: `Follow Founda Technologies: GitHub: github.com/brave290, X (Twitter): @bravehx, Telegram: @bravehx.`,
  });

  if (projects) {
    for (const p of projects) {
      chunks.push({
        source: "project",
        title: p.name,
        content: [
          p.category && `Category: ${p.category}`,
          p.summary,
          p.challenge && `Challenge: ${p.challenge}`,
          p.approach && `Approach: ${p.approach}`,
          p.outcome && `Outcome: ${p.outcome}`,
          p.highlights?.length && `Highlights: ${p.highlights.join(", ")}`,
          p.tags?.length && `Technologies: ${p.tags.join(", ")}`,
        ].filter(Boolean).join(". "),
      });
    }
  }

  const siteSettings = settings?.reduce<Record<string, string>>((acc, s) => {
    acc[s.key] = typeof s.value === "string" ? s.value : JSON.stringify(s.value);
    return acc;
  }, {}) ?? {};

  if (siteSettings.site_description) {
    chunks.push({ source: "site", title: "About Founda", content: `Founda Technologies: ${siteSettings.site_description}` });
  }

  if (chunks.length === 0) {
    chunks.push({
      source: "fallback",
      title: "Founda Technologies",
      content: "Founda Technologies builds digital experiences, software, websites and creative solutions. We are a Lagos-based startup focused on African businesses. Services include web development, custom software, UI/UX design, and creative solutions.",
    });
  }

  return chunks.slice(0, limit);
}
