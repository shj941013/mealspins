import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const prompt = `You are a helpful cooking assistant. Suggest 3 quick, creative recipes 
    using the following ingredients: ${ingredients}. 
    Each recipe should include a title and short cooking steps and the measurements.`;

    const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini", // lightweight + fast
    //   model: "gpt-4.1",
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });


    // ✅ Log the full raw response for debugging
    console.log("OpenAI full response:", JSON.stringify(response, null, 2));

    const text = response.choices[0].message?.content ?? "";

    // ✅ Also log just the text
    console.log("OpenAI returned text:", text);

    return NextResponse.json({ recipes: text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate recipes" }, { status: 500 });
  }
}
