import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllCategories,
  getAllAuthors,
} from "@/lib/content";

const baseUrl = "https://blogging.example";

/** Dynamic sitemap covering static pages plus all content routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, authors] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllAuthors(),
  ]);

  const staticRoutes = ["", "/blog", "/services", "/authors", "/about", "/contact"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const authorRoutes = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...authorRoutes];
}
