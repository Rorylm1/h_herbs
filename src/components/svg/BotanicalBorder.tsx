/**
 * BotanicalBorder — Corner botanical illustration for framing sections and cards.
 *
 * An L-shaped cluster of herb leaves and a small flower. One base SVG is drawn
 * for top-left, then mirrored via CSS transform for other corners.
 *
 * Usage:
 *   <BotanicalBorder position="top-left" className="w-20 h-20 text-sage-200" />
 *   <BotanicalBorder position="bottom-right" className="w-16 h-16 text-sage-100" />
 */

interface BotanicalBorderProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function BotanicalBorder({
  className = "",
  position = "top-left",
}: BotanicalBorderProps) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
  };

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: transforms[position] }}
      aria-hidden="true"
    >
      {/* Main branch running along the top-left corner */}
      <path
        d="M8 4 C20 6, 40 8, 60 6"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M4 8 C6 20, 8 40, 6 60"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Leaves along the top branch */}
      <path
        d="M20 6 C18 2, 14 1, 12 3"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 7 C29 3, 25 1, 23 4"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 7 C39 3, 36 2, 34 5"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50 6 C50 2, 47 1, 45 4"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaves along the left branch */}
      <path
        d="M6 20 C2 18, 1 14, 3 12"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M7 30 C3 29, 1 25, 4 23"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M7 40 C3 39, 2 36, 5 34"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M6 50 C2 50, 1 47, 4 45"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Small flower at the corner junction */}
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" opacity="0.4" />
      {/* Tiny dots along branches for texture */}
      <circle cx="15" cy="5" r="0.4" fill="currentColor" opacity="0.3" />
      <circle cx="25" cy="5" r="0.4" fill="currentColor" opacity="0.3" />
      <circle cx="35" cy="6" r="0.4" fill="currentColor" opacity="0.3" />
      <circle cx="5" cy="15" r="0.4" fill="currentColor" opacity="0.3" />
      <circle cx="5" cy="25" r="0.4" fill="currentColor" opacity="0.3" />
      <circle cx="6" cy="35" r="0.4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
