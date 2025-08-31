type Props = {
  title: string;
  steps: string;
};

export default function RecipeCard({ title, steps }: Props) {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:scale-[1.02]">
      <h2 className="text-2xl font-bold text-orange-600 mb-2">{title}</h2>
      <div className="border-b border-orange-200 mb-3"></div>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{steps}</p>
    </div>
  );
}
