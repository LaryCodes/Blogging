/**
 * Content type definitions.
 *
 * These interfaces model a headless-CMS style content graph. Posts reference
 * categories and authors by slug/id, mirroring how a real CMS (Sanity,
 * Contentful, Strapi) exposes references. Keeping the shapes here means a
 * future migration only needs to swap the data-access layer in `src/lib`.
 */

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Short label used for badges. */
  color: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown-lite content. Paragraphs separated by blank lines. */
  content: string;
  /** Category slug reference. */
  category: string;
  /** Author slug reference. */
  author: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  featuredImage: string;
  featured: boolean;
  /** Estimated reading time in minutes. */
  readTime: number;
  tags?: string[];
}

/** A post with its category and author references resolved to full objects. */
export interface ResolvedPost extends Omit<Post, "category" | "author"> {
  category: Category;
  author: Author;
}
