import { createAdminClient } from "@/lib/supabase/admin";

export type RagChunk = {
  source: string;
  title: string;
  content: string;
};

function sanitizeSearch(input: string): string {
  return input.replace(/[^\w\s]/g, " ").replace(/%/g, "").replace(/_/g, " ").trim().slice(0, 200);
}

export async function retrieveContext(query: string, limit = 5): Promise<RagChunk[]> {
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
    .limit(20);

  const chunks: RagChunk[] = [];

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
