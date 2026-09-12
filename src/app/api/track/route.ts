import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (/bot|crawl|spider|slurp|curl|wget|headless|preview/i.test(ua)) {
      return new NextResponse(null, { status: 204 });
    }
    const body = await req.json().catch(() => null);
    if (!body?.path || !body?.session) return new NextResponse(null, { status: 204 });
    const admin = createAdminClient();
    await admin.from("page_views").insert({
      path: String(body.path).slice(0, 300),
      referrer: String(body.referrer ?? "").slice(0, 500),
      device: body.device === "mobile" ? "mobile" : "desktop",
      session_id: String(body.session).slice(0, 64),
      ua: ua.slice(0, 300),
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
