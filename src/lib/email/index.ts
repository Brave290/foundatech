import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "Founda Technologies <hello@foundatech.name.ng>";

function getClient() {
  if (!resendKey) return null;
  return new Resend(resendKey);
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

type SendResult = { ok: true } | { error: string };

export async function sendContactConfirmation(name: string, email: string): Promise<SendResult> {
  const client = getClient();
  if (!client) return { error: "Resend not configured" };
  const safeName = escapeHtml(name);
  try {
    await client.emails.send({
      from,
      to: email,
      subject: "We received your message — Founda Technologies",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #16202E;">Hi ${safeName},</h2>
          <p style="color: #4a5568; line-height: 1.6;">We received your project inquiry. Our team reviews every message personally — no auto-replies, no chatbots.</p>
          <p style="color: #4a5568; line-height: 1.6;">You'll hear from us within 48 hours with a plan, a price, and a date.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">Founda Technologies — Building technology that solves real problems.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Email failed" };
  }
}

export async function sendDeliveryAccess(
  name: string,
  email: string,
  projectSlug: string,
  accessToken: string,
): Promise<SendResult> {
  const client = getClient();
  if (!client) return { error: "Resend not configured" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foundatech.name.ng";
  const deliveryUrl = `${baseUrl}/delivery?token=${encodeURIComponent(accessToken)}`;
  const safeName = escapeHtml(name);
  const safeSlug = escapeHtml(projectSlug);
  try {
    await client.emails.send({
      from,
      to: email,
      subject: `Your ${safeSlug} delivery is ready — Founda Technologies`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #16202E;">Hi ${safeName},</h2>
          <p style="color: #4a5568; line-height: 1.6;">Your payment is confirmed and your project delivery is ready.</p>
          <p style="color: #4a5568; line-height: 1.6;">Click below to access your files:</p>
          <a href="${escapeAttr(deliveryUrl)}" style="display: inline-block; background: #F59E0B; color: #16202E; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">View your delivery</a>
          <p style="color: #4a5568; line-height: 1.6; font-size: 13px;">Save this link — it gives you permanent access to your project files.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">Founda Technologies — Building technology that solves real problems.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Email failed" };
  }
}

export async function sendNewsletterWelcome(email: string): Promise<SendResult> {
  const client = getClient();
  if (!client) return { error: "Resend not configured" };
  try {
    await client.emails.send({
      from,
      to: email,
      subject: "Welcome to the Founda newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #16202E;">You're in.</h2>
          <p style="color: #4a5568; line-height: 1.6;">Welcome to the Founda Technologies newsletter. You'll get updates on what we're building, lessons from the field, and early access to new products.</p>
          <p style="color: #4a5568; line-height: 1.6;">No spam. Unsubscribe anytime.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">Founda Technologies — Building technology that solves real problems.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Email failed" };
  }
}
