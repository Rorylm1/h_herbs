/**
 * HerbIllustration — Individual hand-drawn style botanical illustrations.
 *
 * Simple line-art herb illustrations for decorative use throughout the site.
 * Each herb corresponds to key plants from Hector's practice.
 *
 * Usage:
 *   <HerbIllustration herb="chamomile" className="w-16 h-16 text-sage-200" />
 */

interface HerbIllustrationProps {
  herb: "chamomile" | "elderberry" | "nettle" | "dandelion" | "lavender" | "echinacea";
  className?: string;
}

export default function HerbIllustration({
  herb,
  className = "",
}: HerbIllustrationProps) {
  const illustrations: Record<string, React.ReactNode> = {
    chamomile: (
      <>
        {/* Stem */}
        <path d="M32 58 C32 48, 30 40, 32 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Flower centre */}
        <circle cx="32" cy="24" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="32" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
        {/* Petals radiating out */}
        <path d="M32 20 C31 17, 33 17, 32 14" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M36 22 C39 21, 39 23, 42 22" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M28 22 C25 21, 25 23, 22 22" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M34 27 C36 30, 34 30, 36 33" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M30 27 C28 30, 30 30, 28 33" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M35 21 C37 18, 36 18, 38 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M29 21 C27 18, 28 18, 26 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        {/* Small leaves on stem */}
        <path d="M32 40 C28 38, 26 39, 25 42" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 46 C36 44, 38 45, 39 48" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </>
    ),
    elderberry: (
      <>
        {/* Main stem */}
        <path d="M32 58 C32 48, 30 38, 32 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Berry cluster */}
        <circle cx="28" cy="18" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="32" cy="16" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="36" cy="18" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="30" cy="22" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="34" cy="22" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="32" cy="12" r="1.8" stroke="currentColor" strokeWidth="0.6" fill="none" />
        {/* Berry fill dots */}
        <circle cx="28" cy="18" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="32" cy="16" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="36" cy="18" r="0.6" fill="currentColor" opacity="0.3" />
        {/* Small stem connections */}
        <line x1="32" y1="28" x2="28" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="32" y1="28" x2="36" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="32" y1="28" x2="32" y2="18" stroke="currentColor" strokeWidth="0.5" />
        {/* Leaves */}
        <path d="M32 38 C28 35, 24 36, 22 39" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 44 C36 41, 40 42, 42 45" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </>
    ),
    nettle: (
      <>
        {/* Central stem */}
        <path d="M32 58 C32 48, 32 38, 32 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Paired serrated leaves */}
        <path d="M32 18 C28 14, 22 14, 18 18" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 18 C36 14, 42 14, 46 18" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 26 C28 22, 24 22, 20 26" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 26 C36 22, 40 22, 44 26" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 34 C28 30, 24 30, 21 34" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 34 C36 30, 40 30, 43 34" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 42 C29 39, 26 39, 24 42" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 42 C35 39, 38 39, 40 42" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        {/* Leaf serrations (tiny notches) */}
        <path d="M24 15 L22 14 L24 16" stroke="currentColor" strokeWidth="0.3" fill="none" />
        <path d="M40 15 L42 14 L40 16" stroke="currentColor" strokeWidth="0.3" fill="none" />
      </>
    ),
    dandelion: (
      <>
        {/* Stem */}
        <path d="M32 58 C32 48, 33 40, 32 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Dandelion seed head */}
        <circle cx="32" cy="22" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Radiating seed lines */}
        <line x1="32" y1="22" x2="32" y2="12" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="26" y2="14" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="38" y2="14" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="24" y2="20" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="40" y2="20" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="24" y2="26" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="40" y2="26" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="28" y2="30" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="32" y1="22" x2="36" y2="30" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        {/* Seed tips */}
        <circle cx="32" cy="12" r="0.8" fill="currentColor" />
        <circle cx="26" cy="14" r="0.8" fill="currentColor" />
        <circle cx="38" cy="14" r="0.8" fill="currentColor" />
        <circle cx="24" cy="20" r="0.8" fill="currentColor" />
        <circle cx="40" cy="20" r="0.8" fill="currentColor" />
        {/* Leaf on stem */}
        <path d="M32 42 C28 39, 24 40, 22 43" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </>
    ),
    lavender: (
      <>
        {/* Main stem */}
        <path d="M32 58 C32 48, 31 38, 32 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Flower spike — small paired petals going up */}
        <path d="M30 20 C28 18, 29 16, 31 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M34 20 C36 18, 35 16, 33 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M30 17 C28 15, 29 13, 31 13" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M34 17 C36 15, 35 13, 33 13" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M31 14 C29 12, 30 10, 32 10" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M33 14 C35 12, 34 10, 32 10" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M32 11 C31 9, 32 7, 32 7" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        {/* Narrow leaves */}
        <path d="M32 38 C28 34, 24 34, 20 36" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M32 42 C36 38, 40 38, 44 40" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M32 46 C28 42, 24 42, 22 44" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      </>
    ),
    echinacea: (
      <>
        {/* Stem */}
        <path d="M32 58 C32 48, 31 40, 32 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Cone centre */}
        <ellipse cx="32" cy="22" rx="4" ry="5" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <ellipse cx="32" cy="22" rx="1.5" ry="2" fill="currentColor" opacity="0.2" />
        {/* Drooping petals */}
        <path d="M28 24 C24 28, 22 32, 20 36" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M36 24 C40 28, 42 32, 44 36" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M30 26 C28 30, 26 34, 26 38" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M34 26 C36 30, 38 34, 38 38" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M32 27 C32 32, 32 36, 32 38" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        {/* Small leaves on stem */}
        <path d="M32 42 C28 40, 24 41, 22 44" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M32 48 C36 46, 40 47, 42 50" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {illustrations[herb]}
    </svg>
  );
}
