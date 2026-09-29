import type { Metadata } from "next";
import { getAllAuthors, getPostsByAuthor } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { AuthorCard } from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: "Authors",
  description:
    "Meet the consultants behind BLOGGING. Experts in AI, cybersecurity, cloud, and software engineering sharing practical technology insights.",
  alternates: { canonical: "/authors" },
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();
  const withCounts = await Promise.all(
    authors.map(async (author) => ({
      author,
      count: (await getPostsByAuthor(author.slug)).length,
    }))
  );

  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="Meet the Authors"
        description="Our insights come from practitioners who do this work every day. Get to know the consultants behind BLOGGING."
      />
      <div className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {withCounts.map(({ author, count }) => (
            <AuthorCard key={author.id} author={author} postCount={count} />
          ))}
        </div>
      </div>
    </>
  );
}
