"use client";

/*
  ORDERS CONTENT — list of client orders from the herb shop.

  Shows order history with expandable details.
*/

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountSidebar from "@/components/AccountSidebar";
import OrderCard from "@/components/OrderCard";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import { getOrdersSorted } from "@/data/orders";

export default function OrdersContent() {
  const { isClient } = useAuth();
  const orders = getOrdersSorted();

  // Redirect if not logged in as client
  if (!isClient) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Please Sign In
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a client to view your orders.
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

  // Calculate some stats
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="orders-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            My Orders
          </h1>
          <p className="mt-2 text-sage-200/70">
            Track your herb shop purchases
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

            {/* Orders content */}
            <div className="flex-1">
              {orders.length > 0 && (
                /* Quick stats */
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                    <p className="text-2xl font-semibold text-forest-700">{orders.length}</p>
                    <p className="text-sm text-muted">Total Orders</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                    <p className="text-2xl font-semibold text-forest-700">{deliveredCount}</p>
                    <p className="text-sm text-muted">Delivered</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-sage-100 text-center">
                    <p className="text-2xl font-semibold text-forest-700">£{totalSpent.toFixed(0)}</p>
                    <p className="text-sm text-muted">Total Spent</p>
                  </div>
                </div>
              )}

              {/* Orders list */}
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-sage-100 p-8 text-center">
                  <p className="text-muted mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link
                    href="/shop"
                    className="inline-block bg-forest-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Browse Herb Shop
                  </Link>
                </div>
              )}

              {/* Shop more CTA */}
              {orders.length > 0 && (
                <div className="mt-8 text-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-forest-700 hover:text-forest-800 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Continue shopping
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
