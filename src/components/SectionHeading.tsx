/*
  SECTION HEADING — reusable heading with optional subtitle
  and a decorative botanical divider line beneath it.
  Used at the top of each homepage section.

  The divider uses the BotanicalDivider SVG component which renders
  a central dandelion seed motif flanked by hand-drawn herb sprigs.
*/

import BotanicalDivider from "@/components/svg/BotanicalDivider";

export default function SectionHeading({
  title,
  subtitle,
  dividerVariant = "simple",
}: {
  title: string;
  subtitle?: string;
  dividerVariant?: "simple" | "elaborate";
}) {
  return (
    <div className="text-center mb-10 md:mb-12">
      <h2 className="font-heading text-3xl md:text-4xl font-semibold text-forest-700">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative botanical divider — dandelion seed motif with herb sprigs */}
      <div className="flex items-center justify-center mt-5">
        <BotanicalDivider variant={dividerVariant} className="w-48 md:w-56 text-sage-300" />
      </div>
    </div>
  );
}
