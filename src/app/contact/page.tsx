import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with BLOGGING. Talk to our consultants about AI, cybersecurity, cloud, and software development for your business.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's talk about your technology"
        description="Tell us what you are working on and we will get back to you within one business day. No obligation, no pressure."
      />

      <div className="container-page py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-900">
                Contact details
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-600">
                <li>
                  <span className="block font-medium text-ink-900">Email</span>
                  hello@blogging.example
                </li>
                <li>
                  <span className="block font-medium text-ink-900">Phone</span>
                  +1 (555) 010-2040
                </li>
                <li>
                  <span className="block font-medium text-ink-900">Hours</span>
                  Monday to Friday, 9am to 6pm
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-ink-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-900">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-ink-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    1
                  </span>
                  We review your message and route it to the right consultant.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    2
                  </span>
                  We reply within one business day to set up a short call.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    3
                  </span>
                  Together we agree on a practical next step, if any.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
