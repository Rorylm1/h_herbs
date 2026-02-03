/*
  ARTICLE CARD — preview card for Learn/blog articles.

  Shows featured image, category tag, title, author, and excerpt.
  Used on the homepage (latest 3) and the /learn page.
  A small botanical corner accent adds visual warmth.
*/

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { practitioners } from "@/data/practitioners";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

export default function ArticleCard({ article }: { article: Article }) {
  // Look up the author's name from the practitioners data
  const author = practitioners.find((p) => p.slug === article.author);

  return (
    <Link
      href={`/learn/${article.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-card hover:shadow-hover transition-all duration-300 border border-sage-100"
    >
      {/* Featured image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-sage-50">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category tag overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-forest-700/90 px-3 py-1 text-xs font-medium text-white">
          {article.category}
        </span>
        {/* Botanical corner accent */}
        <BotanicalBorder position="bottom-right" className="absolute bottom-0 right-0 w-14 h-14 text-white opacity-20" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-forest-700 group-hover:text-forest-800 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Author + date */}
        <p className="mt-2 text-xs text-muted">
          By {author?.name ?? "Unknown"} &middot;{" "}
          {new Date(article.publishedDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
          Read More
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
  );
}
