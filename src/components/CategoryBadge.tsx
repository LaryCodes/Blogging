import Link from "next/link";
import type { Category } from "@/types";

interface CategoryBadgeProps {
  category: Pick<Category, "slug" | "title" | "color">;
  /** Render as a link to the category page. */
  asLink?: boolean;
  className?: string;
}

/**
 * Small colored pill representing a category. Uses the category's own color
 * with a soft tint background for a professional, readable look.
 */
export function CategoryBadge({ category, asLink = true, className = "" }: CategoryBadgeProps) {
  const style = {
    color: category.color,
    backgroundColor: `${category.color}14`,
  };

  const content = (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${className}`}
      style={style}
    >
      {category.title}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="rounded-full transition-opacity hover:opacity-80"
    >
      {content}
    </Link>
  );
}
