// app/page.tsx
"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";

type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSpin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">🍳 MealSpin</h1>

      <input
        type="text"
        placeholder="Enter your ingredients..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border rounded-lg p-3 w-80 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <button
        onClick={handleSpin}
        className="bg-orange-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 mb-6"
        disabled={loading}
      >
        {loading ? "Spinning..." : "Spin!"}
      </button>

      {recipes.length === 0 && !loading && (
        <p className="text-gray-500">
          No recipes found. Try different ingredients.
        </p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
        {recipes.map((r, i) => (
          <RecipeCard
            key={i}
            title={r.title}
            ingredients={r.ingredients}
            steps={r.steps}
          />
        ))}
      </div>
    </main>
  );
}
