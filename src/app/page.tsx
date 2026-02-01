/*
  HOMEPAGE — the main landing page at /

  This is a "Server Component" (no "use client" needed) because it
  just renders HTML. The interactive parts (carousel, header) are
  separate client components imported into this static page.

  Sections top-to-bottom:
  1. Hero banner
  2. Pathway cards (Book / Shop / Learn)
  3. Featured practitioners (3 cards)
  4. Testimonial carousel
  5. Latest articles (3 cards)
  6. Newsletter CTA
*/

import HeroBanner from "@/components/HeroBanner";
import PathwayCard from "@/components/PathwayCard";
import PractitionerCard from "@/components/PractitionerCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import { practitioners } from "@/data/practitioners";
import { articles } from "@/data/articles";

export default function Home() {
  // Show first 3 practitioners and latest 3 articles on homepage
  const featuredPractitioners = practitioners.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <HeroBanner />

      {/* ── PATHWAY CARDS ── */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How Can We Help?"
            subtitle="Whether you're seeking personalised herbal care, quality remedies, or knowledge about natural health — we're here for you."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <PathwayCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              }
              title="Book a Consultation"
              description="Meet one-on-one with an experienced herbalist. Get a personalised herbal prescription tailored to your health needs."
              href="/book"
              cta="Book Now"
            />
            <PathwayCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              }
              title="Browse Our Herbs"
              description="Explore our carefully curated range of tinctures, teas, capsules, and dried herbs — all sourced for quality and potency."
              href="/shop"
              cta="Visit the Shop"
            />
            <PathwayCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
              title="Learn About Herbal Medicine"
              description="Discover the science and tradition behind herbal remedies. Free articles on nutrition, holistic living, and seasonal wellness."
              href="/learn"
              cta="Start Reading"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED PRACTITIONERS ── */}
      <section className="bg-earth-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our Herbalists"
            subtitle="Our team of qualified practitioners each bring unique expertise and a shared commitment to your wellbeing."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredPractitioners.map((p) => (
              <PractitionerCard key={p.slug} practitioner={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real stories from people who've experienced the power of personalised herbal medicine."
          />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── LATEST ARTICLES ── */}
      <section className="bg-earth-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="From Our Journal"
            subtitle="Expert insights on herbal medicine, nutrition, and natural living from our team of practitioners."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="bg-forest-800 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Stay Rooted in Wellness
          </h2>
          <p className="mt-3 text-sage-200/70 max-w-xl mx-auto">
            Join our newsletter for seasonal herbal tips, exclusive offers, and
            the latest articles from our practitioners.
          </p>
          <form
            action="#"
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-lg bg-forest-900/50 border border-forest-700 px-4 py-3 text-sm text-white placeholder:text-sage-200/40 focus:outline-none focus:ring-2 focus:ring-sage-300"
            />
            <button
              type="submit"
              className="rounded-lg bg-sage-200 px-6 py-3 text-sm font-semibold text-forest-800 uppercase tracking-wide hover:bg-sage-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-sage-200/40">
            No spam, ever. Unsubscribe any time.
          </p>
        </div>
      </section>
    </>
  );
}
