"use client";

/*
  PRESCRIPTION DETAIL — full view of a single prescription.

  Shows practitioner info, condition, herbs with dosages, and
  practitioner notes. The "Order These Herbs" button adds all
  available products to the cart.
*/

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import AccountSidebar from "@/components/AccountSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

type PrescriptionData = {
  id: string;
  practitionerSlug: string;
  date: string;
  condition: string;
  notes: string;
  items: PrescriptionItem[];
};

type PractitionerInfo = {
  slug: string;
  name: string;
  title: string;
  photo: string;
};

type ProductInfo = {
  slug: string;
  name: string;
  price: number;
  image: string;
};

type PrescriptionDetailProps = {
  prescription: PrescriptionData | null;
  practitioner: PractitionerInfo | null;
  products: ProductInfo[];
};

export default function PrescriptionDetail({ prescription, practitioner, products }: PrescriptionDetailProps) {
  const { isClient } = useAuth();
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isClient) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Please Sign In
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a client to view prescriptions.
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

  if (!prescription) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Prescription Not Found
          </h1>
          <p className="text-muted mb-6">
            We couldn&apos;t find that prescription.
          </p>
          <Link
            href="/account/prescriptions"
            className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
          >
            Back to Prescriptions
          </Link>
        </div>
      </section>
    );
  }

  // Format date for display
  const formattedDate = new Date(prescription.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const availableProducts = prescription.items
    .filter((item) => item.productSlug)
    .map((item) => {
      const product = products.find((p) => p.slug === item.productSlug);
      return product ? { item, product } : null;
    })
    .filter(Boolean) as { item: PrescriptionItem; product: ProductInfo }[];

  // Handle "Order These Herbs" button
  function handleOrderHerbs() {
    availableProducts.forEach(({ product }) => {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    });
    setAddedToCart(true);
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="prescription-detail-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-sage-200/70">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Account
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/account/prescriptions" className="hover:text-white transition-colors">
                  Prescriptions
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{prescription.condition}</li>
            </ol>
          </nav>

          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            {prescription.condition}
          </h1>
          <p className="mt-2 text-sage-200/70">
            Prescribed on {formattedDate}
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

            {/* Prescription content */}
            <div className="flex-1 space-y-8">
              {/* Practitioner card */}
              {practitioner && (
                <div className="bg-white rounded-xl border border-sage-100 p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={practitioner.photo}
                      alt={practitioner.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-sage-100"
                    />
                    <div>
                      <p className="text-sm text-muted">Prescribed by</p>
                      <Link
                        href={`/herbalists/${practitioner.slug}`}
                        className="font-heading text-lg font-semibold text-forest-700 hover:text-forest-800 hover:underline"
                      >
                        {practitioner.name}
                      </Link>
                      <p className="text-sm text-muted">{practitioner.title}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Herbs table */}
              <div className="relative bg-white rounded-xl border border-sage-100 overflow-hidden">
                <BotanicalBorder
                  position="top-right"
                  className="absolute top-0 right-0 w-16 h-16 text-sage-200 opacity-30"
                />
                <div className="p-5 border-b border-sage-100">
                  <h2 className="font-heading text-xl font-semibold text-forest-700">
                    Prescribed Herbs
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-sage-50 text-left">
                        <th className="px-5 py-3 text-sm font-semibold text-charcoal">Herb</th>
                        <th className="px-5 py-3 text-sm font-semibold text-charcoal">Form</th>
                        <th className="px-5 py-3 text-sm font-semibold text-charcoal">Dosage</th>
                        <th className="px-5 py-3 text-sm font-semibold text-charcoal">Duration</th>
                        <th className="px-5 py-3 text-sm font-semibold text-charcoal">Shop</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage-100">
                      {prescription.items.map((item, index) => {
                        const product = item.productSlug
                          ? products.find((p) => p.slug === item.productSlug)
                          : null;
                        return (
                          <tr key={index} className="hover:bg-sage-50/50">
                            <td className="px-5 py-4">
                              <span className="font-medium text-charcoal">{item.herb}</span>
                            </td>
                            <td className="px-5 py-4 text-sm text-muted">{item.form}</td>
                            <td className="px-5 py-4 text-sm text-muted">{item.dosage}</td>
                            <td className="px-5 py-4 text-sm text-muted">{item.duration}</td>
                            <td className="px-5 py-4">
                              {product ? (
                                <Link
                                  href={`/shop/${product.slug}`}
                                  className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-800 hover:underline"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                  </svg>
                                  £{product.price.toFixed(2)}
                                </Link>
                              ) : (
                                <span className="text-sm text-muted">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Practitioner notes */}
              {prescription.notes && (
                <div className="relative bg-white rounded-xl border border-sage-100 p-5 overflow-hidden">
                  <BotanicalBorder
                    position="bottom-left"
                    className="absolute bottom-0 left-0 w-14 h-14 text-sage-200 opacity-30"
                  />
                  <h2 className="font-heading text-xl font-semibold text-forest-700 mb-3">
                    Practitioner Notes
                  </h2>
                  <p className="text-charcoal leading-relaxed whitespace-pre-line">
                    {prescription.notes}
                  </p>
                </div>
              )}

              {/* Order These Herbs CTA */}
              {availableProducts.length > 0 && (
                <div className="relative bg-sage-50 rounded-xl border border-sage-200 p-6 overflow-hidden">
                  <BotanicalBorder
                    position="top-right"
                    className="absolute top-0 right-0 w-16 h-16 text-sage-300 opacity-40"
                  />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-forest-700">
                        Order These Herbs
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        {availableProducts.length} of {prescription.items.length} herbs are
                        available in our shop
                      </p>
                    </div>
                    {addedToCart ? (
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-600 font-medium flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Added to cart!
                        </span>
                        <Link
                          href="/cart"
                          className="bg-forest-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                        >
                          View Cart
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={handleOrderHerbs}
                        className="bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add All to Cart
                        <span className="text-white/70">
                          (£{availableProducts.reduce((sum, { product }) => sum + product.price, 0).toFixed(2)})
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className="pt-4">
                <Link
                  href="/account/prescriptions"
                  className="inline-flex items-center gap-2 text-forest-700 hover:text-forest-800 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Prescriptions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
