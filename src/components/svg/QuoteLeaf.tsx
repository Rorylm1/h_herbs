/**
 * QuoteLeaf — Decorative quotation mark combined with a small botanical accent.
 *
 * Replaces the plain quote mark SVG in TestimonialCarousel and ReviewCard.
 * A stylised open-quote with small leaf sprigs curving off it.
 */

interface QuoteLeafProps {
  className?: string;
}

export default function QuoteLeaf({ className = "" }: QuoteLeafProps) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left quote mark */}
      <path
        d="M4 24 C4 16, 8 10, 16 8 L16 12 C12 14, 10 18, 10 22 L16 22 L16 32 L4 32 Z"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Right quote mark */}
      <path
        d="M24 24 C24 16, 28 10, 36 8 L36 12 C32 14, 30 18, 30 22 L36 22 L36 32 L24 32 Z"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Small leaf accent curving off the right side */}
      <path
        d="M38 26 C40 23, 43 22, 45 24"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M38 26 C40 29, 43 30, 45 28"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      {/* Tiny leaf on left bottom */}
      <path
        d="M2 34 C4 32, 6 32, 7 34"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
