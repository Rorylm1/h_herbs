/*
  SECTION HEADING — reusable heading with optional subtitle
  and a decorative botanical divider line beneath it.
  Used at the top of each homepage section.
*/

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
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
      {/* Decorative botanical divider — a simple leaf-like SVG accent */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="h-px w-12 bg-sage-300" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-sage-300"
        >
          <path
            d="M12 3C12 3 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 3 12 3Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="h-px w-12 bg-sage-300" />
      </div>
    </div>
  );
}
