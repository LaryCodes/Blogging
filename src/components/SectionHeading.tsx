import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** Optional "view all" style link shown on the right. */
  link?: { href: string; label: string };
}

/** Heading row for home-page and listing sections, with optional action link. */
export function SectionHeading({ title, description, link }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-ink-600">{description}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {link.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
