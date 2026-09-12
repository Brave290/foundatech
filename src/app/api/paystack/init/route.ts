import { NextRequest, NextResponse } from "next/server";
import { initPayment, generateReference } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectSlug, customerName, customerEmail, amountKobo, currency } = body as {
      projectSlug: string;
      customerName: string;
      customerEmail: string;
      amountKobo: number;
      currency?: string;
    };

    if (!projectSlug || !customerName || !customerEmail || !amountKobo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = generateReference();
    const admin = createAdminClient();
    const { error: insertError } = await admin.from("orders").insert({
      reference,
      project_slug: projectSlug,
      customer_name: customerName,
      customer_email: customerEmail,
      amount_kobo: amountKobo,
      currency: currency || "NGN",
    } as never);
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foundatech.name.ng";
    const result = await initPayment({
      email: customerEmail,
      amount: amountKobo,
      reference,
      callback_url: `${baseUrl}/delivery?ref=${reference}`,
      metadata: { order_reference: reference, project_slug: projectSlug },
    });

    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 500 });
    return NextResponse.json({ url: result.url, reference });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
