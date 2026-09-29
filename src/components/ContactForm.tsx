"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/Icons";

interface FormValues {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

/**
 * Frontend-only contact form with client-side validation. On a valid submit
 * it shows a success confirmation. No network request is made; this mirrors
 * how the form would behave before a backend is wired up.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: FormValues): FormErrors {
    const next: FormErrors = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!v.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!v.subject.trim()) next.subject = "Please enter a subject.";
    if (!v.message.trim()) {
      next.message = "Please enter a message.";
    } else if (v.message.trim().length < 10) {
      next.message = "Your message should be at least 10 characters.";
    }
    return next;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink-900">Message sent</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-600">
          Thanks for reaching out, {values.name.split(" ")[0]}. We have received your message and
          will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialValues);
            setSubmitted(false);
          }}
          className="mt-6 inline-flex items-center rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={values.name}
          error={errors.name}
          onChange={(v) => handleChange("name", v)}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(v) => handleChange("email", v)}
          autoComplete="email"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="company"
          label="Company"
          value={values.company}
          error={errors.company}
          onChange={(v) => handleChange("company", v)}
          autoComplete="organization"
        />
        <Field
          id="subject"
          label="Subject"
          required
          value={values.subject}
          error={errors.subject}
          onChange={(v) => handleChange("subject", v)}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-800">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 ${
            errors.message ? "border-red-400" : "border-ink-300 focus:border-brand-500"
          }`}
          placeholder="Tell us a little about what you are working on."
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Send Message
      </button>
    </form>
  );
}

interface FieldProps {
  id: keyof FormValues;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 ${
          error ? "border-red-400" : "border-ink-300 focus:border-brand-500"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
