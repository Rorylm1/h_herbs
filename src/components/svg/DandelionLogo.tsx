/**
 * DandelionLogo — The primary Hector's Herbs brand mark.
 *
 * A hand-drawn style dandelion head with seeds dispersing upward/right.
 * Uses currentColor so you can set the colour with Tailwind text classes
 * e.g. <DandelionLogo className="text-forest-700 h-8 w-8" />
 *
 * Variants:
 *  - "icon" — compact dandelion head + seeds (square, good for header)
 *  - "full" — wider composition with stem (good for watermarks/decorative)
 */

interface DandelionLogoProps {
  className?: string;
  variant?: "icon" | "full";
}

export default function DandelionLogo({
  className = "",
  variant = "icon",
}: DandelionLogoProps) {
  if (variant === "full") {
    return (
      <svg
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Stem */}
        <path
          d="M40 46 C40 36, 42 30, 40 20"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Dandelion head — cluster of small lines radiating out */}
        <line x1="40" y1="20" x2="36" y2="12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="40" y2="10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="44" y2="11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="34" y2="16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="46" y2="15" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="48" y2="19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        {/* Seed tips — small circles at the end of each spoke */}
        <circle cx="36" cy="12" r="0.8" fill="currentColor" />
        <circle cx="40" cy="10" r="0.8" fill="currentColor" />
        <circle cx="44" cy="11" r="0.8" fill="currentColor" />
        <circle cx="34" cy="16" r="0.8" fill="currentColor" />
        <circle cx="46" cy="15" r="0.8" fill="currentColor" />
        <circle cx="48" cy="19" r="0.8" fill="currentColor" />
        <circle cx="33" cy="20" r="0.8" fill="currentColor" />
        {/* Dispersing seeds floating away to the right */}
        {/* Each seed: a tiny line (stem) + small starburst (pappus) */}
        <g opacity="0.7">
          <line x1="56" y1="14" x2="58" y2="12" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
          <circle cx="58" cy="12" r="1.5" stroke="currentColor" strokeWidth="0.4" fill="none" />
          <line x1="58" y1="10.5" x2="58" y2="9.5" stroke="currentColor" strokeWidth="0.3" />
          <line x1="56.7" y1="11" x2="56" y2="10.3" stroke="currentColor" strokeWidth="0.3" />
          <line x1="59.3" y1="11" x2="60" y2="10.3" stroke="currentColor" strokeWidth="0.3" />
        </g>
        <g opacity="0.55">
          <line x1="68" y1="8" x2="70" y2="6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
          <circle cx="70" cy="6" r="1.8" stroke="currentColor" strokeWidth="0.4" fill="none" />
          <line x1="70" y1="4.2" x2="70" y2="3" stroke="currentColor" strokeWidth="0.3" />
          <line x1="68.5" y1="4.8" x2="67.7" y2="3.8" stroke="currentColor" strokeWidth="0.3" />
          <line x1="71.5" y1="4.8" x2="72.3" y2="3.8" stroke="currentColor" strokeWidth="0.3" />
        </g>
        <g opacity="0.4">
          <line x1="80" y1="12" x2="82" y2="10" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="82" cy="10" r="1.5" stroke="currentColor" strokeWidth="0.35" fill="none" />
          <line x1="82" y1="8.5" x2="82" y2="7.5" stroke="currentColor" strokeWidth="0.25" />
          <line x1="80.8" y1="9" x2="80.2" y2="8.2" stroke="currentColor" strokeWidth="0.25" />
          <line x1="83.2" y1="9" x2="83.8" y2="8.2" stroke="currentColor" strokeWidth="0.25" />
        </g>
        <g opacity="0.5">
          <line x1="64" y1="18" x2="66" y2="16" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="66" cy="16" r="1.3" stroke="currentColor" strokeWidth="0.35" fill="none" />
          <line x1="66" y1="14.7" x2="66" y2="13.8" stroke="currentColor" strokeWidth="0.25" />
          <line x1="64.9" y1="15.2" x2="64.3" y2="14.5" stroke="currentColor" strokeWidth="0.25" />
          <line x1="67.1" y1="15.2" x2="67.7" y2="14.5" stroke="currentColor" strokeWidth="0.25" />
        </g>
        <g opacity="0.3">
          <line x1="90" y1="6" x2="92" y2="4" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" />
          <circle cx="92" cy="4" r="1.2" stroke="currentColor" strokeWidth="0.3" fill="none" />
          <line x1="92" y1="2.8" x2="92" y2="2" stroke="currentColor" strokeWidth="0.2" />
        </g>
        {/* Small leaf pair on the stem */}
        <path
          d="M40 34 C37 32, 35 33, 34 35"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M40 36 C43 34, 45 35, 46 37"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Icon variant — compact, square
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stem */}
      <path
        d="M22 46 C22 38, 23 32, 22 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Dandelion head — radiating spokes */}
      <line x1="22" y1="24" x2="18" y2="16" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="22" y2="14" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="26" y2="15" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="16" y2="20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="28" y2="19" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="30" y2="23" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="22" y1="24" x2="15" y2="24" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {/* Seed tips */}
      <circle cx="18" cy="16" r="1" fill="currentColor" />
      <circle cx="22" cy="14" r="1" fill="currentColor" />
      <circle cx="26" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="20" r="1" fill="currentColor" />
      <circle cx="28" cy="19" r="1" fill="currentColor" />
      <circle cx="30" cy="23" r="1" fill="currentColor" />
      <circle cx="15" cy="24" r="1" fill="currentColor" />
      {/* Two dispersing seeds */}
      <g opacity="0.6">
        <line x1="34" y1="14" x2="36" y2="11" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <circle cx="36" cy="11" r="1.5" stroke="currentColor" strokeWidth="0.4" fill="none" />
        <line x1="36" y1="9.5" x2="36" y2="8.5" stroke="currentColor" strokeWidth="0.3" />
        <line x1="34.7" y1="10" x2="34" y2="9.2" stroke="currentColor" strokeWidth="0.3" />
        <line x1="37.3" y1="10" x2="38" y2="9.2" stroke="currentColor" strokeWidth="0.3" />
      </g>
      <g opacity="0.4">
        <line x1="38" y1="6" x2="40" y2="4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
        <circle cx="40" cy="4" r="1.2" stroke="currentColor" strokeWidth="0.35" fill="none" />
        <line x1="40" y1="2.8" x2="40" y2="2" stroke="currentColor" strokeWidth="0.25" />
        <line x1="39" y1="3.2" x2="38.4" y2="2.5" stroke="currentColor" strokeWidth="0.25" />
        <line x1="41" y1="3.2" x2="41.6" y2="2.5" stroke="currentColor" strokeWidth="0.25" />
      </g>
      {/* Small leaf on stem */}
      <path
        d="M22 36 C19 34, 17 35, 16 37"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
