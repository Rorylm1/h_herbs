/**
 * VideoPlaceholder — Homepage section for Hector's intro video.
 *
 * Displays a 16:9 video poster image with a centred play button overlay.
 * For now the video doesn't actually play — it's a visual placeholder
 * that shows "Video coming soon" on click. The real video will be added
 * once Hector records it.
 *
 * Architecture note: This is a client component because of the onClick handler.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

export default function VideoPlaceholder() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Botanical corner accents */}
      <div className="absolute -top-4 -left-4 z-10">
        <BotanicalBorder position="top-left" className="w-16 h-16 md:w-20 md:h-20 text-sage-200" />
      </div>
      <div className="absolute -bottom-4 -right-4 z-10">
        <BotanicalBorder position="bottom-right" className="w-16 h-16 md:w-20 md:h-20 text-sage-200" />
      </div>

      {/* Video container */}
      <div
        className="relative aspect-video overflow-hidden rounded-xl shadow-card cursor-pointer group"
        onClick={() => setClicked(true)}
      >
        {/* Poster image */}
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop"
          alt="Hector's herbal medicine workspace"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 896px"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-forest-900/40 transition-opacity duration-300 group-hover:bg-forest-900/50" />

        {/* Play button or coming soon message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {!clicked ? (
            <>
              {/* Play button circle */}
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/90 shadow-modal transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-8 w-8 md:h-10 md:w-10 text-forest-700 ml-1"
                >
                  <path
                    d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="mt-4 text-white/90 font-body text-sm tracking-wide uppercase">
                Watch Hector&apos;s Introduction
              </p>
            </>
          ) : (
            <div className="text-center px-6">
              <p className="text-white font-heading text-2xl md:text-3xl font-semibold">
                Video Coming Soon
              </p>
              <p className="mt-2 text-white/70 font-body text-sm">
                Hector is recording an introduction to the practice and philosophy behind Hector&apos;s Herbs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
