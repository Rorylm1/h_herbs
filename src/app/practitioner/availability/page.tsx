"use client";

/*
  AVAILABILITY MANAGER — Weekly calendar grid for practitioner hours.

  Shows a visual grid for Monday through Sunday. Each day has:
  - An on/off toggle (isAvailable)
  - Start time picker
  - End time picker

  All changes are saved at once via a bulk PUT to /api/availability.

  ARCHITECTURE TIP: The state holds an array of 7 slots (Mon–Sun).
  If the API returns fewer than 7 slots (e.g. first time setup), we
  fill in defaults for any missing days. The dayOfWeek field uses
  0=Sunday through 6=Saturday to match JavaScript's Date.getDay().
*/

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Display order: Mon(1)–Sun(0) for a typical work week layout
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

type Slot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

function defaultSlots(): Slot[] {
  return Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: i >= 1 && i <= 5, // Mon–Fri on by default
  }));
}

export default function PractitionerAvailabilityPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";

  const [slots, setSlots] = useState<Slot[]>(defaultSlots());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      const res = await fetch("/api/availability?practitionerSlug=hector");
      if (res.ok) {
        const data: Slot[] = await res.json();
        if (data.length > 0) {
          // Merge API data with defaults for any missing days
          const merged = defaultSlots();
          for (const slot of data) {
            merged[slot.dayOfWeek] = {
              dayOfWeek: slot.dayOfWeek,
              startTime: slot.startTime,
              endTime: slot.endTime,
              isAvailable: slot.isAvailable,
            };
          }
          setSlots(merged);
        }
      }
    } catch {
      // Use defaults if fetch fails
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchAvailability();
  }, [isPractitioner, fetchAvailability]);

  const updateSlot = (dayOfWeek: number, field: keyof Slot, value: string | boolean) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.dayOfWeek === dayOfWeek ? { ...s, [field]: value } : s
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practitionerSlug: "hector",
          slots,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Availability saved successfully!" });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ type: "error", text: "Failed to save availability" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error — please try again" });
    } finally {
      setSaving(false);
    }
  };

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

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors text-sm";

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="availability-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Availability
          </h1>
          <p className="mt-2 text-sage-200/70">
            Set your weekly consultation hours
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

              {loading ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <p className="text-muted">Loading availability...</p>
                </div>
              ) : (
                <>
                  {/* Weekly grid */}
                  <div className="bg-white rounded-2xl border border-sage-100 p-6">
                    <h2 className="font-heading text-xl font-semibold text-forest-700 mb-6">
                      Weekly Schedule
                    </h2>

                    {/* Desktop grid */}
                    <div className="hidden md:grid grid-cols-7 gap-3">
                      {DISPLAY_ORDER.map((dayIdx) => {
                        const slot = slots[dayIdx];
                        return (
                          <div
                            key={dayIdx}
                            className={`rounded-xl border-2 p-4 text-center transition-colors ${
                              slot.isAvailable
                                ? "border-forest-700 bg-forest-50/50"
                                : "border-sage-200 bg-sage-50/50 opacity-60"
                            }`}
                          >
                            <p className="font-heading font-semibold text-forest-700 mb-3">
                              {DAY_SHORT[dayIdx]}
                            </p>

                            {/* Toggle */}
                            <button
                              type="button"
                              onClick={() => updateSlot(dayIdx, "isAvailable", !slot.isAvailable)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors mb-4 ${
                                slot.isAvailable ? "bg-forest-700" : "bg-sage-300"
                              }`}
                              aria-label={`Toggle ${DAY_NAMES[dayIdx]}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  slot.isAvailable ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>

                            {slot.isAvailable && (
                              <div className="space-y-2">
                                <input
                                  type="time"
                                  value={slot.startTime}
                                  onChange={(e) =>
                                    updateSlot(dayIdx, "startTime", e.target.value)
                                  }
                                  className={inputClass}
                                />
                                <p className="text-xs text-muted">to</p>
                                <input
                                  type="time"
                                  value={slot.endTime}
                                  onChange={(e) =>
                                    updateSlot(dayIdx, "endTime", e.target.value)
                                  }
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile list */}
                    <div className="md:hidden space-y-3">
                      {DISPLAY_ORDER.map((dayIdx) => {
                        const slot = slots[dayIdx];
                        return (
                          <div
                            key={dayIdx}
                            className={`rounded-xl border-2 p-4 transition-colors ${
                              slot.isAvailable
                                ? "border-forest-700 bg-forest-50/50"
                                : "border-sage-200 bg-sage-50/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <p className="font-heading font-semibold text-forest-700">
                                {DAY_NAMES[dayIdx]}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  updateSlot(dayIdx, "isAvailable", !slot.isAvailable)
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  slot.isAvailable ? "bg-forest-700" : "bg-sage-300"
                                }`}
                                aria-label={`Toggle ${DAY_NAMES[dayIdx]}`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    slot.isAvailable ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>

                            {slot.isAvailable && (
                              <div className="flex items-center gap-3">
                                <input
                                  type="time"
                                  value={slot.startTime}
                                  onChange={(e) =>
                                    updateSlot(dayIdx, "startTime", e.target.value)
                                  }
                                  className={inputClass}
                                />
                                <span className="text-sm text-muted whitespace-nowrap">to</span>
                                <input
                                  type="time"
                                  value={slot.endTime}
                                  onChange={(e) =>
                                    updateSlot(dayIdx, "endTime", e.target.value)
                                  }
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-forest-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving..." : "Save Availability"}
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
