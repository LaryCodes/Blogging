import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { PageHeader } from "@/components/PageHeader";
import { serviceIcons, ArrowRightIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Consultancy services from BLOGGING: AI consulting, cloud solutions, cybersecurity, and software development. Practical technology partnership for modern businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Consultancy Services"
        description="We combine editorial insight with hands-on delivery. Whatever stage you are at, we help you turn technology decisions into business outcomes."
      />

      <div className="container-page py-12">
        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-2xl border border-ink-200 bg-white p-6 sm:p-10"
                aria-labelledby={`${service.slug}-heading`}
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                          0{index + 1}
                        </p>
                        <h2
                          id={`${service.slug}-heading`}
                          className="text-2xl font-bold text-ink-900"
                        >
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-4 text-lg font-medium text-ink-800">{service.tagline}</p>
                    <p className="mt-3 leading-7 text-ink-600">{service.description}</p>

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Discuss {service.title}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-xl bg-ink-50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-900">
                      What you get
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-ink-700">
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-brand-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Book a no-obligation conversation with one of our consultants. We will help you
            identify the highest-value next step for your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Talk to Us
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
