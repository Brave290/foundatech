import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactAutoReply } from "@/lib/email/contact-auto-reply";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const admin = createAdminClient();

    const { error } = await admin.from("contact_submissions").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: "new",
    });

    if (error) {
      console.error("[contact] Failed to save:", error);
      return NextResponse.json({ error: "Failed to save your message" }, { status: 500 });
    }

    sendContactAutoReply({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
    }).catch((e) => console.error("[contact] Auto-reply failed:", e));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
