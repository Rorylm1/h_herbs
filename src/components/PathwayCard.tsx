/*
  PATHWAY CARD — one of 3 cards below the hero that guide users
  to the main areas: Book / Shop / Learn.

  Each card has an icon, heading, description, and a CTA link.
  Think of these as "signposts" for first-time visitors.
*/

import Link from "next/link";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

export default function PathwayCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl bg-white p-6 md:p-8 shadow-card hover:shadow-hover transition-all duration-300 border border-sage-100 overflow-hidden"
    >
      {/* Subtle botanical corner accent */}
      <div className="absolute -top-1 -right-1 opacity-40 group-hover:opacity-60 transition-opacity">
        <BotanicalBorder position="top-right" className="w-16 h-16 text-sage-100" />
      </div>
      {/* Icon circle */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-50 text-forest-700 group-hover:bg-sage-200 transition-colors">
        {icon}
      </div>
      <h3 className="mt-4 font-heading text-xl md:text-2xl font-semibold text-forest-700">
        {title}
      </h3>
      <p className="mt-2 text-muted text-sm leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
        {cta}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </Link>
  );
}
