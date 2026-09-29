import Image from "next/image";
import Link from "next/link";
import type { ResolvedPost } from "@/types";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PostMeta } from "@/components/PostMeta";

interface PostCardProps {
  post: ResolvedPost;
  /** Show a "Featured" ribbon on the card. */
  showFeaturedBadge?: boolean;
}

/**
 * Standard article card used across listing, category, author, and related
 * sections. Clean, professional layout with image, category, title, excerpt,
 * and meta.
 */
export function PostCard({ post, showFeaturedBadge = false }: PostCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition-shadow hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-ink-100"
        aria-label={post.title}
      >
        <Image
          src={post.featuredImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showFeaturedBadge && post.featured && (
          <span className="absolute left-3 top-3 rounded-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <CategoryBadge category={post.category} className="self-start" />
        <h3 className="mt-3 text-lg font-semibold leading-snug text-ink-900">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-ink-100 pt-4">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-ink-100">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt=""
                fill
                sizes="32px"
                className="object-cover"
              />
            )}
          </div>
          <span className="text-sm font-medium text-ink-700">{post.author.name}</span>
        </div>
        <PostMeta date={post.date} readTime={post.readTime} className="mt-3" />
      </div>
    </article>
  );
}
