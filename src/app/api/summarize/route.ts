import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { inputs } = await req.json();

  console.log("Inputs received:", inputs);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Summarize the text clearly and concisely.",
          },
          {
            role: "user",
            content: inputs,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "OpenAI error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      summary: data.choices?.[0]?.message?.content ?? "No summary returned",
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}