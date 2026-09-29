/**
 * Content data-access layer.
 *
 * Every read of posts, categories, and authors goes through these functions.
 * Today they read local JSON; migrating to Sanity, Contentful, or Strapi
 * would mean reimplementing only this file, leaving pages and components
 * untouched. Functions are async to match how a real CMS client behaves.
 */

import postsData from "@/content/posts.json";
import categoriesData from "@/content/categories.json";
import authorsData from "@/content/authors.json";
import type { Author, Category, Post, ResolvedPost } from "@/types";

const posts = postsData as Post[];
const categories = categoriesData as Category[];
const authors = authorsData as Author[];

/** Sort helper: newest first by date. */
function byDateDesc(a: Post, b: Post): number {
  return b.date.localeCompare(a.date);
}

function resolvePost(post: Post): ResolvedPost {
  const category =
    categories.find((c) => c.slug === post.category) ?? fallbackCategory(post.category);
  const author = authors.find((a) => a.slug === post.author) ?? fallbackAuthor(post.author);
  return { ...post, category, author };
}

function fallbackCategory(slug: string): Category {
  return {
    id: `unknown-${slug}`,
    slug,
    title: "Uncategorized",
    description: "",
    color: "#64748b",
  };
}

function fallbackAuthor(slug: string): Author {
  return {
    id: `unknown-${slug}`,
    slug,
    name: "Unknown Author",
    role: "Contributor",
    bio: "",
    image: "",
  };
}

/* -------------------------------------------------------------------------- */
/* Posts                                                                      */
/* -------------------------------------------------------------------------- */

export async function getAllPosts(): Promise<ResolvedPost[]> {
  return [...posts].sort(byDateDesc).map(resolvePost);
}

export async function getPostSlugs(): Promise<string[]> {
  return posts.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<ResolvedPost | null> {
  const post = posts.find((p) => p.slug === slug);
  return post ? resolvePost(post) : null;
}

export async function getFeaturedPost(): Promise<ResolvedPost | null> {
  const featured = posts.find((p) => p.featured);
  const chosen = featured ?? [...posts].sort(byDateDesc)[0];
  return chosen ? resolvePost(chosen) : null;
}

export async function getLatestPosts(limit = 6): Promise<ResolvedPost[]> {
  return [...posts].sort(byDateDesc).slice(0, limit).map(resolvePost);
}

export async function getPostsByCategory(categorySlug: string): Promise<ResolvedPost[]> {
  return [...posts]
    .filter((p) => p.category === categorySlug)
    .sort(byDateDesc)
    .map(resolvePost);
}

export async function getPostsByAuthor(authorSlug: string): Promise<ResolvedPost[]> {
  return [...posts]
    .filter((p) => p.author === authorSlug)
    .sort(byDateDesc)
    .map(resolvePost);
}

/** Related posts: same category, excluding the current post. */
export async function getRelatedPosts(
  post: ResolvedPost,
  limit = 3
): Promise<ResolvedPost[]> {
  return [...posts]
    .filter((p) => p.category === post.category.slug && p.slug !== post.slug)
    .sort(byDateDesc)
    .slice(0, limit)
    .map(resolvePost);
}

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

export async function getAllCategories(): Promise<Category[]> {
  return [...categories];
}

export async function getCategorySlugs(): Promise<string[]> {
  return categories.map((c) => c.slug);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Category list enriched with the number of posts in each. */
export async function getCategoriesWithCounts(): Promise<
  Array<Category & { count: number }>
> {
  return categories.map((c) => ({
    ...c,
    count: posts.filter((p) => p.category === c.slug).length,
  }));
}

/* -------------------------------------------------------------------------- */
/* Authors                                                                    */
/* -------------------------------------------------------------------------- */

export async function getAllAuthors(): Promise<Author[]> {
  return [...authors];
}

export async function getAuthorSlugs(): Promise<string[]> {
  return authors.map((a) => a.slug);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return authors.find((a) => a.slug === slug) ?? null;
}
