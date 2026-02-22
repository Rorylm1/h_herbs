"use client";

/*
  PRODUCT FORM — reusable form for creating and editing products.

  ARCHITECTURE TIP: This component is used by both the "new product"
  and "edit product" pages. The `initialData` prop is empty for create
  mode and pre-populated for edit mode. The `onSubmit` callback lets
  each page handle the API call differently (POST vs PUT).

  The slug is auto-generated from the product name (lowercase, hyphened)
  during creation, but locked during editing since it's the primary key.
*/

import { useState, useEffect, type FormEvent } from "react";

const CATEGORIES = ["Tinctures", "Teas", "Capsules", "Dried Herbs"];

const CONCERN_OPTIONS = [
  "Sleep & Relaxation",
  "Digestive Health",
  "Immune Support",
  "Stress & Anxiety",
  "Energy & Vitality",
  "Joint & Muscle",
  "Skin Health",
  "Women's Health",
  "Men's Health",
  "Heart & Circulation",
  "Respiratory Health",
  "Detox & Cleansing",
];

export type ProductFormData = {
  slug: string;
  name: string;
  category: string;
  concerns: string[];
  price: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  usage: string;
  latinName: string;
  recommendedBy: string;
};

type ProductFormProps = {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isEditing?: boolean;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const inputClasses =
  "w-full rounded-lg border border-sage-200 px-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 focus:outline-none transition-colors";

const labelClasses = "block text-sm font-medium text-charcoal mb-1.5";

export default function ProductForm({
  initialData,
  onSubmit,
  isEditing = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
    category: initialData?.category || CATEGORIES[0],
    concerns: initialData?.concerns || [],
    price: initialData?.price || "",
    image: initialData?.image || "",
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    ingredients: initialData?.ingredients || "",
    usage: initialData?.usage || "",
    latinName: initialData?.latinName || "",
    recommendedBy: initialData?.recommendedBy || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing && formData.name) {
      setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
    }
  }, [formData.name, isEditing]);

  function updateField(field: keyof ProductFormData, value: string | string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleConcern(concern: string) {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Basic info section */}
      <div className="bg-white rounded-2xl border border-sage-100 p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-forest-700">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Chamomile Calm Tea"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="slug" className={labelClasses}>
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              disabled={isEditing}
              placeholder="auto-generated-from-name"
              className={`${inputClasses} ${isEditing ? "bg-sage-50 text-muted cursor-not-allowed" : ""}`}
            />
            {!isEditing && (
              <p className="mt-1 text-xs text-muted">
                Auto-generated from name. This becomes the product URL.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className={labelClasses}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={inputClasses}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className={labelClasses}>
              Price (£) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="12.99"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="latinName" className={labelClasses}>
            Latin Name
          </label>
          <input
            id="latinName"
            type="text"
            value={formData.latinName}
            onChange={(e) => updateField("latinName", e.target.value)}
            placeholder="e.g. Matricaria chamomilla"
            className={`${inputClasses} italic`}
          />
        </div>
      </div>

      {/* Descriptions section */}
      <div className="bg-white rounded-2xl border border-sage-100 p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-forest-700">
          Descriptions
        </h3>

        <div>
          <label htmlFor="shortDescription" className={labelClasses}>
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="shortDescription"
            required
            rows={2}
            value={formData.shortDescription}
            onChange={(e) => updateField("shortDescription", e.target.value)}
            placeholder="Brief description shown on product cards"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="fullDescription" className={labelClasses}>
            Full Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="fullDescription"
            required
            rows={5}
            value={formData.fullDescription}
            onChange={(e) => updateField("fullDescription", e.target.value)}
            placeholder="Detailed product description shown on the product page"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Details section */}
      <div className="bg-white rounded-2xl border border-sage-100 p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-forest-700">
          Product Details
        </h3>

        <div>
          <label htmlFor="ingredients" className={labelClasses}>
            Ingredients <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ingredients"
            required
            rows={3}
            value={formData.ingredients}
            onChange={(e) => updateField("ingredients", e.target.value)}
            placeholder="List of ingredients"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="usage" className={labelClasses}>
            Usage Instructions <span className="text-red-500">*</span>
          </label>
          <textarea
            id="usage"
            required
            rows={3}
            value={formData.usage}
            onChange={(e) => updateField("usage", e.target.value)}
            placeholder="How to use this product"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Concerns / tags */}
      <div className="bg-white rounded-2xl border border-sage-100 p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-forest-700">
          Health Concerns
        </h3>
        <p className="text-sm text-muted -mt-3">
          Select the health concerns this product addresses.
        </p>

        <div className="flex flex-wrap gap-2">
          {CONCERN_OPTIONS.map((concern) => {
            const selected = formData.concerns.includes(concern);
            return (
              <button
                key={concern}
                type="button"
                onClick={() => toggleConcern(concern)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-forest-700 text-white"
                    : "bg-sage-50 text-charcoal border border-sage-200 hover:bg-sage-100"
                }`}
              >
                {concern}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image & recommendation */}
      <div className="bg-white rounded-2xl border border-sage-100 p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-forest-700">
          Media & Attribution
        </h3>

        <div>
          <label htmlFor="image" className={labelClasses}>
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            id="image"
            type="url"
            required
            value={formData.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="https://example.com/product-image.jpg"
            className={inputClasses}
          />
          <p className="mt-1 text-xs text-muted">
            Image upload will be available soon. For now, paste an image URL.
          </p>
          {formData.image && (
            <div className="mt-3 w-24 h-24 rounded-lg border border-sage-200 overflow-hidden bg-sage-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="recommendedBy" className={labelClasses}>
            Recommended By (Practitioner Slug)
          </label>
          <input
            id="recommendedBy"
            type="text"
            value={formData.recommendedBy}
            onChange={(e) => updateField("recommendedBy", e.target.value)}
            placeholder="e.g. hector"
            className={inputClasses}
          />
          <p className="mt-1 text-xs text-muted">
            Enter the practitioner&apos;s slug to link this product to them.
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-forest-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? isEditing
              ? "Saving…"
              : "Creating…"
            : isEditing
              ? "Save Changes"
              : "Create Product"}
        </button>
        <a
          href="/practitioner/shop"
          className="text-muted hover:text-charcoal font-medium transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
