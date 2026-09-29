import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/content";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PostMeta } from "@/components/PostMeta";
import { ArticleBody } from "@/components/ArticleBody";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [{ url: post.featuredImage }],
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post, 3);

  return (
    <>
      <article>
        {/* Header */}
        <div className="border-b border-ink-200 bg-ink-50">
          <div className="container-page py-10 sm:py-14">
            <nav className="mb-6 text-sm text-ink-500" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-700">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-brand-700">Articles</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-ink-700">{post.category.title}</li>
              </ol>
            </nav>

            <CategoryBadge category={post.category} />
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-600">{post.excerpt}</p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={`/authors/${post.author.slug}`}
                className="relative h-11 w-11 overflow-hidden rounded-full bg-ink-100"
                aria-label={post.author.name}
              >
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                )}
              </Link>
              <div>
                <Link
                  href={`/authors/${post.author.slug}`}
                  className="text-sm font-semibold text-ink-900 hover:text-brand-700"
                >
                  {post.author.name}
                </Link>
                <PostMeta date={post.date} readTime={post.readTime} />
              </div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="container-page py-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <div className="container-page pb-12">
          <div className="mx-auto max-w-3xl">
            <ArticleBody content={post.content} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-ink-200 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-ink-100 px-3 py-1 text-sm text-ink-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author card */}
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-ink-200 bg-ink-50 p-6 sm:flex-row sm:items-center">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-ink-100">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-sm text-ink-500">Written by</p>
                <Link
                  href={`/authors/${post.author.slug}`}
                  className="text-lg font-semibold text-ink-900 hover:text-brand-700"
                >
                  {post.author.name}
                </Link>
                <p className="text-sm text-ink-600">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-50">
          <div className="container-page py-16">
            <SectionHeading
              title="Related Articles"
              description={`More from ${post.category.title}.`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
