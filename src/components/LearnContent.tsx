"use client";

/*
  LEARN CONTENT — the Learn hub with interactive category filters.

  "use client" because we manage the active category tab with useState.
  The filtered article list is derived with useMemo — it recalculates
  only when the active tab changes, not on every render.

  ARCHITECTURE TIP: This mirrors ShopContent's pattern, but uses
  horizontal pill-style tabs instead of a sidebar. With only 4
  categories and 6 articles, tabs are simpler and more appropriate
  than checkboxes.
*/

import { useState, useMemo } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "./ArticleCard";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

const categories = [
  "All",
  "Herbal Medicine",
  "Nutrition",
  "Holistic Living",
  "Seasonal Wellness",
] as const;

export default function LearnContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Page hero — dark background with botanical pattern, matching Shop hero */}
      <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="learn-hero-pattern"
        />
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-white opacity-[0.03]"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Learn
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Expert articles from our practitioners on herbal medicine,
            nutrition, holistic living, and seasonal wellness.
          </p>
        </div>
      </section>

      {/* Category tabs + Article grid */}
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Horizontal category filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-forest-700 text-white"
                    : "bg-white text-forest-700 border border-sage-200 hover:bg-sage-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-muted">
            Showing {filteredArticles.length} of {articles.length} articles
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>

          {/* Article grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-sage-100 p-12 text-center">
              <p className="text-muted">No articles in this category yet.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-3 text-sm font-medium text-forest-700 hover:text-forest-800 underline underline-offset-2"
              >
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
