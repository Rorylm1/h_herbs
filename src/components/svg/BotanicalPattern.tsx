/**
 * BotanicalPattern — Repeatable tile pattern for subtle background textures.
 *
 * Renders an SVG with a <defs><pattern> containing small botanical motifs
 * (tiny leaves, dots, seed shapes). The pattern fills a full-width/height rect.
 *
 * Usage:
 *   <div className="relative">
 *     <BotanicalPattern className="absolute inset-0 text-white opacity-[0.03]" />
 *     <div className="relative z-10">...content...</div>
 *   </div>
 */

interface BotanicalPatternProps {
  className?: string;
  patternId?: string;
}

export default function BotanicalPattern({
  className = "",
  patternId = "botanical-tile",
}: BotanicalPatternProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Small leaf pair — top left area */}
          <path
            d="M10 8 C8 5, 5 5, 4 7"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M10 8 C8 11, 5 11, 4 9"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Small dot cluster — centre */}
          <circle cx="30" cy="30" r="0.8" fill="currentColor" />
          <circle cx="32" cy="28" r="0.5" fill="currentColor" opacity="0.6" />
          <circle cx="28" cy="29" r="0.5" fill="currentColor" opacity="0.6" />
          {/* Tiny dandelion seed — bottom right area */}
          <line x1="48" y1="46" x2="50" y2="43" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="50" cy="43" r="1.2" stroke="currentColor" strokeWidth="0.3" fill="none" />
          <line x1="50" y1="41.8" x2="50" y2="41" stroke="currentColor" strokeWidth="0.2" />
          {/* Small leaf — bottom left */}
          <path
            d="M15 48 C13 45, 10 45, 9 47"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tiny dot — top right */}
          <circle cx="50" cy="12" r="0.6" fill="currentColor" opacity="0.4" />
          {/* Single small leaf — right side */}
          <path
            d="M52 25 C50 22, 47 23, 47 25"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
