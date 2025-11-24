import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { inputs } = await req.json();

  console.log("HF KEY EXISTS:", !!process.env.HF_API_KEY);
  console.log("Inputs received:", inputs);

  try {
    const response = await fetch(
      "https://router.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs }),
      }
    );

    console.log("HF Response status:", response.status);

    const data = await response.json();
    console.log("HF Response data:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Hugging Face error" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server crashed" }, { status: 500 });
  }
}
