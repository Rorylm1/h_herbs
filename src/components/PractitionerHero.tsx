/*
  PRACTITIONER HERO — the large header section at the top of a
  practitioner's profile page.

  Shows their photo, name, title, specialities, Instagram link,
  and a prominent "Book with [Name]" CTA. Think of it as their
  "above the fold" first impression.
*/

import Image from "next/image";
import Link from "next/link";
import type { Practitioner } from "@/data/practitioners";
import BotanicalPattern from "@/components/svg/BotanicalPattern";

export default function PractitionerHero({
  practitioner,
}: {
  practitioner: Practitioner;
}) {
  return (
    <section className="relative bg-earth-100 overflow-hidden">
      {/* Subtle botanical pattern background */}
      <BotanicalPattern className="absolute inset-0 text-sage-300 opacity-[0.04]" patternId="practitioner-hero-pattern" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Photo */}
          <div className="w-full md:w-72 lg:w-80 shrink-0">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-hover">
              <Image
                src={practitioner.photo}
                alt={practitioner.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-forest-700">
              {practitioner.name}
            </h1>
            <p className="mt-1 text-lg text-muted">{practitioner.title}</p>

            {/* Speciality tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {practitioner.specialities.map((spec) => (
                <span
                  key={spec}
                  className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-forest-700"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <p className="mt-5 text-charcoal leading-relaxed text-base md:text-lg max-w-xl">
              {practitioner.tagline}
            </p>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${practitioner.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-forest-700 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              @{practitioner.instagram}
            </a>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/book?practitioner=${practitioner.slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-forest-700 px-6 py-3 font-body text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
              >
                Book with {practitioner.name.split(" ")[0]}
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border border-forest-700/30 px-6 py-3 font-body text-sm font-semibold text-forest-700 uppercase tracking-wide hover:bg-sage-50 transition-colors"
              >
                View Services & Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
