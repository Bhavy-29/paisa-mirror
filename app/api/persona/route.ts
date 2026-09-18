import { NextRequest, NextResponse } from "next/server";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set in environment" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const prompt: string = body.prompt;
    const wantsJson: boolean = body.json === true;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: wantsJson
        ? { responseMimeType: "application/json" }
        : { temperature: 0.9, maxOutputTokens: 200 }
    };

    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json(
        { error: `Gemini error: ${errText}` },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    if (wantsJson) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { error: "Gemini did not return valid JSON", raw: text },
          { status: 500 }
        );
      }
      return NextResponse.json({ parsed });
    }

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
