import Link from "next/link";
import type { Service } from "@/lib/services";
import { serviceIcons } from "@/components/Icons";

interface ServiceCardProps {
  service: Service;
  /** Show the full benefits list (used on the services page). */
  detailed?: boolean;
}

/** Consultancy service card. Compact on the home page, detailed on /services. */
export function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-ink-900">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-600">
        {detailed ? service.description : service.tagline}
      </p>

      {detailed && (
        <ul className="mt-4 space-y-2">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-ink-700">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-600" aria-hidden />
              {benefit}
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/services"
        className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
      >
        Learn more
      </Link>
    </div>
  );
}
