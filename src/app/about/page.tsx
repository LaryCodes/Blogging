import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "BLOGGING is a regional IT consultancy knowledge platform helping businesses navigate AI, cybersecurity, cloud, and digital transformation with clarity.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Clarity over hype",
    body: "Technology is full of noise. We cut through it with grounded, practical analysis that respects your time and your budget.",
  },
  {
    title: "Outcomes, not outputs",
    body: "A deployed tool is not success. We measure our work by the business results it produces and the problems it actually solves.",
  },
  {
    title: "Partnership, not lectures",
    body: "We meet teams where they are. The best decisions come from working alongside the people who do the work every day.",
  },
];

const stats = [
  { value: "10+", label: "Years of combined practice" },
  { value: "5", label: "Core technology disciplines" },
  { value: "40+", label: "Businesses guided" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A knowledge hub built on real consulting practice"
        description="BLOGGING exists to help modern businesses understand and act on technology change with confidence."
      />

      <div className="container-page py-12">
        {/* Mission */}
        <section className="mx-auto max-w-3xl" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-2xl font-bold text-ink-900">
            Our mission
          </h2>
          <div className="prose-content mt-4">
            <p>
              We are a regional IT consultancy that believes good technology decisions should
              not be reserved for companies with the largest budgets. Our knowledge platform
              shares the same thinking we bring to client engagements: clear, practical, and
              rooted in what actually works.
            </p>
            <p>
              Every article on this site is written by a practitioner who does this work in the
              field. When we write about cloud migration, incident response, or AI adoption, we
              are writing from experience, not from a press release.
            </p>
          </div>
        </section>

        {/* Why guidance matters */}
        <section className="mx-auto mt-12 max-w-3xl" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-2xl font-bold text-ink-900">
            Why businesses need technology guidance
          </h2>
          <div className="prose-content mt-4">
            <p>
              The pace of technology change has outrun the ability of most organizations to keep
              up. New platforms, new risks, and new expectations arrive faster than teams can
              absorb them. The result is often paralysis or, worse, expensive decisions made on
              incomplete information.
            </p>
            <p>
              Independent guidance changes that. A trusted advisor helps you separate the trends
              that matter from the ones that do not, sequence your investments sensibly, and
              avoid the costly mistakes that others have already made. That is the role we play.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mt-16" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-center text-2xl font-bold text-ink-900">
            Our consultancy approach
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-ink-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-ink-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 rounded-2xl bg-ink-50 px-6 py-10 sm:px-12">
          <dl className="grid gap-8 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-4xl font-bold text-brand-700">{stat.value}</span>
                  <span className="mt-2 block text-sm text-ink-600">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-ink-900">Ready to talk?</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-600">
            Whether you have a specific challenge or just want a second opinion, we would be glad
            to help.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get in touch
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
