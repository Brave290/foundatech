import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let dbStatus = "connected";
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await supabase.from("settings").select("key").limit(1);
  } catch {
    dbStatus = "error";
  }

  return NextResponse.json(
    { ok: true, ts: Date.now(), db: dbStatus },
    { headers: { "Cache-Control": "no-store" } }
  );
}
