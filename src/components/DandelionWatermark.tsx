/**
 * DandelionWatermark — Low-opacity background dandelion motif.
 *
 * Places the DandelionLogo (full variant) as a very subtle watermark behind
 * content sections. Adds visual depth without competing with foreground content.
 *
 * The parent element must have `position: relative` and `overflow: hidden`.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <DandelionWatermark position="right" size="lg" />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 */

import DandelionLogo from "@/components/svg/DandelionLogo";

interface DandelionWatermarkProps {
  className?: string;
  position?: "center" | "left" | "right";
  size?: "sm" | "md" | "lg";
}

export default function DandelionWatermark({
  className = "",
  position = "center",
  size = "md",
}: DandelionWatermarkProps) {
  const positionClasses: Record<string, string> = {
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    left: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/4",
    right: "right-0 top-1/2 -translate-y-1/2 translate-x-1/4",
  };

  const sizeClasses: Record<string, string> = {
    sm: "w-32 h-32 md:w-48 md:h-48",
    md: "w-48 h-48 md:w-72 md:h-72",
    lg: "w-64 h-64 md:w-96 md:h-96",
  };

  return (
    <div
      className={`watermark opacity-[0.04] ${positionClasses[position]} ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <DandelionLogo variant="full" className="w-full h-full text-current" />
    </div>
  );
}
