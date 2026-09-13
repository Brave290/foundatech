import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("settings").select("id").limit(1).maybeSingle();

  return NextResponse.json(
    { ok: true, ts: Date.now(), db: error ? "error" : "connected" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
