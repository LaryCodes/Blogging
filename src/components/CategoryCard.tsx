import Link from "next/link";
import type { Category } from "@/types";
import { ArrowRightIcon } from "@/components/Icons";

interface CategoryCardProps {
  category: Category & { count?: number };
}

/** Card linking to a category page, showing title, description, and post count. */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <span
        className="mb-4 inline-block h-1.5 w-10 rounded-full"
        style={{ backgroundColor: category.color }}
        aria-hidden
      />
      <h3 className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
        {category.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-600">
        {category.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm">
        {typeof category.count === "number" && (
          <span className="text-ink-500">
            {category.count} {category.count === 1 ? "article" : "articles"}
          </span>
        )}
        <span className="inline-flex items-center gap-1 font-medium text-brand-600">
          Explore
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
