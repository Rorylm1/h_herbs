/*
  COMING SOON — placeholder component for pages not yet built.
  Shows the page name and a message. Used in Milestone 1 so that
  all navigation links work even before the pages are fully built.
*/

import Link from "next/link";

export default function ComingSoon({
  title,
  milestone,
}: {
  title: string;
  milestone: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 md:py-32 px-4">
      {/* Decorative leaf */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        className="text-sage-200 mb-6"
      >
        <path
          d="M12 3C12 3 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 3 12 3Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <h1 className="font-heading text-3xl md:text-4xl font-semibold text-forest-700 text-center">
        {title}
      </h1>
      <p className="mt-3 text-muted text-center max-w-md">
        This page is coming in Milestone {milestone}. Check back soon.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
