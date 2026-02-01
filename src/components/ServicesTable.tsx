/*
  SERVICES TABLE — displays a practitioner's consultation types
  with pricing, duration, and description.

  Rendered as cards rather than a literal HTML table — this is
  more flexible on mobile and allows for richer styling.
*/

import Link from "next/link";
import type { Service } from "@/data/practitioners";

export default function ServicesTable({
  services,
  practitionerSlug,
  practitionerName,
}: {
  services: Service[];
  practitionerSlug: string;
  practitionerName: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service) => (
        <div
          key={service.name}
          className="rounded-xl bg-white border border-sage-100 p-6 shadow-card flex flex-col"
        >
          {/* Price badge */}
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-heading text-lg font-semibold text-forest-700">
              {service.name}
            </h4>
            <span className="shrink-0 rounded-full bg-sage-50 px-3 py-1 text-sm font-bold text-forest-700">
              £{service.price}
            </span>
          </div>

          {/* Duration */}
          <p className="mt-1 text-sm text-muted flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {service.duration}
          </p>

          {/* Description */}
          <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
            {service.description}
          </p>

          {/* Book CTA */}
          <Link
            href={`/book?practitioner=${practitionerSlug}&service=${encodeURIComponent(service.name)}`}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 transition-colors"
          >
            Book {service.name.includes("Package") ? "Package" : "Session"}
          </Link>
        </div>
      ))}
    </div>
  );
}
