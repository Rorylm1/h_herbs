"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type SiteImage = {
  id: string;
  key: string;
  url: string;
  alt: string;
  label: string;
};

type EditState = {
  url: string;
  alt: string;
};

export default function SiteImagesPage() {
  const { isPractitioner } = useAuth();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [edits, setEdits] = useState<Record<string, EditState>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/site-images");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setImages(data);
    } catch {
      console.error("Failed to fetch site images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchImages();
  }, [isPractitioner, fetchImages]);

  function getEditState(image: SiteImage): EditState {
    return edits[image.id] ?? { url: image.url, alt: image.alt };
  }

  function updateEdit(id: string, field: keyof EditState, value: string) {
    setEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        url: prev[id]?.url ?? images.find((i) => i.id === id)?.url ?? "",
        alt: prev[id]?.alt ?? images.find((i) => i.id === id)?.alt ?? "",
        [field]: value,
      },
    }));
  }

  function hasChanges(image: SiteImage): boolean {
    const edit = edits[image.id];
    if (!edit) return false;
    return edit.url !== image.url || edit.alt !== image.alt;
  }

  async function handleSave(image: SiteImage) {
    const edit = edits[image.id];
    if (!edit) return;

    setSavingId(image.id);
    try {
      const res = await fetch("/api/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id, url: edit.url, alt: edit.alt }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setImages((prev) => prev.map((i) => (i.id === image.id ? updated : i)));
      setEdits((prev) => {
        const next = { ...prev };
        delete next[image.id];
        return next;
      });
      setSavedId(image.id);
      setTimeout(() => setSavedId(null), 2000);
    } catch {
      console.error("Failed to update site image");
    } finally {
      setSavingId(null);
    }
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
          <Link
            href="/login"
            className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="images-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Site Images
          </h1>
          <p className="mt-2 text-sage-200/70">
            Manage hero banners and section images across the site
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />

            <div className="flex-1 space-y-6">
              {loading ? (
                <div className="text-center py-12 text-muted">
                  Loading site images...
                </div>
              ) : images.length === 0 ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-8 text-center">
                  <p className="text-muted">
                    No site images configured yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {images.map((image) => {
                    const editState = getEditState(image);
                    const changed = hasChanges(image);
                    return (
                      <div
                        key={image.id}
                        className="bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-heading text-lg font-semibold text-forest-700">
                            {image.label || image.key}
                          </h3>
                          <span className="text-xs text-muted bg-sage-50 px-2 py-1 rounded">
                            {image.key}
                          </span>
                        </div>

                        {/* Image preview */}
                        <div className="relative w-full h-40 bg-sage-50 rounded-lg overflow-hidden mb-4">
                          {editState.url ? (
                            <Image
                              src={editState.url}
                              alt={editState.alt || image.label}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted text-sm">
                              No image URL set
                            </div>
                          )}
                        </div>

                        {/* URL input */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={editState.url}
                              onChange={(e) =>
                                updateEdit(image.id, "url", e.target.value)
                              }
                              className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors text-sm"
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                              Alt Text
                            </label>
                            <input
                              type="text"
                              value={editState.alt}
                              onChange={(e) =>
                                updateEdit(image.id, "alt", e.target.value)
                              }
                              className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors text-sm"
                              placeholder="Describe the image..."
                            />
                          </div>

                          {(changed || savedId === image.id) && (
                            <div className="flex items-center gap-3">
                              {changed && (
                                <button
                                  onClick={() => handleSave(image)}
                                  disabled={savingId === image.id}
                                  className="bg-forest-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-forest-800 transition-colors disabled:opacity-50"
                                >
                                  {savingId === image.id
                                    ? "Saving..."
                                    : "Save Changes"}
                                </button>
                              )}
                              {savedId === image.id && !changed && (
                                <span className="text-sm text-emerald-600 font-medium">
                                  Saved!
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
