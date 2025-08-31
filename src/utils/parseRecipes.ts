// utils/parseRecipes.ts
export function parseRecipes(rawText: string) {
    // Split by "**Recipe X:" pattern
    const recipeRegex = /\*\*Recipe \d+:\s*(.+?)\*\*/g;
    const matches = Array.from(rawText.matchAll(recipeRegex));
  
    const recipes = matches.map((match, index) => {
      const title = match[1].trim();
  
      // Steps = everything after this match up to next "**Recipe X" or end
      const startIndex = match.index! + match[0].length;
      const endIndex =
        matches[index + 1]?.index ?? rawText.length;
  
      const steps = rawText.slice(startIndex, endIndex).trim();
  
      return { title, steps };
    });
  
    return recipes;
  }
  