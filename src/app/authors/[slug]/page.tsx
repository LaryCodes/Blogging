import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAuthorBySlug,
  getAuthorSlugs,
  getPostsByAuthor,
} from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { LinkedinIcon, TwitterIcon, GlobeIcon } from "@/components/Icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: "Author not found" };
  }

  return {
    title: author.name,
    description: `${author.name}, ${author.role}. ${author.bio}`,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.slug);

  return (
    <>
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page py-12 sm:py-16">
          <nav className="mb-6 text-sm text-ink-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/authors" className="hover:text-brand-700">Authors</Link></li>
              <li aria-hidden>/</li>
              <li className="text-ink-700">{author.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-ink-100">
              {author.image && (
                <Image src={author.image} alt="" fill sizes="96px" className="object-cover" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-ink-900">{author.name}</h1>
              <p className="mt-1 text-lg font-medium text-brand-600">{author.role}</p>
              {author.social && (
                <div className="mt-3 flex gap-3">
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-500 hover:text-brand-700"
                      aria-label={`${author.name} on LinkedIn`}
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-500 hover:text-brand-700"
                      aria-label={`${author.name} on Twitter`}
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-500 hover:text-brand-700"
                      aria-label={`${author.name}'s website`}
                    >
                      <GlobeIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-600">{author.bio}</p>
        </div>
      </div>

      <div className="container-page py-12">
        <SectionHeading
          title={`Articles by ${author.name}`}
          description={`${posts.length} ${posts.length === 1 ? "article" : "articles"} published.`}
        />
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showFeaturedBadge />
            ))}
          </div>
        ) : (
          <p className="text-ink-600">This author has not published any articles yet.</p>
        )}
      </div>
    </>
  );
}
