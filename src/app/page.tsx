import Link from "next/link";
import {
  getFeaturedPost,
  getLatestPosts,
  getCategoriesWithCounts,
} from "@/lib/content";
import { services } from "@/lib/services";
import { FeaturedPost } from "@/components/FeaturedPost";
import { PostCard } from "@/components/PostCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Newsletter } from "@/components/Newsletter";
import { ArrowRightIcon } from "@/components/Icons";

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(6),
    getCategoriesWithCounts(),
  ]);

  // Latest section excludes the featured post to avoid duplication.
  const latestPosts = latest.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-ink-50 to-white">
        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Regional IT Consultancy Knowledge Hub
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Technology Insights for Modern Businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-600">
              BLOGGING helps businesses understand and act on technology trends. Explore
              practical guidance on artificial intelligence, cybersecurity, cloud adoption,
              software engineering, and digital transformation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                View Articles
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="container-page py-16">
          <SectionHeading
            title="Featured Insight"
            description="Our editors' pick this week."
          />
          <FeaturedPost post={featured} />
        </section>
      )}

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <section className="container-page py-8 sm:py-12">
          <SectionHeading
            title="Latest Articles"
            description="Fresh perspectives from our consultants."
            link={{ href: "/blog", label: "View all articles" }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} showFeaturedBadge />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="container-page py-16">
        <SectionHeading
          title="Explore Topics"
          description="Deep dives across the areas that matter most to modern businesses."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Consultancy services */}
      <section className="bg-ink-50">
        <div className="container-page py-16">
          <SectionHeading
            title="How We Help"
            description="Beyond insights, we partner with businesses to deliver real technology outcomes."
            link={{ href: "/services", label: "All services" }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page py-16">
        <Newsletter />
      </section>
    </>
  );
}
