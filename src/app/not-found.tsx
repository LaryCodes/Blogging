import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

/** Global 404 fallback for unmatched routes and invalid slugs. */
export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
        We could not find the page you were looking for. It may have moved, or the link may be
        incorrect.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Back to home
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-lg border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50"
        >
          Browse articles
        </Link>
      </div>
    </div>
  );
}
