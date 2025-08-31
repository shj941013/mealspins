// utils/parseRecipes.ts
export function parseRecipes(rawText: string) {
  const recipeRegex = /\*\*Recipe\s*\d*:\s*(.+?)\*\*/gi;
  const matches = Array.from(rawText.matchAll(recipeRegex));

  if (matches.length === 0) {
    // fallback: try splitting text into blocks that look like recipes
    return rawText
      .split(/\n\s*\n/)
      .filter((block) => block.toLowerCase().includes("ingredients"))
      .map((block, i) => ({
        title: `Recipe ${i + 1}`,
        steps: block.trim(),
      }));
  }

  return matches.map((match, index) => {
    const title = match[1].trim();
    const startIndex = match.index! + match[0].length;
    const endIndex = matches[index + 1]?.index ?? rawText.length;
    const steps = rawText.slice(startIndex, endIndex).trim();
    return { title, steps };
  });
}
