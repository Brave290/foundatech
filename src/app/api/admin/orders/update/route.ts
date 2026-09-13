import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["pending", "delivered", "failed"] as const;

export async function POST(request: Request) {
  const body = await request.json();
  const { orderId, status } = body as { orderId?: string; status?: string };

  if (!orderId || !status) {
    return NextResponse.json({ ok: false, error: "orderId and status are required" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
    return NextResponse.json({ ok: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
  }

  const admin = createAdminClient();

  const { error } = await admin
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
