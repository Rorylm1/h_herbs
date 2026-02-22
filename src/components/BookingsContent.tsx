"use client";

/*
  BOOKINGS CONTENT — list of client bookings with filtering.

  Shows upcoming and past bookings with filter tabs.
  Each booking displays practitioner, service, date/time, and status.
*/

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountSidebar from "@/components/AccountSidebar";
import BookingCard from "@/components/BookingCard";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import { bookings, getUpcomingBookings, getPastBookings } from "@/data/bookings";

type FilterTab = "all" | "upcoming" | "past";

export default function BookingsContent() {
  const { isClient } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>("upcoming");

  // Redirect if not logged in as client
  if (!isClient) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Please Sign In
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a client to view your bookings.
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

  // Get filtered bookings
  const filteredBookings =
    activeTab === "upcoming"
      ? getUpcomingBookings()
      : activeTab === "past"
        ? getPastBookings()
        : bookings;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: getUpcomingBookings().length },
    { key: "past", label: "Past", count: getPastBookings().length },
    { key: "all", label: "All", count: bookings.length },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="bookings-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            My Bookings
          </h1>
          <p className="mt-2 text-sage-200/70">
            View and manage your consultation appointments
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <AccountSidebar />

            {/* Bookings content */}
            <div className="flex-1">
              {/* Filter tabs */}
              <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-forest-700 text-white"
                        : "bg-white border border-sage-200 text-charcoal hover:bg-sage-50"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`ml-1.5 ${
                        activeTab === tab.key ? "text-white/70" : "text-muted"
                      }`}
                    >
                      ({tab.count})
                    </span>
                  </button>
                ))}
              </div>

              {/* Bookings list */}
              {filteredBookings.length > 0 ? (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-sage-100 p-8 text-center">
                  <p className="text-muted mb-4">
                    {activeTab === "upcoming"
                      ? "You have no upcoming bookings."
                      : activeTab === "past"
                        ? "You have no past bookings."
                        : "You have no bookings yet."}
                  </p>
                  <Link
                    href="/book"
                    className="inline-block bg-forest-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>
              )}

              {/* Book more CTA */}
              {filteredBookings.length > 0 && (
                <div className="mt-8 text-center">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-forest-700 hover:text-forest-800 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Book another consultation
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
