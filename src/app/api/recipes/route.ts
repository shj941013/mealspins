// app/api/recipes/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const prompt = `You are a helpful cooking assistant.
    Using these ingredients: ${ingredients}, suggest 5–10 quick recipes.

    ⚠️ Very important formatting rules:
    - "ingredients" must include realistic measurements (e.g. "2 oz chicken breast", "1 tsp salt", "1 tbsp olive oil").
    - Do NOT just list ingredient names. Every ingredient must have a measurement.
    - "instructions" must only contain cooking steps (no ingredient list repeats).
    - Return ONLY valid JSON in this format (no text outside JSON):

    [
      {
        "title": "Recipe title",
        "ingredients": ["2 oz chicken breast", "1 tsp salt", "1 tbsp olive oil"],
        "instructions": ["Step 1...", "Step 2...", "Step 3..."]
      }
    ]`;

    const response = await openai.chat.completions.create({
      // model: "gpt-4o-mini",
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let text = response.choices[0].message?.content ?? "";
    console.log("Raw OpenAI response:", text);

    // ✅ Strip ```json ... ``` wrappers if they exist
    text = text.replace(/```json|```/g, "").trim();

    let recipes: { title: string; steps: string }[] = [];

    try {
      const json = JSON.parse(text);
      // inside route.ts after parsing JSON
      recipes = json.map((r: any) => {
        const ingredients = Array.isArray(r.ingredients) ? r.ingredients : [];
        let steps = Array.isArray(r.instructions) ? r.instructions : [];

        const cleanedSteps = steps.filter(
          (s: string) => !ingredients.some((ing: string) => s.includes(ing))
        );

        return {
          title: r.title || "Untitled Recipe",
          ingredients,
          steps: cleanedSteps,
        };
      });
    } catch (err) {
      console.error("❌ Failed to parse JSON", err);
      return NextResponse.json(
        { error: "Could not parse recipes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recipes" },
      { status: 500 }
    );
  }
}
