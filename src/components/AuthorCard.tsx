import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/types";

interface AuthorCardProps {
  author: Author;
  postCount?: number;
}

/** Author summary card used on the authors listing page. */
export function AuthorCard({ author, postCount }: AuthorCardProps) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex h-full flex-col items-center rounded-xl border border-ink-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-ink-100">
        {author.image && (
          <Image src={author.image} alt="" fill sizes="80px" className="object-cover" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
        {author.name}
      </h3>
      <p className="text-sm font-medium text-brand-600">{author.role}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-600">{author.bio}</p>
      {typeof postCount === "number" && (
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-500">
          {postCount} {postCount === 1 ? "article" : "articles"}
        </p>
      )}
    </Link>
  );
}
