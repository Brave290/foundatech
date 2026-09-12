const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE = "https://api.paystack.co";

type InitResponse = { status: boolean; data: { authorization_url: string; reference: string; access_code: string } };
type VerifyResponse = { status: boolean; data: { status: string; reference: string; amount: number; currency: string; customer: { email: string }; metadata: Record<string, unknown> } };

export async function initPayment(args: {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
}): Promise<{ url: string } | { error: string }> {
  if (!PAYSTACK_SECRET) return { error: "PAYSTACK_SECRET_KEY not configured" };
  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: args.email,
        amount: args.amount,
        reference: args.reference,
        metadata: args.metadata ?? {},
        callback_url: args.callback_url,
      }),
    });
    const json: InitResponse = await res.json();
    if (!json.status || !json.data) return { error: "Payment initialization failed" };
    return { url: json.data.authorization_url };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Payment init error" };
  }
}

export async function verifyPayment(reference: string): Promise<{ verified: boolean; data?: VerifyResponse["data"] }> {
  if (!PAYSTACK_SECRET) return { verified: false };
  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const json: VerifyResponse = await res.json();
    if (json.status && json.data?.status === "success") return { verified: true, data: json.data };
    return { verified: false };
  } catch {
    return { verified: false };
  }
}

export function generateReference(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `FDA-${ts}-${rand}`.toUpperCase();
}
