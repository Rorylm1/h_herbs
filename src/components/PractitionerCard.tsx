/*
  PRACTITIONER CARD — shows a herbalist's photo, name, title,
  specialities, and a link to their full profile.

  Used on the homepage (featured 3) and the /herbalists directory.
  The `next/image` component optimises images automatically
  (lazy loading, correct sizing, modern formats).
*/

import Image from "next/image";
import Link from "next/link";
import type { Practitioner } from "@/data/practitioners";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

export default function PractitionerCard({
  practitioner,
}: {
  practitioner: Practitioner;
}) {
  return (
    <Link
      href={`/herbalists/${practitioner.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-card hover:shadow-hover transition-all duration-300 border border-sage-100"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-50">
        <Image
          src={practitioner.photo}
          alt={practitioner.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle botanical corner accent on the photo */}
        <div className="absolute bottom-0 right-0 opacity-30">
          <BotanicalBorder position="bottom-right" className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <h3 className="font-heading text-xl font-semibold text-forest-700">
          {practitioner.name}
        </h3>
        <p className="text-sm text-muted mt-1">{practitioner.title}</p>

        {/* Speciality tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {practitioner.specialities.map((spec) => (
            <span
              key={spec}
              className="inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-forest-700"
            >
              {spec}
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
          {practitioner.tagline}
        </p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
          View Profile
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
      </div>
    </Link>
  );
}
