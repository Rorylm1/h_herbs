"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Stats = {
  products: number;
  upcomingBookings: number;
  publishedArticles: number;
  testimonials: number;
};

type Booking = {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: string;
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function PractitionerDashboard() {
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";
  const user = session?.user ?? null;
  const [stats, setStats] = useState<Stats>({
    products: 0,
    upcomingBookings: 0,
    publishedArticles: 0,
    testimonials: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch("/api/practitioner/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      const data = await res.json();
      setStats(data.stats);
      setUpcomingBookings(data.upcomingBookings);
    } catch {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPractitioner) fetchDashboardData();
  }, [isPractitioner, fetchDashboardData]);

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

  const statCards = [
    { label: "Products", value: stats.products, href: "/practitioner/shop" },
    {
      label: "Upcoming Bookings",
      value: stats.upcomingBookings,
      href: "/practitioner/appointments",
    },
    {
      label: "Published Articles",
      value: stats.publishedArticles,
      href: "/practitioner/articles",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      href: "/practitioner/testimonials",
    },
  ];

  const quickActions = [
    { label: "Add Product", href: "/practitioner/shop", icon: "+" },
    { label: "Write Article", href: "/practitioner/articles", icon: "✎" },
    { label: "Manage Availability", href: "/practitioner/availability", icon: "◷" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="dashboard-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Welcome back, {user?.name || "Practitioner"}
          </h1>
          <p className="mt-2 text-sage-200/70">
            Your practitioner dashboard &mdash; manage your practice from here
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

            <div className="flex-1 space-y-8">
              {loading ? (
                <div className="text-center py-12 text-muted">
                  Loading dashboard...
                </div>
              ) : (
                <>
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat) => (
                      <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-white rounded-xl p-4 border border-sage-100 text-center hover:border-sage-200 hover:shadow-sm transition-all"
                      >
                        <p className="text-2xl font-semibold text-forest-700">
                          {stat.value}
                        </p>
                        <p className="text-sm text-muted mt-1">{stat.label}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Two-column layout: upcoming bookings + quick actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming bookings */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-heading text-xl font-semibold text-forest-700">
                          Upcoming Appointments
                        </h2>
                        <Link
                          href="/practitioner/appointments"
                          className="text-sm text-forest-700 hover:underline"
                        >
                          View all
                        </Link>
                      </div>

                      {upcomingBookings.length === 0 ? (
                        <p className="text-muted py-4">
                          No upcoming appointments
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {upcomingBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center gap-4 p-3 rounded-lg bg-sage-50/50"
                            >
                              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-5 h-5 text-forest-700"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-charcoal truncate">
                                  {booking.clientName}
                                </p>
                                <p className="text-sm text-muted truncate">
                                  {booking.service}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-medium text-forest-700">
                                  {formatDate(booking.date)}
                                </p>
                                <p className="text-xs text-muted">
                                  {booking.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden">
                      <h2 className="font-heading text-xl font-semibold text-forest-700 mb-4">
                        Quick Actions
                      </h2>
                      <div className="space-y-3">
                        {quickActions.map((action) => (
                          <Link
                            key={action.label}
                            href={action.href}
                            className="flex items-center gap-3 p-3 rounded-lg border border-sage-100 hover:bg-sage-50 hover:border-sage-200 transition-colors"
                          >
                            <span className="w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {action.icon}
                            </span>
                            <span className="font-medium text-charcoal">
                              {action.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
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
