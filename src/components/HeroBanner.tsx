/*
  HERO BANNER — the large banner at the top of the homepage.

  Uses a CSS gradient overlay on top of a background colour
  to create depth. In production you'd add a real background image.
  For the prototype, we use gradients that evoke the forest/nature feel.
*/

import Link from "next/link";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-forest-800">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 via-forest-800/80 to-sage-300/20" />

      {/* Botanical pattern — richer hand-drawn tile pattern replaces simple dots */}
      <BotanicalPattern className="absolute inset-0 text-white opacity-[0.06]" patternId="hero-botanical" />

      {/* Dandelion watermark on the right side */}
      <DandelionWatermark position="right" size="lg" className="text-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Latin tagline — the healing power of nature */}
          <p className="font-heading italic text-sage-200/60 text-sm tracking-wide mb-3">
            Vis medicatrix naturae
          </p>
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
