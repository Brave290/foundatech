import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "Founda Technologies <hello@foundatech.name.ng>";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

type SendResult = { ok: true } | { error: string };

export async function sendContactAutoReply({
  name,
  email,
  subject,
}: {
  name: string;
  email: string;
  subject: string;
}): Promise<SendResult> {
  if (!resendKey) return { error: "Resend not configured" };
  const client = new Resend(resendKey);
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  try {
    await client.emails.send({
      from,
      to: email,
      subject: "We received your message — Founda Technologies",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background-color: #0f172a; color: #e2e8f0;">
          <h2 style="color: #f8fafc; margin-bottom: 16px;">Hi ${safeName},</h2>
          <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 12px;">
            We've received your message about <strong style="color: #f8fafc;">${safeSubject}</strong>. Our team reviews every inquiry personally — no auto-replies, no chatbots.
          </p>
          <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 24px;">
            You'll hear from us within <strong style="color: #f8fafc;">24 hours</strong> with a plan and next steps.
          </p>
          <div style="background-color: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;">Need a faster response? Reach us directly:</p>
            <p style="color: #f8fafc; margin: 0 0 4px 0; font-size: 14px;">📞 09017977963</p>
            <p style="color: #f8fafc; margin: 0; font-size: 14px;">💬 WhatsApp: 09151186880</p>
          </div>
          <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; margin: 0;">Founda Technologies — Building technology that solves real problems.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (e: unknown) {
    console.error("[contact-auto-reply] Failed to send:", e);
    return { error: e instanceof Error ? e.message : "Auto-reply failed" };
  }
}
