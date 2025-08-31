"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<string[]>([]);

  const handleSpin = async () => {
    // For now, just mock AI results
    setRecipes([
      `Garlic Butter Chicken with ${ingredients}`,
      `Quick Fried Rice with ${ingredients}`,
      `Spinach Salad with ${ingredients}`,
    ]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">🍳 MealSpin</h1>

      <input
        type="text"
        placeholder="Enter your ingredients..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border rounded p-2 w-80 mb-4"
      />

      <button
        onClick={handleSpin}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Spin!
      </button>

      <div className="mt-6 space-y-3">
        {recipes.map((r, i) => (
          <div key={i} className="border p-3 rounded shadow">
            {r}
          </div>
        ))}
      </div>
    </main>
  );
}
