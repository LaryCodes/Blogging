import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getPostsByCategory,
} from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <>
      <PageHeader
        eyebrow="Topic"
        title={category.title}
        description={category.description}
      />
      <div className="container-page py-12">
        {posts.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-ink-500">
              {posts.length} {posts.length === 1 ? "article" : "articles"} in this topic
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} showFeaturedBadge />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-ink-900">No articles yet</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-600">
              We have not published articles in this topic yet. Check back soon or browse our
              other insights.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
