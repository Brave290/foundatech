import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Tiny uptime endpoint. StatusDot + future cron-job.org monitor both ping this. */
export async function GET() {
  return NextResponse.json(
    { ok: true, service: "foundatech", ts: Date.now() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
