/**
 * BotanicalDivider — Decorative horizontal section divider.
 *
 * A central dandelion seed motif flanked by hand-drawn herb sprigs.
 * Replaces the old simple leaf divider in SectionHeading.
 *
 * Variants:
 *  - "simple" — centre circle + horizontal lines (subtle)
 *  - "elaborate" — full herb sprig composition with leaves
 */

interface BotanicalDividerProps {
  className?: string;
  variant?: "simple" | "elaborate";
}

export default function BotanicalDivider({
  className = "",
  variant = "simple",
}: BotanicalDividerProps) {
  if (variant === "elaborate") {
    return (
      <svg
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Left horizontal line */}
        <line x1="10" y1="12" x2="70" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        {/* Left herb sprigs — small leaf pairs curving outward */}
        <path d="M72 12 C68 8, 62 7, 58 9" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M72 12 C68 16, 62 17, 58 15" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M78 12 C75 9, 70 9, 67 10" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M78 12 C75 15, 70 15, 67 14" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        {/* Tiny leaf details on left side */}
        <path d="M65 8.5 C63 7, 61 7.5, 60 9" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        <path d="M65 15.5 C63 17, 61 16.5, 60 15" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        {/* Centre dandelion seed motif */}
        <circle cx="100" cy="12" r="3" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="100" cy="12" r="1" fill="currentColor" opacity="0.5" />
        {/* Small radiating lines from centre */}
        <line x1="100" y1="9" x2="100" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <line x1="103" y1="10" x2="105" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <line x1="97" y1="10" x2="95" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        {/* Right herb sprigs — mirrored */}
        <path d="M128 12 C132 8, 138 7, 142 9" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M128 12 C132 16, 138 17, 142 15" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M122 12 C125 9, 130 9, 133 10" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M122 12 C125 15, 130 15, 133 14" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        {/* Tiny leaf details on right side */}
        <path d="M135 8.5 C137 7, 139 7.5, 140 9" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        <path d="M135 15.5 C137 17, 139 16.5, 140 15" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        {/* Right horizontal line */}
        <line x1="130" y1="12" x2="190" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    );
  }

  // Simple variant — clean centre dot with lines and small leaf accents
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left line */}
      <line x1="30" y1="12" x2="85" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Left small leaf */}
      <path d="M88 12 C86 9, 83 9, 82 11" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M88 12 C86 15, 83 15, 82 13" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      {/* Centre seed motif */}
      <circle cx="100" cy="12" r="2.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="100" cy="12" r="0.8" fill="currentColor" opacity="0.5" />
      {/* Right small leaf */}
      <path d="M112 12 C114 9, 117 9, 118 11" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M112 12 C114 15, 117 15, 118 13" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      {/* Right line */}
      <line x1="115" y1="12" x2="170" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
