import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("testimonials")
      .select("quote, author, role")
      .eq("verified", true)
      .order("sort_order", { ascending: true })
      .limit(10);
    return NextResponse.json({ testimonials: data ?? [] });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
