import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface VersionBody {
  table: string;
  id: string;
  data: Record<string, unknown>;
}

export async function POST(request: Request) {
  const body: VersionBody = await request.json();

  if (!body.table || !body.id || !body.data) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("content_versions").insert({
    table_name: body.table,
    record_id: body.id,
    content_json: body.data,
    edited_by: "admin",
    created_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get("table");
  const id = searchParams.get("id");

  if (!table || !id) {
    return NextResponse.json({ error: "Missing table or id param" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("content_versions")
    .select("*")
    .eq("table_name", table)
    .eq("record_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ versions: data });
}
