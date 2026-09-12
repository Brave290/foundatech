import { createClient } from "@/lib/supabase/server";

export type DbProject = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  summary: string | null;
  tags: string[];
  year: number | null;
  featured: boolean;
  preview_url: string | null;
  live_url: string | null;
  challenge: string | null;
  approach: string | null;
  outcome: string | null;
  highlights: string[];
  published: boolean;
  sort_order: number | null;
};

export async function getPublishedProjects(): Promise<DbProject[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(7);
  return (data ?? []) as DbProject[];
}

export async function getProjectBySlug(slug: string): Promise<DbProject | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as DbProject) ?? null;
}
