"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Booking = {
  id: string;
  practitionerSlug: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes: string | null;
};

type FilterTab = "upcoming" | "past" | "all";

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    upcoming: "bg-sage-100 text-forest-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AppointmentsPage() {
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";
  const user = session?.user ?? null;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterTab>("upcoming");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments?practitioner=hector");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBookings(data);
    } catch {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchBookings();
  }, [isPractitioner, fetchBookings]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      console.error("Failed to update booking status");
    } finally {
      setUpdating(null);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings.filter((b) => {
    if (filter === "upcoming") return b.status === "upcoming";
    if (filter === "past") return b.status === "completed" || b.status === "cancelled";
    return true;
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
          patternId="appointments-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Appointments
          </h1>
          <p className="mt-2 text-sage-200/70">
            Manage your client bookings and consultations
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
              {/* Filter tabs */}
              <div className="flex gap-2 flex-wrap">
                {(["upcoming", "past", "all"] as FilterTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === tab
                        ? "bg-forest-700 text-white"
                        : "bg-white border border-sage-200 text-charcoal hover:bg-sage-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Bookings list */}
              {loading ? (
                <div className="text-center py-12 text-muted">
                  Loading appointments...
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-8 text-center">
                  <p className="text-muted">
                    No {filter === "all" ? "" : filter} appointments found.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading text-lg font-semibold text-forest-700">
                              {booking.clientName}
                            </h3>
                            <StatusBadge status={booking.status} />
                          </div>
                          <p className="text-charcoal font-medium">
                            {booking.service}
                          </p>
                          <p className="text-sm text-muted mt-1">
                            {formatDate(booking.date)} at {booking.time}
                          </p>
                          {booking.notes && (
                            <p className="text-sm text-muted mt-2 italic">
                              &ldquo;{booking.notes}&rdquo;
                            </p>
                          )}
                        </div>

                        {booking.status === "upcoming" && (
                          <div className="flex gap-2 sm:flex-col">
                            <button
                              onClick={() => updateStatus(booking.id, "completed")}
                              disabled={updating === booking.id}
                              className="bg-forest-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-forest-800 transition-colors disabled:opacity-50"
                            >
                              {updating === booking.id
                                ? "Updating..."
                                : "Mark Complete"}
                            </button>
                            <button
                              onClick={() => updateStatus(booking.id, "cancelled")}
                              disabled={updating === booking.id}
                              className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg text-sm font-semibold border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
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
