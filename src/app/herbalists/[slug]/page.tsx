/*
  PRACTITIONER PROFILE — /herbalists/[slug]

  DYNAMIC ROUTE: The [slug] folder name tells Next.js this URL
  is variable. Visiting /herbalists/hector passes { slug: "hector" }
  as a param. We look up the matching practitioner from our data.

  Pages are rendered on-demand (not at build time) since data
  lives in the database and can change at any time.
*/

import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Certification, Service, Practitioner } from "@/types";
import PractitionerHero from "@/components/PractitionerHero";
import ServicesTable from "@/components/ServicesTable";
import ReviewCard from "@/components/ReviewCard";
import AvailabilityPreview from "@/components/AvailabilityPreview";
import CertificationsBadges from "@/components/CertificationsBadges";
import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practitioner = await prisma.practitioner.findUnique({
    where: { slug },
  });
  if (!practitioner) return {};
  return {
    title: `${practitioner.name} — ${practitioner.title} | Hector's Herbs`,
    description: practitioner.tagline,
  };
}

export default async function PractitionerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbPractitioner = await prisma.practitioner.findUnique({
    where: { slug },
    include: {
      testimonials: true,
      articles: { include: { author: true } },
    },
  });

  if (!dbPractitioner) {
    notFound();
  }

  const certifications = dbPractitioner.certifications as unknown as Certification[];
  const services = dbPractitioner.services as unknown as Service[];

  const reviews = dbPractitioner.testimonials.map((t) => ({
    clientName: t.clientName,
    rating: 5,
    text: t.text,
    date: t.createdAt.toISOString().split("T")[0],
  }));

  const practitioner = {
    ...dbPractitioner,
    certifications,
    services,
    reviews,
    articleSlugs: dbPractitioner.articles.map((a) => a.slug),
  } as unknown as Practitioner;

  const practitionerArticles = dbPractitioner.articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    author: a.authorSlug,
    authorName: a.author.name,
    category: a.category,
    featuredImage: a.featuredImage,
    excerpt: a.excerpt,
    content: a.content,
    publishedDate: a.publishedDate.toISOString(),
  }));

  return (
    <>
      {/* ── HERO ── */}
      <PractitionerHero practitioner={practitioner} />

      {/* ── ABOUT / BIO ── */}
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
              About {practitioner.name.split(" ")[0]}
            </h2>
            {/* Bio paragraphs — split by \n\n for proper spacing */}
            <div className="mt-4 space-y-4 text-charcoal leading-relaxed">
              {practitioner.bio.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Approach */}
            <div className="mt-8 rounded-xl bg-sage-50 border border-sage-100 p-6">
              <h3 className="font-heading text-xl font-semibold text-forest-700">
                My Approach
              </h3>
              <p className="mt-2 text-charcoal leading-relaxed">
                {practitioner.approach}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALIFICATIONS & CERTIFICATIONS ── */}
      <section className="bg-earth-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Qualifications */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700 mb-5">
                Qualifications
              </h2>
              <ul className="space-y-3">
                {practitioner.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 mt-0.5 text-sage-300 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
                      />
                    </svg>
                    <span className="text-charcoal">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700 mb-5">
                Certifications & Accreditations
              </h2>
              <CertificationsBadges
                certifications={practitioner.certifications}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES & PRICING ── */}
      <section id="services" className="bg-cream py-12 md:py-16 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Services & Pricing"
            subtitle={`Consultations with ${practitioner.name.split(" ")[0]} — all sessions include a personalised herbal prescription.`}
          />
          <ServicesTable
            services={practitioner.services}
            practitionerSlug={practitioner.slug}
            practitionerName={practitioner.name}
          />
        </div>
      </section>

      {/* ── AVAILABILITY ── */}
      <section className="bg-earth-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Availability"
            subtitle="A snapshot of a typical week. Book a session to see real-time availability."
          />
          <div className="max-w-2xl mx-auto">
            <AvailabilityPreview
              practitionerName={practitioner.name.split(" ")[0]}
            />
          </div>
        </div>
      </section>

      {/* ── CLIENT REVIEWS ── */}
      {practitioner.reviews.length > 0 && (
        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Client Reviews"
              subtitle={`What clients say about working with ${practitioner.name.split(" ")[0]}.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {practitioner.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLES BY THIS PRACTITIONER ── */}
      {practitionerArticles.length > 0 && (
        <section className="bg-earth-100 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={`Articles by ${practitioner.name.split(" ")[0]}`}
              subtitle="Explore their writing on herbal medicine, nutrition, and holistic living."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {practitionerArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY BOTTOM CTA ── */}
      <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-sm border-t border-sage-200/50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-heading text-lg font-semibold text-forest-700">
              {practitioner.name}
            </p>
            <p className="text-sm text-muted">
              From £{Math.min(...practitioner.services.map((s) => s.price))} per
              session
            </p>
          </div>
          <Link
            href={`/book?practitioner=${practitioner.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-forest-700 px-6 py-3 font-body text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors sm:ml-auto"
          >
            Book with {practitioner.name.split(" ")[0]}
          </Link>
        </div>
      </div>
    </>
  );
}
