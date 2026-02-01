"use client";

/*
  CART PAGE — /cart

  Shows all items in the shopping cart with quantity controls,
  line totals, a subtotal, and a "Proceed to Checkout" button
  that initiates the Stripe Checkout flow.

  ARCHITECTURE TIP: The checkout flow works like this:
  1. User clicks "Proceed to Checkout"
  2. We POST the cart items to our /api/checkout route
  3. That route creates a Stripe Checkout Session (server-side)
  4. Stripe returns a URL for their hosted payment page
  5. We redirect the user to that URL
  6. After payment, Stripe redirects back to /checkout/success

  If Stripe isn't configured (no API key), we show a helpful
  message instead of failing silently.
*/

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/CartLineItem";
import { useState } from "react";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch {
      setError("Unable to connect to checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Empty cart state ── */
  if (items.length === 0) {
    return (
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <h1 className="mt-5 font-heading text-2xl md:text-3xl font-semibold text-forest-700">
            Your basket is empty
          </h1>
          <p className="mt-2 text-muted">
            Browse our herb shop to find natural remedies tailored to your
            needs.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-forest-700 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      </section>
    );
  }

  /* ── Cart with items ── */
  return (
    <section className="bg-cream py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-forest-700">
          Your Basket
        </h1>
        <p className="mt-2 text-muted">
          {items.length} {items.length === 1 ? "item" : "items"} in your basket
        </p>

        {/* Line items */}
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <CartLineItem key={item.slug} item={item} />
          ))}
        </div>

        {/* Subtotal + Checkout */}
        <div className="mt-8 rounded-xl bg-white border border-sage-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-charcoal">
              Subtotal
            </span>
            <span className="text-2xl font-bold text-forest-700">
              &pound;{totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted mb-5">
            Shipping calculated at checkout. UK delivery typically 2-3 working
            days.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full rounded-lg py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
              isLoading
                ? "bg-sage-200 text-muted cursor-wait"
                : "bg-forest-700 text-white hover:bg-forest-800"
            }`}
          >
            {isLoading ? "Redirecting to Checkout..." : "Proceed to Checkout"}
          </button>

          <div className="mt-3 text-center">
            <Link
              href="/shop"
              className="text-sm text-forest-700 hover:text-forest-800 underline underline-offset-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
