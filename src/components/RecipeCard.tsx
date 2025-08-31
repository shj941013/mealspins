import Link from "next/link";
import { slugify } from "@/lib/slugify";

type Props = {
  title: string;
  ingredients: string[];
  steps: string[];
  // image: string;
};

export default function RecipeCard({ title, ingredients, steps }: Props) {
  const slug = slugify(title);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-transform hover:scale-[1.02] flex flex-col">
      {/* <img
        src={image || "https://via.placeholder.com/400x250?text=Recipe+Image"}
        alt={title}
        className="h-40 w-full object-cover"
      /> */}

      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-[#FF6B35] mb-4">{title}</h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
          {ingredients.slice(0, 3).map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
          {ingredients.length > 3 && <li className="text-gray-500">+ more…</li>}
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 flex-1">
          {steps.slice(0, 2).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
          {steps.length > 2 && <li className="text-gray-500">+ more…</li>}
        </ol>

        <Link
          href={`/recipes/${slug}`}
          className="mt-4 px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition text-center"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
