"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import SpinButton from "@/components/SpinButton";
import { slugify } from "@/lib/slugify";

type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
  // image: string;
  slug: string;
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

      const withSlugs = (data.recipes || []).map((r: any) => ({
        ...r,
        slug: slugify(r.title),
      }));

      // Save to localStorage
      localStorage.setItem("recipes", JSON.stringify(withSlugs));

      setRecipes(withSlugs);
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
      className="
        w-80 mb-4 px-4 py-2
        border border-gray-400 rounded-lg
        bg-[#FFF8F0] text-gray-800
        placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-600
        transition-colors duration-200
      "
    />

      <SpinButton loading={loading} onClick={handleSpin} />

      {recipes.length === 0 && !loading && (
        <p className="text-gray-500 mt-6">
          No recipes found. Try different ingredients.
        </p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl mt-6">
        {recipes.map((r) => (
          <RecipeCard
            key={r.slug}
            title={r.title}
            ingredients={r.ingredients}
            steps={r.steps}
            // image={r.image}
          />
        ))}
      </div>
    </main>
  );
}
