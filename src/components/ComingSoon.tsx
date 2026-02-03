/*
  COMING SOON — placeholder component for pages not yet built.
  Shows the page name and a message. Used in Milestone 1 so that
  all navigation links work even before the pages are fully built.
*/

import Link from "next/link";
import DandelionLogo from "@/components/svg/DandelionLogo";
import BotanicalPattern from "@/components/svg/BotanicalPattern";

export default function ComingSoon({
  title,
  milestone,
}: {
  title: string;
  milestone: number;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden">
      {/* Subtle background pattern */}
      <BotanicalPattern className="absolute inset-0 text-sage-300 opacity-[0.03]" patternId="coming-soon-pattern" />
      {/* Dandelion logo — seeds dispersing, a nice visual for "coming soon" */}
      <DandelionLogo variant="full" className="h-12 w-32 text-sage-200 mb-6" />

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
