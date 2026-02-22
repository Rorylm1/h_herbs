/*
  PRESCRIPTION CARD — displays a prescription summary in list views.

  Shows practitioner, condition, herb count, and date.
  Links to the full prescription detail page.
*/

import Link from "next/link";

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

type PrescriptionData = {
  id: string;
  practitionerSlug: string;
  date: string;
  condition: string;
  notes: string;
  items: PrescriptionItem[];
  practitionerName: string;
};

type PrescriptionCardProps = {
  prescription: PrescriptionData;
};

export default function PrescriptionCard({ prescription }: PrescriptionCardProps) {

  // Format date for display
  const formattedDate = new Date(prescription.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Count herbs that link to shop products
  const shopLinkedHerbs = prescription.items.filter((item) => item.productSlug).length;

  return (
    <Link
      href={`/account/prescriptions/${prescription.id}`}
      className="block bg-white rounded-xl border border-sage-100 p-5 hover:shadow-card hover:border-sage-200 transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
          <svg
            className="w-6 h-6 text-forest-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-forest-700 group-hover:text-forest-800 transition-colors">
            {prescription.condition}
          </h3>

          {prescription.practitionerName && (
            <p className="text-charcoal text-sm mt-0.5">
              Prescribed by {prescription.practitionerName}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              {prescription.items.length} herbs
            </span>
            {shopLinkedHerbs > 0 && (
              <span className="flex items-center gap-1.5 text-forest-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {shopLinkedHerbs} available in shop
              </span>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 self-center">
          <svg
            className="w-5 h-5 text-sage-300 group-hover:text-forest-700 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
