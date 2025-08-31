// lib/slugify.ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces/special chars with -
    .replace(/(^-|-$)+/g, "");   // trim leading/trailing dashes
}
