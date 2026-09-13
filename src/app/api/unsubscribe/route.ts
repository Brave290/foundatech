import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { token, email } = await req.json();
    const admin = createAdminClient();

    if (token) {
      const { data, error } = await admin
        .from("subscribers")
        .update({ active: false })
        .eq("id", token)
        .select("id")
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    }

    if (email) {
      const { data, error } = await admin
        .from("subscribers")
        .update({ active: false })
        .eq("email", email.toLowerCase().trim())
        .select("id")
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Email not found in our list" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Provide token or email" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
