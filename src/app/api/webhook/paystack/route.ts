import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyPayment } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase/admin";

function verifySignature(req: NextRequest, body: string): boolean {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("PAYSTACK_WEBHOOK_SECRET not set — webhook verification skipped");
    return false;
  }
  const signature = req.headers.get("x-paystack-signature");
  if (!signature) return false;
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  return hash === signature;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  if (!verifySignature(req, rawBody)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody);
    if (event.event !== "charge.success") {
      return NextResponse.json({ ok: true });
    }

    const reference = event.data?.reference;
    if (!reference) return NextResponse.json({ ok: true });

    const { verified, data } = await verifyPayment(reference);
    if (!verified || !data) return NextResponse.json({ error: "Verification failed" }, { status: 400 });

    const admin = createAdminClient();
    const { data: order } = await admin.from("orders").select("*").eq("reference", reference).maybeSingle();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const { error } = await admin.from("orders").update({
      status: "paid",
      paid_at: new Date().toISOString(),
    } as never).eq("reference", reference);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { sendDeliveryAccess } = await import("@/lib/email");
    await sendDeliveryAccess(order.customer_name, order.customer_email, order.project_slug, order.access_token);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
