"use client";

/*
  PRACTITIONER PROFILE EDITOR

  Fetches the current practitioner's profile from the API and provides
  a rich form to edit all fields: basic info, bio, qualifications,
  specialities, services, and photo. Changes are saved via PUT request.

  ARCHITECTURE TIP: This is a "use client" component because it needs
  React state for the form and user interactions. The data is fetched
  client-side via useEffect (not a server component) so the auth check
  can happen in the browser.
*/

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Service = {
  name: string;
  duration: string;
  price: number;
  description: string;
};

type ProfileData = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  approach: string;
  photo: string;
  instagram: string;
  specialities: string[];
  qualifications: string[];
  services: Service[];
};

export default function PractitionerProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";
  const user = session?.user ?? null;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Editable list temp inputs
  const [newQualification, setNewQualification] = useState("");
  const [newSpeciality, setNewSpeciality] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/practitioners/hector");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          ...data,
          services: Array.isArray(data.services) ? data.services : [],
          specialities: Array.isArray(data.specialities) ? data.specialities : [],
          qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
        });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to load profile" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchProfile();
  }, [isPractitioner, fetchProfile]);

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

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/practitioners/${profile.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile saved successfully!" });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ type: "error", text: "Failed to save profile" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error — please try again" });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ProfileData, value: string | string[] | Service[]) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const addToList = (field: "qualifications" | "specialities", value: string) => {
    if (!profile || !value.trim()) return;
    updateField(field, [...profile[field], value.trim()]);
  };

  const removeFromList = (field: "qualifications" | "specialities", index: number) => {
    if (!profile) return;
    updateField(field, profile[field].filter((_, i) => i !== index));
  };

  const addService = () => {
    if (!profile) return;
    updateField("services", [
      ...profile.services,
      { name: "", duration: "", price: 0, description: "" },
    ]);
  };

  const updateService = (index: number, field: keyof Service, value: string | number) => {
    if (!profile) return;
    const updated = [...profile.services];
    updated[index] = { ...updated[index], [field]: value };
    updateField("services", updated);
  };

  const removeService = (index: number) => {
    if (!profile) return;
    updateField("services", profile.services.filter((_, i) => i !== index));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors";

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="profile-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Edit Profile
          </h1>
          <p className="mt-2 text-sage-200/70">
            Manage your practitioner profile, {user?.name}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark position="right" size="lg" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />

            <div className="flex-1 space-y-8">
              {loading ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <p className="text-muted">Loading profile...</p>
                </div>
              ) : !profile ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <p className="text-muted">Profile not found</p>
                </div>
              ) : (
                <>
                  {/* Success/error toast */}
                  {message && (
                    <div
                      className={`px-4 py-3 rounded-lg font-medium ${
                        message.type === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Basic info */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                      Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={profile.title}
                          onChange={(e) => updateField("title", e.target.value)}
                          className={inputClass}
                          placeholder="e.g. Medical Herbalist"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Instagram Handle
                        </label>
                        <input
                          type="text"
                          value={profile.instagram}
                          onChange={(e) => updateField("instagram", e.target.value)}
                          className={inputClass}
                          placeholder="@hectorsherbs"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Photo URL
                        </label>
                        <input
                          type="text"
                          value={profile.photo}
                          onChange={(e) => updateField("photo", e.target.value)}
                          className={inputClass}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={profile.tagline}
                          onChange={(e) => updateField("tagline", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio & Approach */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                      Bio & Approach
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => updateField("bio", e.target.value)}
                          className={`${inputClass} min-h-[150px] resize-y`}
                          rows={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Approach
                        </label>
                        <textarea
                          value={profile.approach}
                          onChange={(e) => updateField("approach", e.target.value)}
                          className={`${inputClass} min-h-[120px] resize-y`}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                      Qualifications
                    </h2>
                    <div className="space-y-3">
                      {profile.qualifications.map((q, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="flex-1 px-4 py-2 bg-sage-50 rounded-lg text-charcoal">
                            {q}
                          </span>
                          <button
                            onClick={() => removeFromList("qualifications", i)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newQualification}
                          onChange={(e) => setNewQualification(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addToList("qualifications", newQualification);
                              setNewQualification("");
                            }
                          }}
                          className={inputClass}
                          placeholder="Add a qualification..."
                        />
                        <button
                          onClick={() => {
                            addToList("qualifications", newQualification);
                            setNewQualification("");
                          }}
                          className="bg-white text-forest-700 border border-forest-700 px-4 py-3 rounded-lg font-semibold hover:bg-forest-50 transition-colors whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Specialities */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                      Specialities
                    </h2>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {profile.specialities.map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 rounded-full text-sm text-charcoal"
                          >
                            {s}
                            <button
                              onClick={() => removeFromList("specialities", i)}
                              className="text-red-500 hover:text-red-700 font-bold transition-colors"
                              aria-label={`Remove ${s}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newSpeciality}
                          onChange={(e) => setNewSpeciality(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addToList("specialities", newSpeciality);
                              setNewSpeciality("");
                            }
                          }}
                          className={inputClass}
                          placeholder="Add a speciality..."
                        />
                        <button
                          onClick={() => {
                            addToList("specialities", newSpeciality);
                            setNewSpeciality("");
                          }}
                          className="bg-white text-forest-700 border border-forest-700 px-4 py-3 rounded-lg font-semibold hover:bg-forest-50 transition-colors whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-xl font-semibold text-forest-700">
                        Services
                      </h2>
                      <button
                        onClick={addService}
                        className="bg-white text-forest-700 border border-forest-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-forest-50 transition-colors"
                      >
                        + Add Service
                      </button>
                    </div>
                    <div className="space-y-6">
                      {profile.services.map((service, i) => (
                        <div
                          key={i}
                          className="border border-sage-200 rounded-xl p-5 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted">
                              Service {i + 1}
                            </span>
                            <button
                              onClick={() => removeService(i)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-charcoal mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                value={service.name}
                                onChange={(e) => updateService(i, "name", e.target.value)}
                                className={inputClass}
                                placeholder="e.g. Initial Consultation"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-charcoal mb-1">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={service.duration}
                                onChange={(e) => updateService(i, "duration", e.target.value)}
                                className={inputClass}
                                placeholder="e.g. 90 minutes"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-charcoal mb-1">
                                Price (£)
                              </label>
                              <input
                                type="number"
                                value={service.price}
                                onChange={(e) =>
                                  updateService(i, "price", parseFloat(e.target.value) || 0)
                                }
                                className={inputClass}
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                              Description
                            </label>
                            <textarea
                              value={service.description}
                              onChange={(e) => updateService(i, "description", e.target.value)}
                              className={`${inputClass} resize-y`}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                      {profile.services.length === 0 && (
                        <p className="text-muted text-center py-4">
                          No services yet. Click &quot;Add Service&quot; to create one.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-forest-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
