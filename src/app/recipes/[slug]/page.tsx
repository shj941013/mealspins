"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<any | null>(null);

  // Get current pathname
  const pathname = usePathname(); // e.g. /recipes/grilled-salt-and-pepper-chicken
  const slug = pathname?.split("/recipes/")[1]; // extract slug

  useEffect(() => {
    if (!slug) return;

    const stored = localStorage.getItem("recipes");
    if (stored) {
      const parsed = JSON.parse(stored);
      const found = parsed.find((r: any) => r.slug === slug);
      if (found) setRecipe(found);
    }
  }, [slug]);

  if (!recipe) {
    return (
      <main className="p-6 text-center text-gray-500">
        <p>Recipe not found. Try generating again on the home page.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

      {/* <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-xl w-full h-64 object-cover mb-6"
      /> */}

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
        {recipe.ingredients.map((ing: string, i: number) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {recipe.steps.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </main>
  );
}
