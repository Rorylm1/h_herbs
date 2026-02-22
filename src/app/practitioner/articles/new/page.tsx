"use client";

/*
  NEW ARTICLE EDITOR

  Form to create a new article. The slug is auto-generated from the title
  (lowercased, spaces→hyphens, special chars stripped). Category is a dropdown
  with the four fixed categories. Content is a large textarea for markdown.

  ARCHITECTURE TIP: On submit, this POSTs to /api/articles and then
  redirects to the articles list on success.
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

const CATEGORIES = [
  "Herbal Medicine",
  "Nutrition",
  "Holistic Living",
  "Seasonal Wellness",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewArticlePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: CATEGORIES[0],
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "draft" as "draft" | "published",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return null;
  }

  if (!isPractitioner) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Practitioner Access Required
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a practitioner to view this page.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
          >
            Go Home
          </button>
        </div>
      </section>
    );
  }

  const updateField = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title") {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          authorSlug: "hector",
          publishedDate: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        router.push("/practitioner/articles");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create article");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors";

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="new-article-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Write New Article
          </h1>
          <p className="mt-2 text-sage-200/70">
            Share your herbal knowledge and wellness insights
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark position="right" size="lg" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />

            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="px-4 py-3 rounded-lg bg-red-100 text-red-700 font-medium">
                    {error}
                  </div>
                )}

                {/* Title & Slug */}
                <div className="bg-white rounded-2xl border border-sage-100 p-6">
                  <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                    Article Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        className={inputClass}
                        placeholder="e.g. Understanding Adaptogens"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={(e) => updateField("slug", e.target.value)}
                        className={`${inputClass} bg-sage-50 font-mono text-sm`}
                      />
                      <p className="mt-1 text-xs text-muted">
                        Auto-generated from title. Used in the article URL.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Category
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => updateField("category", e.target.value)}
                          className={inputClass}
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Status
                        </label>
                        <select
                          value={form.status}
                          onChange={(e) => updateField("status", e.target.value)}
                          className={inputClass}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Featured Image URL
                      </label>
                      <input
                        type="text"
                        value={form.featuredImage}
                        onChange={(e) => updateField("featuredImage", e.target.value)}
                        className={inputClass}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-sage-100 p-6">
                  <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                    Content
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={form.excerpt}
                        onChange={(e) => updateField("excerpt", e.target.value)}
                        className={`${inputClass} resize-y`}
                        rows={3}
                        placeholder="A short summary shown in article previews..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Article Content (Markdown)
                      </label>
                      <textarea
                        value={form.content}
                        onChange={(e) => updateField("content", e.target.value)}
                        className={`${inputClass} resize-y font-mono text-sm min-h-[300px]`}
                        rows={15}
                        placeholder="Write your article content in Markdown..."
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => router.push("/practitioner/articles")}
                    className="text-muted hover:text-charcoal font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-forest-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? "Creating..." : "Create Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
