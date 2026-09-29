/**
 * Consultancy service offerings.
 *
 * Kept as a typed constant rather than JSON because services are structural
 * marketing content rather than editorial content. Consumed by the home page
 * and the /services page.
 */

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  icon: "ai" | "shield" | "cloud" | "code";
}

export const services: Service[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    tagline: "Turn artificial intelligence into measurable business outcomes.",
    description:
      "We help you identify high-value AI use cases, prove them quickly, and move them into production with the governance and data foundations that make them last. No moonshots, just results tied to business metrics.",
    benefits: [
      "Use-case discovery mapped to ROI",
      "Rapid proof-of-concept in weeks, not months",
      "Data quality and governance foundations",
      "Responsible AI and risk management",
    ],
    icon: "ai",
  },
  {
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    tagline: "Protect your people, data, and reputation with pragmatic security.",
    description:
      "From zero-trust architecture to incident response planning, we build security programs aligned to your actual business risk. Security that defends against attackers without getting in the way of your teams.",
    benefits: [
      "Zero-trust architecture design",
      "Threat modeling and risk assessment",
      "Incident response planning and tabletop exercises",
      "Compliance and regulatory readiness",
    ],
    icon: "shield",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "Migrate, modernize, and optimize with confidence.",
    description:
      "We plan and execute cloud migrations that respect your deadlines and your budget, then keep costs honest with a pragmatic FinOps practice. Resilient infrastructure that scales with demand.",
    benefits: [
      "Migration strategy across AWS and Azure",
      "Infrastructure as code and automation",
      "FinOps and cost optimization",
      "Resilience and disaster recovery design",
    ],
    icon: "cloud",
  },
  {
    slug: "software-development",
    title: "Software Development",
    tagline: "Build reliable software that keeps your teams shipping.",
    description:
      "We design clean architectures, establish delivery pipelines, and embed engineering practices that keep change cheap for years. Software built to be maintained, not just launched.",
    benefits: [
      "Clean, maintainable architecture",
      "Continuous delivery pipelines",
      "Test strategy and quality automation",
      "Team practices that scale",
    ],
    icon: "code",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
