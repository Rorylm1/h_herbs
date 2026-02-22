"use client";

/*
  EDIT PRODUCT PAGE — /practitioner/shop/[slug]/edit

  Loads an existing product by slug and pre-populates the ProductForm.
  On submit, PUTs to /api/products/[slug] and redirects back to the
  shop management page.

  ARCHITECTURE TIP: This is a client component because it needs the
  useAuth() hook and handles form interactivity. It fetches the product
  data on mount using the API endpoint. In a future iteration, this
  could be optimised with a server component wrapper passing initial
  data as props (like the shop list page does).
*/

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import ProductForm, { type ProductFormData } from "@/components/ProductForm";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type EditProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditProductPage({ params }: EditProductPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { isPractitioner } = useAuth();
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct({
          slug: data.slug,
          name: data.name,
          category: data.category,
          concerns: data.concerns || [],
          price: String(data.price),
          image: data.image,
          shortDescription: data.shortDescription,
          fullDescription: data.fullDescription,
          ingredients: data.ingredients,
          usage: data.usage,
          latinName: data.latinName || "",
          recommendedBy: data.recommendedBy || "",
        });
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (!isPractitioner) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Practitioner Access Required
          </h1>
          <p className="text-muted mb-6">
            Please sign in as a practitioner to edit products.
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
    const res = await fetch(`/api/products/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update product");
    }

    router.push("/practitioner/shop");
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="edit-product-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sage-200/70 text-sm mb-2">
            <Link href="/practitioner/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white">Edit Product</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            {loading ? "Loading…" : product?.name || "Edit Product"}
          </h1>
          <p className="mt-2 text-sage-200/70">
            Update product details and information
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
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-sage-100 p-6 animate-pulse"
                    >
                      <div className="h-5 bg-sage-100 rounded w-1/3 mb-4" />
                      <div className="space-y-3">
                        <div className="h-10 bg-sage-50 rounded" />
                        <div className="h-10 bg-sage-50 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                    Product Not Found
                  </h3>
                  <p className="text-muted mb-6">{error}</p>
                  <Link
                    href="/practitioner/shop"
                    className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Back to Shop
                  </Link>
                </div>
              ) : product ? (
                <ProductForm
                  initialData={product}
                  onSubmit={handleSubmit}
                  isEditing
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
