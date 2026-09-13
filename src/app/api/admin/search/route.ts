import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type SearchBody = {
  query: string;
  tables: string[];
};

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
};

const TABLE_CONFIG: Record<
  string,
  { columns: string[]; titleCol: string; subtitleCol: string; basePath: string }
> = {
  projects: {
    columns: ["name", "slug"],
    titleCol: "name",
    subtitleCol: "slug",
    basePath: "/admin/projects",
  },
  contact_submissions: {
    columns: ["name", "email", "message"],
    titleCol: "name",
    subtitleCol: "email",
    basePath: "/admin/leads",
  },
  reviews: {
    columns: ["name", "message"],
    titleCol: "name",
    subtitleCol: "message",
    basePath: "/admin/reviews",
  },
  subscribers: {
    columns: ["email"],
    titleCol: "email",
    subtitleCol: "email",
    basePath: "/admin/leads",
  },
};

export async function POST(request: Request) {
  const body: SearchBody = await request.json();

  if (!body.query || !body.query.trim()) {
    return NextResponse.json(
      { error: "Query must not be empty" },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  const results: Record<string, SearchItem[]> = {};

  for (const table of body.tables) {
    const config = TABLE_CONFIG[table];
    if (!config) continue;

    const orFilters = config.columns
      .map((col) => `${col}.ilike.%${body.query}%`)
      .join(",");

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .or(orFilters)
      .limit(20);

    if (error || !data) continue;

    results[table] = data.map((row: Record<string, unknown>) => ({
      id: String(row.id ?? ""),
      title: String(row[config.titleCol] ?? ""),
      subtitle: String(row[config.subtitleCol] ?? ""),
      link: config.basePath,
    }));
  }

  return NextResponse.json({ results });
}
