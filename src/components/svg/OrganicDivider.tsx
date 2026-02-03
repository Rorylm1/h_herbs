/**
 * OrganicDivider — Full-width organic shapes for section transitions.
 *
 * Replaces hard horizontal lines between sections with natural wave/vine shapes.
 * Uses preserveAspectRatio="none" to stretch across any container width.
 *
 * Variants:
 *  - "wave" — gentle organic wave shape
 *  - "leaf-vine" — horizontal vine with small leaves
 *
 * Set flip={true} to mirror vertically (use at the top vs bottom of a section).
 */

interface OrganicDividerProps {
  className?: string;
  variant?: "wave" | "leaf-vine";
  flip?: boolean;
}

export default function OrganicDivider({
  className = "",
  variant = "wave",
  flip = false,
}: OrganicDividerProps) {
  if (variant === "leaf-vine") {
    return (
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={className}
        style={flip ? { transform: "scaleY(-1)" } : undefined}
        aria-hidden="true"
      >
        {/* Central vine running across */}
        <path
          d="M0 20 C120 18, 240 22, 360 20 C480 18, 600 22, 720 20 C840 18, 960 22, 1080 20 C1200 18, 1320 22, 1440 20"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.3"
          strokeLinecap="round"
        />
        {/* Small leaves at intervals */}
        <path d="M180 20 C178 16, 174 16, 172 18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M180 20 C178 24, 174 24, 172 22" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M540 20 C538 16, 534 16, 532 18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M540 20 C538 24, 534 24, 532 22" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M900 20 C898 16, 894 16, 892 18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M900 20 C898 24, 894 24, 892 22" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M1260 20 C1258 16, 1254 16, 1252 18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
        <path d="M1260 20 C1258 24, 1254 24, 1252 22" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" strokeLinecap="round" />
      </svg>
    );
  }

  // Wave variant — gentle organic wave
  return (
    <svg
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M0 24 C180 8, 360 40, 540 24 C720 8, 900 40, 1080 24 C1260 8, 1380 32, 1440 24"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 28 C200 12, 400 44, 600 28 C800 12, 1000 44, 1200 28 C1360 16, 1420 36, 1440 28"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.08"
        fill="none"
      />
    </svg>
  );
}
