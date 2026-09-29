"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/Icons";

/**
 * Frontend-only newsletter signup. Validates the email locally and shows a
 * success confirmation. No network request is made.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="rounded-2xl bg-brand-900 px-6 py-12 sm:px-12" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="newsletter-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Stay ahead of the technology curve
        </h2>
        <p className="mt-3 text-brand-100">
          Get our latest insights on AI, cybersecurity, cloud, and digital transformation
          delivered to your inbox. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-white"
            role="status"
          >
            <CheckIcon className="h-5 w-5 text-green-400" />
            Thanks for subscribing. Check your inbox to confirm.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@company.com"
              className="w-full rounded-lg border-0 px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-300"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Subscribe
            </button>
          </form>
        )}

        {status === "error" && (
          <p id="newsletter-error" className="mt-3 text-sm text-brand-100">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
}
