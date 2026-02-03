/*
  CHECKOUT SUCCESS PAGE — /checkout/success

  Stripe redirects here after a successful payment. Shows a
  confirmation message, botanical accents, and links to continue browsing.

  In a production app, we'd use the session_id query parameter
  to fetch the actual order details from Stripe. For the prototype,
  we show a simple confirmation.
*/

import Link from "next/link";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

export const metadata = {
  title: "Order Confirmed | Hector's Herbs",
  description: "Thank you for your order from Hector's Herbs.",
};

export default function CheckoutSuccessPage() {
  return (
    <section className="relative bg-cream py-20 md:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <BotanicalPattern className="absolute inset-0 text-sage-300 opacity-[0.03]" patternId="checkout-success-pattern" />
      {/* Watermark */}
      <DandelionWatermark position="left" size="lg" className="text-sage-300" />

      <div className="relative z-10 mx-auto max-w-lg px-4 text-center">
        {/* Checkmark icon — with botanical border accents */}
        <div className="relative inline-block">
          <BotanicalBorder position="top-left" className="absolute -top-4 -left-4 w-10 h-10 text-sage-200 opacity-50" />
          <BotanicalBorder position="bottom-right" className="absolute -bottom-4 -right-4 w-10 h-10 text-sage-200 opacity-50" />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 text-forest-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 font-heading text-3xl md:text-4xl font-semibold text-forest-700">
          Order Confirmed!
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly with your order details and tracking information.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="rounded-lg bg-forest-700 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-sage-200 px-6 py-3 text-sm font-semibold text-forest-700 uppercase tracking-wide hover:bg-sage-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
