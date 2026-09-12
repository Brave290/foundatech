import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return NextResponse.json({ ok: false, error: "Configuration incomplete" }, { status: 500 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").select("id").limit(1);
    if (error) {
      return NextResponse.json({ ok: false, error: "Database connection failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, message: "Connected" });
  } catch {
    return NextResponse.json({ ok: false, error: "Connection failed" }, { status: 500 });
  }
}
