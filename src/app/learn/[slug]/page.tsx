/*
  ARTICLE DETAIL PAGE — /learn/[slug]

  ARCHITECTURE TIP: Like the product detail page, this uses
  generateStaticParams() for Static Site Generation — Next.js
  pre-builds a page for each article at build time. The page
  is a server component (fast, SEO-friendly, no JavaScript
  shipped to the browser).

  The content field in our article data uses a lightweight
  markup format: paragraphs separated by \n\n, ## headings,
  ### subheadings, and **bold** text. Rather than installing
  a full markdown library, we use a simple parser that handles
  just these patterns — ideal for a prototype.
*/

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { practitioners } from "@/data/practitioners";
import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import DandelionWatermark from "@/components/DandelionWatermark";

/* ── Content parser ─────────────────────────────────────────
   Splits the article content string into structured blocks
   (headings, subheadings, paragraphs) and handles **bold**
   inline formatting.
*/

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string };

function parseArticleContent(content: string): ContentBlock[] {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("### ")) {
        return { type: "subheading" as const, text: trimmed.replace(/^###\s+/, "") };
      }
      if (trimmed.startsWith("## ")) {
        return { type: "heading" as const, text: trimmed.replace(/^##\s+/, "") };
      }
      return { type: "paragraph" as const, text: trimmed };
    })
    .filter((block): block is ContentBlock => block !== null);
}

function renderTextWithBold(text: string): React.ReactNode {
  // Split on **bold** markers — odd-indexed segments are the bold parts
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

/* ── SSG functions ──────────────────────────────────────────── */

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Hector's Herbs`,
    description: article.excerpt,
  };
}

/* ── Page component ─────────────────────────────────────────── */

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const author = practitioners.find((p) => p.slug === article.author);

  // Related articles: same category, excluding this one, max 3
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const contentBlocks = parseArticleContent(article.content);

  const formattedDate = new Date(article.publishedDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      {/* Article hero — featured image with gradient overlay */}
      <section className="relative bg-forest-800">
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-forest-900/20" />

          {/* Content positioned at the bottom of the hero image */}
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
              {/* Breadcrumb */}
              <nav className="text-sm text-sage-200/70 mb-4">
                <Link
                  href="/learn"
                  className="hover:text-white transition-colors"
                >
                  Learn
                </Link>
                <span className="mx-2">/</span>
                <span className="text-sage-200/50">{article.title}</span>
              </nav>

              {/* Category badge */}
              <span className="inline-block rounded-full bg-forest-700/90 px-3 py-1 text-xs font-medium text-white">
                {article.category}
              </span>

              <h1 className="mt-3 font-heading text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
                {article.title}
              </h1>

              {/* Author + date */}
              <p className="mt-4 text-sage-200/70 text-sm md:text-base">
                By {author?.name ?? "Unknown"} &middot; {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {contentBlocks.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="font-heading text-2xl md:text-3xl font-semibold text-forest-700 mt-10 first:mt-0 mb-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "subheading") {
                return (
                  <h3
                    key={i}
                    className="font-heading text-xl md:text-2xl font-semibold text-forest-700 mt-8 mb-3"
                  >
                    {block.text}
                  </h3>
                );
              }
              return (
                <p
                  key={i}
                  className="text-charcoal leading-relaxed mb-4"
                >
                  {renderTextWithBold(block.text)}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author card — links to practitioner profile */}
      {author && (
        <section className="bg-earth-100 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Link
                href={`/herbalists/${author.slug}`}
                className="group relative flex items-center gap-5 rounded-xl bg-white border border-sage-100 p-6 hover:shadow-hover transition-all overflow-hidden"
              >
                <BotanicalBorder
                  position="top-right"
                  className="absolute top-0 right-0 w-14 h-14 text-sage-200 opacity-30"
                />
                <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">
                    Written by
                  </p>
                  <p className="font-heading text-xl font-semibold text-forest-700 group-hover:text-forest-800 transition-colors">
                    {author.name}
                  </p>
                  <p className="text-sm text-muted">{author.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
                    View Profile
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
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={`More in ${article.category}`}
              subtitle="Continue exploring articles in this category."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
