/**
 * Presentation utilities shared across the app.
 */

/** Format an ISO date string (YYYY-MM-DD) into a readable label. */
export function formatDate(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Human-friendly reading time label, e.g. "5 min read". */
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Estimate reading time from raw content at ~200 words per minute.
 * Used as a fallback when a post does not declare an explicit readTime.
 */
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Split content into paragraph/heading blocks for rendering. */
export function contentToBlocks(
  content: string
): Array<{ type: "heading" | "paragraph"; text: string }> {
  return content
    .split(/\n\n+/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "heading" as const, text: block.replace(/^##\s+/, "") };
      }
      return { type: "paragraph" as const, text: block };
    });
}
