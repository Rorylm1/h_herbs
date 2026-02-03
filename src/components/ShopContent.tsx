"use client";

/*
  SHOP CONTENT — the herb shop page with interactive filters.

  "use client" because we manage filter state (selected categories
  and concerns) with useState. The product grid re-renders as
  filters change, showing only matching products.

  ARCHITECTURE TIP: We use useMemo to derive the filtered product
  list and the unique concerns list. useMemo caches the computation
  so it only recalculates when the dependencies change (the filter
  selections), not on every render.
*/

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";

export default function ShopContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Collect all unique concern tags across products
  const allConcerns = useMemo(() => {
    const concerns = new Set<string>();
    products.forEach((p) => p.concerns.forEach((c) => concerns.add(c)));
    return Array.from(concerns).sort();
  }, []);

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      )
        return false;
      if (
        selectedConcerns.length > 0 &&
        !p.concerns.some((c) => selectedConcerns.includes(c))
      )
        return false;
      return true;
    });
  }, [selectedCategories, selectedConcerns]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedConcerns([]);
  };

  const hasFilters =
    selectedCategories.length > 0 || selectedConcerns.length > 0;

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
        <BotanicalPattern className="absolute inset-0 text-white opacity-[0.04]" patternId="shop-hero-pattern" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Herb Shop
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Quality herbal remedies handpicked by our practitioners. From
            soothing teas to potent tinctures, find the natural support your
            body needs.
          </p>
        </div>
      </section>

      {/* Shop grid with sidebar */}
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm font-medium text-forest-700 hover:bg-sage-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              Filters
              {hasFilters && (
                <span className="rounded-full bg-forest-700 px-1.5 py-0.5 text-[10px] text-white">
                  {selectedCategories.length + selectedConcerns.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar — always visible on desktop, toggleable on mobile */}
            <div
              className={`w-64 shrink-0 ${
                showFilters ? "block" : "hidden"
              } lg:block`}
            >
              <FilterSidebar
                allConcerns={allConcerns}
                selectedCategories={selectedCategories}
                selectedConcerns={selectedConcerns}
                onToggleCategory={toggleCategory}
                onToggleConcern={toggleConcern}
                onClearAll={clearAll}
              />
            </div>

            {/* Product grid */}
            <div className="flex-1">
              {/* Results count */}
              <p className="mb-4 text-sm text-muted">
                Showing {filteredProducts.length} of {products.length} products
                {hasFilters && " (filtered)"}
              </p>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-white border border-sage-100 p-12 text-center">
                  <p className="text-muted">
                    No products match your filters.
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-3 text-sm font-medium text-forest-700 hover:text-forest-800 underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
