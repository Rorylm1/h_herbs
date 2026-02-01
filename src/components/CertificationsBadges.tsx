/*
  CERTIFICATIONS BADGES — displays a practitioner's professional
  registrations, insurance, and accreditations.

  Each certification is shown as a badge with a shield icon,
  the abbreviation prominently displayed, and the full details
  on hover/below. These are trust signals that help clients
  feel confident in their practitioner.
*/

import type { Certification } from "@/data/practitioners";

export default function CertificationsBadges({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {certifications.map((cert) => (
        <div
          key={`${cert.abbreviation}-${cert.type}`}
          className="flex items-start gap-3 rounded-lg bg-white border border-sage-100 p-4"
        >
          {/* Shield icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-50 text-forest-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-forest-700">
              {cert.abbreviation}
              {cert.year && (
                <span className="ml-1.5 text-xs font-normal text-muted">
                  since {cert.year}
                </span>
              )}
            </p>
            <p className="text-xs text-muted leading-snug mt-0.5">
              {cert.type} — {cert.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
