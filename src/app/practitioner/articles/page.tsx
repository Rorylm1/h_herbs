"use client";

/*
  ARTICLE MANAGEMENT — Lists all articles by the practitioner.

  Shows title, category, publish status badge, and date for each article.
  Provides edit/delete actions and a "Write New Article" button.

  ARCHITECTURE TIP: Articles are fetched from the API filtered by
  authorSlug. The delete action calls the API then re-fetches the list
  to keep the UI in sync without needing a full page reload.
*/

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Article = {
  slug: string;
  title: string;
  category: string;
  status: string;
  publishedDate: string;
  excerpt: string;
};

export default function PractitionerArticlesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/articles?authorSlug=hector");
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch {
      // Silently fail — empty list is shown
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchArticles();
  }, [isPractitioner, fetchArticles]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
      }
    } catch {
      // Silently fail
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

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

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="articles-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
                Articles
              </h1>
              <p className="mt-2 text-sage-200/70">
                Manage your blog posts and wellness articles
              </p>
            </div>
            <Link
              href="/practitioner/articles/new"
              className="self-start sm:self-center bg-white text-forest-700 px-6 py-3 rounded-lg font-semibold hover:bg-sage-50 transition-colors"
            >
              Write New Article
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark position="right" size="lg" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />

            <div className="flex-1">
              {loading ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <p className="text-muted">Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <h3 className="font-heading text-xl font-semibold text-forest-700 mb-2">
                    No articles yet
                  </h3>
                  <p className="text-muted mb-6">
                    Share your herbal wisdom — write your first article.
                  </p>
                  <Link
                    href="/practitioner/articles/new"
                    className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Write New Article
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div
                      key={article.slug}
                      className="bg-white rounded-2xl border border-sage-100 p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-heading text-lg font-semibold text-forest-700">
                              {article.title}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                article.status === "published"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {article.status === "published" ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted">
                            <span>{article.category}</span>
                            <span>·</span>
                            <span>{formatDate(article.publishedDate)}</span>
                          </div>
                          {article.excerpt && (
                            <p className="mt-2 text-sm text-muted line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <Link
                            href={`/practitioner/articles/${article.slug}/edit`}
                            className="bg-white text-forest-700 border border-forest-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-forest-50 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article.slug)}
                            disabled={deleting === article.slug}
                            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            {deleting === article.slug ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
