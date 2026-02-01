"use client";

/*
  FILTER SIDEBAR — checkbox/tag filters for the herb shop.

  Allows filtering by category (Tinctures, Teas, etc.) and by
  health concern (Sleep, Anxiety, Digestion, etc.). The parent
  ShopContent component manages the filter state — this component
  renders the UI and calls callbacks when filters change.
*/

const categories = ["Tinctures", "Teas", "Capsules", "Dried Herbs"] as const;

type FilterSidebarProps = {
  allConcerns: string[];
  selectedCategories: string[];
  selectedConcerns: string[];
  onToggleCategory: (category: string) => void;
  onToggleConcern: (concern: string) => void;
  onClearAll: () => void;
};

export default function FilterSidebar({
  allConcerns,
  selectedCategories,
  selectedConcerns,
  onToggleCategory,
  onToggleConcern,
  onClearAll,
}: FilterSidebarProps) {
  const hasFilters =
    selectedCategories.length > 0 || selectedConcerns.length > 0;

  return (
    <aside className="space-y-6">
      {/* Clear all button */}
      {hasFilters && (
        <button
          onClick={onClearAll}
          className="text-sm font-medium text-forest-700 hover:text-forest-800 underline underline-offset-2"
        >
          Clear all filters
        </button>
      )}

      {/* Category checkboxes */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-forest-700 mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="h-4 w-4 rounded border-sage-200 text-forest-700 focus:ring-forest-700"
              />
              <span className="text-sm text-charcoal group-hover:text-forest-700 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Concern tag buttons */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-forest-700 mb-3">
          Health Concern
        </h3>
        <div className="flex flex-wrap gap-2">
          {allConcerns.map((concern) => {
            const isSelected = selectedConcerns.includes(concern);
            return (
              <button
                key={concern}
                onClick={() => onToggleConcern(concern)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-forest-700 text-white"
                    : "bg-sage-50 text-muted hover:bg-sage-100 hover:text-forest-700"
                }`}
              >
                {concern}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
