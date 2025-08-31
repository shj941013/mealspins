"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { parseRecipes } from "@/utils/parseRecipes";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<{ title: string; steps: string }[]>([]);
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
      if (data.recipes) {
        const parsed = parseRecipes(data.recipes);
        setRecipes(parsed);
      }
    } catch (err) {
      console.error(err);
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

      {/* Recipes Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {recipes.map((r, i) => (
          <RecipeCard key={i} title={r.title} steps={r.steps} />
        ))}
      </div>
    </main>
  );
}
