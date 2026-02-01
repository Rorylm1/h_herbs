/*
  REVIEW CARD — displays a single client review with star rating.

  Star ratings are rendered as SVGs. Filled stars = gold,
  empty stars = grey outline. Supports half-star values but
  our dummy data uses whole numbers for simplicity.
*/

import type { Review } from "@/data/practitioners";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={star <= rating ? 0 : 1.5}
          className={`h-5 w-5 ${
            star <= rating ? "text-earth-400" : "text-sage-200"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-white border border-sage-100 p-6 shadow-card">
      <StarRating rating={review.rating} />
      <blockquote className="mt-3 text-sm text-charcoal leading-relaxed italic">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-forest-700">
          {review.clientName}
        </p>
        <p className="text-xs text-muted">
          {new Date(review.date).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
