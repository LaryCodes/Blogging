import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { BlogExplorer } from "@/components/BlogExplorer";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Browse all articles from BLOGGING. Search and filter insights on AI, cybersecurity, cloud computing, software development, and digital transformation.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Articles & Insights"
        description="Practical guidance and analysis from our consultants. Search by keyword or filter by topic to find what matters to your business."
      />
      <div className="container-page py-12">
        <BlogExplorer posts={posts} categories={categories} />
      </div>
    </>
  );
}
