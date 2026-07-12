// Tiny classname joiner (no external dep) for conditional Tailwind classes.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
