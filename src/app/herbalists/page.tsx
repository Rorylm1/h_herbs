/*
  HERBALISTS DIRECTORY — /herbalists

  Lists all practitioners in a grid. This replaces the Milestone 1
  placeholder. Uses the same PractitionerCard component from the
  homepage, plus a hero banner at the top.
*/

import { practitioners } from "@/data/practitioners";
import PractitionerCard from "@/components/PractitionerCard";
import SectionHeading from "@/components/SectionHeading";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

export const metadata = {
  title: "Our Herbalists | Hector's Herbs",
  description:
    "Meet our team of qualified naturopathic herbalists. Each practitioner brings unique expertise to help you on your health journey.",
};

export default function HerbalistsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
        <BotanicalPattern className="absolute inset-0 text-white opacity-[0.04]" patternId="herbalists-hero-pattern" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Our Herbalists
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Our team of qualified practitioners each bring unique expertise,
            specialities, and a shared commitment to helping you achieve optimal
            health through the power of herbal medicine.
          </p>
        </div>
      </section>

      {/* Practitioner grid */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {practitioners.map((p) => (
              <PractitionerCard key={p.slug} practitioner={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative bg-sage-50 py-12 md:py-16 overflow-hidden">
        <DandelionWatermark position="right" size="md" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
            Not sure who to book with?
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Every practitioner offers an initial consultation. Tell us about your
            health concerns and we&apos;ll recommend the best match for you.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-forest-700 px-6 py-3 font-body text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
          >
            Get a Recommendation
          </a>
        </div>
      </section>
    </>
  );
}
