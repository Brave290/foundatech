const BOTSHIELD_KEY = process.env.NEXT_PUBLIC_BOTSHIELD_KEY;
const BOTSHIELD_SECRET = process.env.BOTSHIELD_SECRET_KEY;

type VerifyResult = { passed: boolean; reason?: string };

export async function verifyBotShield(token: string, metadata?: Record<string, string>): Promise<VerifyResult> {
  if (!BOTSHIELD_SECRET) {
    return { passed: true, reason: "BotShield not configured, skipping" };
  }

  if (!token) return { passed: false, reason: "No token provided" };

  try {
    const res = await fetch("https://api.botshield.com/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BOTSHIELD_SECRET}`,
      },
      body: JSON.stringify({ token, metadata }),
    });

    if (!res.ok) return { passed: false, reason: "Verification service error" };
    const json = await res.json();
    return { passed: json.valid === true, reason: json.reason };
  } catch {
    return { passed: true, reason: "BotShield unreachable, failing open" };
  }
}

export function getBotShieldKey(): string | undefined {
  return BOTSHIELD_KEY;
}
