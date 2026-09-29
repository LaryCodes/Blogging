import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
}

/** Consistent page-top header used by inner pages (blog, services, about, etc.). */
export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="border-b border-ink-200 bg-ink-50">
      <div className="container-page py-12 sm:py-16">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-600">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
