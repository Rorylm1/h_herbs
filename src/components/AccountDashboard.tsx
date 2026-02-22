"use client";

/*
  ACCOUNT DASHBOARD — overview page for the client account area.

  Shows welcome message, quick stats, and summary cards for
  upcoming bookings, recent prescriptions, and recent orders.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AccountSidebar from "@/components/AccountSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import { getUpcomingBookings } from "@/data/bookings";
import { getPrescriptionsSorted } from "@/data/prescriptions";
import { getOrdersSorted, formatOrderId } from "@/data/orders";
import { practitioners } from "@/data/practitioners";

export default function AccountDashboard() {
  const router = useRouter();
  const { user, isClient, logout } = useAuth();

  // Redirect if not logged in as client
  if (!isClient) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Please Sign In
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a client to view this page.
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

  // Get summary data
  const upcomingBookings = getUpcomingBookings();
  const nextBooking = upcomingBookings[0];
  const recentPrescriptions = getPrescriptionsSorted().slice(0, 1);
  const recentOrders = getOrdersSorted().slice(0, 1);

  // Helper to get practitioner name
  function getPractitionerName(slug: string): string {
    const practitioner = practitioners.find((p) => p.slug === slug);
    return practitioner?.name || slug;
  }

  // Format date for display
  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="account-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
                Welcome back, {user?.name.split(" ")[0]}
              </h1>
              <p className="mt-2 text-sage-200/70">
                Manage your bookings, prescriptions, and orders
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="self-start md:self-center text-sage-200 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
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

            {/* Dashboard content */}
            <div className="flex-1 space-y-8">
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                  <p className="text-2xl font-semibold text-forest-700">
                    {upcomingBookings.length}
                  </p>
                  <p className="text-sm text-muted">Upcoming</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                  <p className="text-2xl font-semibold text-forest-700">
                    {getPrescriptionsSorted().length}
                  </p>
                  <p className="text-sm text-muted">Prescriptions</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                  <p className="text-2xl font-semibold text-forest-700">
                    {getOrdersSorted().length}
                  </p>
                  <p className="text-sm text-muted">Orders</p>
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Next booking card */}
                <div className="relative bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden">
                  <BotanicalBorder
                    position="top-right"
                    className="absolute top-0 right-0 w-14 h-14 text-sage-200 opacity-30"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-lg font-semibold text-forest-700">
                        Next Booking
                      </h3>
                      <Link
                        href="/account/bookings"
                        className="text-sm text-forest-700 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                    {nextBooking ? (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-forest-700"
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
                        <div>
                          <p className="font-medium text-charcoal">
                            {nextBooking.service}
                          </p>
                          <p className="text-sm text-muted">
                            with {getPractitionerName(nextBooking.practitionerSlug)}
                          </p>
                          <p className="text-sm text-forest-700 mt-1">
                            {formatDate(nextBooking.date)} at {nextBooking.time}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted">No upcoming bookings</p>
                    )}
                    <Link
                      href="/book"
                      className="mt-4 inline-block text-sm font-medium text-forest-700 hover:underline"
                    >
                      Book a consultation →
                    </Link>
                  </div>
                </div>

                {/* Recent prescription card */}
                <div className="relative bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden">
                  <BotanicalBorder
                    position="top-right"
                    className="absolute top-0 right-0 w-14 h-14 text-sage-200 opacity-30"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-lg font-semibold text-forest-700">
                        Latest Prescription
                      </h3>
                      <Link
                        href="/account/prescriptions"
                        className="text-sm text-forest-700 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                    {recentPrescriptions[0] ? (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-forest-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">
                            {recentPrescriptions[0].condition}
                          </p>
                          <p className="text-sm text-muted">
                            by {getPractitionerName(recentPrescriptions[0].practitionerSlug)}
                          </p>
                          <p className="text-sm text-forest-700 mt-1">
                            {recentPrescriptions[0].items.length} herbs • {formatDate(recentPrescriptions[0].date)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted">No prescriptions yet</p>
                    )}
                    {recentPrescriptions[0] && (
                      <Link
                        href={`/account/prescriptions/${recentPrescriptions[0].id}`}
                        className="mt-4 inline-block text-sm font-medium text-forest-700 hover:underline"
                      >
                        View prescription →
                      </Link>
                    )}
                  </div>
                </div>

                {/* Recent order card */}
                <div className="relative bg-white rounded-2xl border border-sage-100 p-6 overflow-hidden lg:col-span-2">
                  <BotanicalBorder
                    position="bottom-right"
                    className="absolute bottom-0 right-0 w-14 h-14 text-sage-200 opacity-30"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-lg font-semibold text-forest-700">
                        Recent Order
                      </h3>
                      <Link
                        href="/account/orders"
                        className="text-sm text-forest-700 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                    {recentOrders[0] ? (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-forest-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal">
                              {formatOrderId(recentOrders[0].id)}
                            </p>
                            <p className="text-sm text-muted">
                              {recentOrders[0].items.length} items • £{recentOrders[0].total.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted">
                              {formatDate(recentOrders[0].date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              recentOrders[0].status === "delivered"
                                ? "bg-emerald-100 text-emerald-700"
                                : recentOrders[0].status === "shipped"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-sage-100 text-charcoal"
                            }`}
                          >
                            {recentOrders[0].status.charAt(0).toUpperCase() +
                              recentOrders[0].status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted">No orders yet</p>
                    )}
                    <Link
                      href="/shop"
                      className="mt-4 inline-block text-sm font-medium text-forest-700 hover:underline"
                    >
                      Browse herb shop →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
