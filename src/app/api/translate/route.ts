import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!DEEPSEEK_KEY) {
    return NextResponse.json({ error: "Translation service not configured" }, { status: 503 });
  }

  try {
    const { text, target } = (await req.json()) as { text?: string; target?: string };

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    }
    if (!target) {
      return NextResponse.json({ error: "Target language required" }, { status: 400 });
    }

    const langMap: Record<string, string> = {
      EN: "English",
      FR: "French",
      AR: "Arabic",
      YO: "Yoruba",
    };

    const langName = langMap[target.toUpperCase()] ?? target;

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${langName}. Keep the meaning and tone. Do not add any explanation — return only the translated text.`,
          },
          { role: "user", content: text },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Translation service error" }, { status: 502 });
    }

    const json = await res.json();
    const translated = json.choices?.[0]?.message?.content ?? text;

    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
