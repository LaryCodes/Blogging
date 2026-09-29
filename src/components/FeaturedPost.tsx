import Image from "next/image";
import Link from "next/link";
import type { ResolvedPost } from "@/types";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PostMeta } from "@/components/PostMeta";
import { ArrowRightIcon } from "@/components/Icons";

interface FeaturedPostProps {
  post: ResolvedPost;
}

/** Large two-column hero card for the single featured article on the home page. */
export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink-200 bg-white lg:grid lg:grid-cols-2">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-100 lg:aspect-auto lg:h-full"
        aria-label={post.title}
      >
        <Image
          src={post.featuredImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </Link>

      <div className="flex flex-col justify-center p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-brand-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Featured
          </span>
          <CategoryBadge category={post.category} />
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-base leading-7 text-ink-600">{post.excerpt}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-ink-100">
            {post.author.image && (
              <Image src={post.author.image} alt="" fill sizes="40px" className="object-cover" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">{post.author.name}</p>
            <PostMeta date={post.date} readTime={post.readTime} />
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Read Article
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
