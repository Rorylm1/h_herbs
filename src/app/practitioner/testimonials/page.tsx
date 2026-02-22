"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Testimonial = {
  id: string;
  clientName: string;
  text: string;
  condition: string;
  practitionerSlug: string;
};

type FormData = {
  clientName: string;
  condition: string;
  text: string;
};

const emptyForm: FormData = { clientName: "", condition: "", text: "" };

export default function TestimonialsPage() {
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      console.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchTestimonials();
  }, [isPractitioner, fetchTestimonials]);

  function startEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id);
    setFormData({
      clientName: testimonial.clientName,
      condition: testimonial.condition,
      text: testimonial.text,
    });
    setShowForm(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
  }

  function startAdd() {
    setShowForm(true);
    setEditingId(null);
    setFormData(emptyForm);
  }

  async function handleSave() {
    if (!formData.clientName || !formData.condition || !formData.text) return;
    setSaving(true);

    try {
      if (editingId) {
        const res = await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingId ? updated : t))
        );
        setEditingId(null);
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setTestimonials((prev) => [created, ...prev]);
        setShowForm(false);
      }
      setFormData(emptyForm);
    } catch {
      console.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setConfirmDeleteId(null);
    } catch {
      console.error("Failed to delete testimonial");
    } finally {
      setDeletingId(null);
    }
  }

  function renderForm(isEditing: boolean) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Client Name
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientName: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors"
              placeholder="e.g. Sarah Mitchell"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Condition Treated
            </label>
            <input
              type="text"
              value={formData.condition}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, condition: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors"
              placeholder="e.g. Chronic Fatigue"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Testimonial Text
          </label>
          <textarea
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors resize-none"
            placeholder="What the client said about their experience..."
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !formData.clientName || !formData.condition || !formData.text}
            className="bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Testimonial" : "Add Testimonial"}
          </button>
          <button
            onClick={isEditing ? cancelEdit : () => setShowForm(false)}
            className="px-6 py-3 rounded-lg font-semibold text-charcoal border border-sage-200 hover:bg-sage-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

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
          patternId="testimonials-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Testimonials
          </h1>
          <p className="mt-2 text-sage-200/70">
            Manage client reviews displayed on the homepage and your profile
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
              {/* Header with add button */}
              <div className="flex items-center justify-between">
                <p className="text-muted">
                  {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
                </p>
                {!showForm && !editingId && (
                  <button
                    onClick={startAdd}
                    className="bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    + Add Testimonial
                  </button>
                )}
              </div>

              {/* Add new form */}
              {showForm && (
                <div className="bg-white rounded-2xl border border-sage-100 p-6">
                  <h2 className="font-heading text-xl font-semibold text-forest-700 mb-4">
                    New Testimonial
                  </h2>
                  {renderForm(false)}
                </div>
              )}

              {/* Testimonials list */}
              {loading ? (
                <div className="text-center py-12 text-muted">
                  Loading testimonials...
                </div>
              ) : testimonials.length === 0 && !showForm ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-8 text-center">
                  <p className="text-muted mb-4">
                    No testimonials yet. Add your first client review!
                  </p>
                  <button
                    onClick={startAdd}
                    className="bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    + Add Testimonial
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden"
                    >
                      {editingId === testimonial.id ? (
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-forest-700 mb-4">
                            Edit Testimonial
                          </h3>
                          {renderForm(true)}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-heading text-lg font-semibold text-forest-700">
                                  {testimonial.clientName}
                                </h3>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-100 text-forest-700">
                                  {testimonial.condition}
                                </span>
                              </div>
                              <blockquote className="text-charcoal mt-3 italic leading-relaxed">
                                &ldquo;{testimonial.text}&rdquo;
                              </blockquote>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4 pt-4 border-t border-sage-100">
                            <button
                              onClick={() => startEdit(testimonial)}
                              className="text-sm font-medium text-forest-700 hover:text-forest-800 transition-colors"
                            >
                              Edit
                            </button>
                            {confirmDeleteId === testimonial.id ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-red-600">
                                  Delete this testimonial?
                                </span>
                                <button
                                  onClick={() => handleDelete(testimonial.id)}
                                  disabled={deletingId === testimonial.id}
                                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                >
                                  {deletingId === testimonial.id ? "Deleting..." : "Yes, delete"}
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="text-sm font-medium text-muted hover:text-charcoal transition-colors"
                                >
                                  No, keep
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteId(testimonial.id)}
                                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
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
