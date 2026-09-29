"use client";

import { useMemo, useState } from "react";
import type { Category, ResolvedPost } from "@/types";
import { PostCard } from "@/components/PostCard";
import { SearchIcon } from "@/components/Icons";

interface BlogExplorerProps {
  posts: ResolvedPost[];
  categories: Category[];
}

/**
 * Client-side article explorer combining instant search with category
 * filtering. Search matches title, excerpt, and category title. Filters and
 * search work together, and an empty result shows a professional fallback.
 */
export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category.slug === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.title.toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <label htmlFor="article-search" className="sr-only">
          Search articles
        </label>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles by title, topic, or keyword"
          className="w-full rounded-lg border border-ink-300 py-3 pl-12 pr-4 text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Category filter */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <FilterButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={activeCategory === category.slug}
            onClick={() => setActiveCategory(category.slug)}
          >
            {category.title}
          </FilterButton>
        ))}
      </div>

      {/* Results */}
      <p className="mb-6 text-sm text-ink-500" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {query && ` for "${query}"`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} showFeaturedBadge />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink-900">No articles found</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-600">
            We could not find any articles matching your search. Try a different keyword or
            clear the filters to see everything.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
            }}
            className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-ink-300 bg-white text-ink-700 hover:border-ink-400 hover:bg-ink-50"
      }`}
    >
      {children}
    </button>
  );
}
