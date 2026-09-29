"use client";

import { useEffect } from "react";

/** Route-level error boundary shown when an unexpected runtime error occurs. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real deployment this would report to an observability service.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        We hit an unexpected error
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
        Please try again. If the problem continues, get in touch and we will look into it.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Try again
      </button>
    </div>
  );
}
