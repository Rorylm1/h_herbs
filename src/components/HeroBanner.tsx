/*
  HERO BANNER — the large banner at the top of the homepage.

  Uses a CSS gradient overlay on top of a background colour
  to create depth. In production you'd add a real background image.
  For the prototype, we use gradients that evoke the forest/nature feel.
*/

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-forest-800">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 via-forest-800/80 to-sage-300/20" />

      {/* Decorative botanical pattern — subtle SVG circles */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-leaves"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="1.5" fill="white" />
              <path
                d="M20 10 C20 10 15 18 15 22 C15 25 17 27 20 27 C23 27 25 25 25 22 C25 18 20 10 20 10Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <path
                d="M60 50 C60 50 55 58 55 62 C55 65 57 67 60 67 C63 67 65 65 65 62 C65 58 60 50 60 50Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-leaves)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Natural healing,
            <br />
            <span className="text-sage-200">rooted in tradition</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-sage-100/80 leading-relaxed max-w-xl">
            Trained Naturopathic Herbalists providing personalised herbal
            remedies to help you regain your health and get to the root cause
            of your symptoms.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-lg bg-sage-200 px-6 py-3 font-body text-sm font-semibold text-forest-800 uppercase tracking-wide hover:bg-sage-300 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/herbalists"
              className="inline-flex items-center justify-center rounded-lg border border-sage-200/40 px-6 py-3 font-body text-sm font-semibold text-sage-200 uppercase tracking-wide hover:bg-white/10 transition-colors"
            >
              Meet Our Herbalists
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
