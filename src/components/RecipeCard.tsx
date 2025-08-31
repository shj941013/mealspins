// components/RecipeCard.tsx
type Props = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export default function RecipeCard({ title, ingredients, steps }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-transform hover:scale-[1.02]">
      <h2 className="text-xl font-bold text-orange-600 mb-4">{title}</h2>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
      <ol className="list-decimal list-inside space-y-1 text-gray-700">
        {(steps ?? []).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
