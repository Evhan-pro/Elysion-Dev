import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-medium",
      messages: [
        { role: "system", content: "Tu es un assistant expert en retraite et finance." },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await mistralRes.json();

  console.log("Réponse Mistral :", JSON.stringify(data, null, 2)); // 👈 Ici

  const reply = data?.choices?.[0]?.message?.content?.trim() || "❌ Aucune réponse générée.";

  return NextResponse.json({ reply });
}
