"use client";

/*
  CREATE PRODUCT PAGE — /practitioner/shop/new

  Wraps the ProductForm component for creating new products.
  On submit, POSTs to the /api/products endpoint and redirects
  to the shop management page on success.
*/

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import ProductForm, { type ProductFormData } from "@/components/ProductForm";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

export default function NewProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPractitioner = session?.user?.role === "practitioner";

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
            Please sign in as a practitioner to add products.
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

  async function handleSubmit(data: ProductFormData) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create product");
    }

    router.push("/practitioner/shop");
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="new-product-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sage-200/70 text-sm mb-2">
            <Link href="/practitioner/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white">New Product</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Add New Product
          </h1>
          <p className="mt-2 text-sage-200/70">
            Create a new herbal product for the shop
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark position="right" size="lg" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />
            <div className="flex-1 max-w-3xl">
              <ProductForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
