"use client";

/*
  SHOP MANAGEMENT — interactive product list for the practitioner portal.

  ARCHITECTURE TIP: This is the client component that handles all the
  interactive features of the shop page: searching/filtering products,
  the delete confirmation modal, and navigation to edit pages. It
  receives the product list from the server component (page.tsx) as
  a prop — this way the initial data loads fast without a client-side
  fetch, but we still get full interactivity.
*/

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PractitionerSidebar from "@/components/PractitionerSidebar";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shortDescription: string;
  concerns: string[];
  createdAt: string;
};

type ShopManagementProps = {
  products: Product[];
};

export default function ShopManagement({ products }: ShopManagementProps) {
  const router = useRouter();
  const { user, isPractitioner, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (!isPractitioner) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Practitioner Access Required
          </h1>
          <p className="text-muted mb-6">
            Please sign in as a practitioner to manage the shop.
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

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete() {
    if (!deleteSlug) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/products/${deleteSlug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteSlug(null);
      setDeleting(false);
    }
  }

  const productToDelete = products.find((p) => p.slug === deleteSlug);

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="shop-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
                Shop Management
              </h1>
              <p className="mt-2 text-sage-200/70">
                Manage your herbal products and inventory
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
        <DandelionWatermark position="right" size="lg" className="text-sage-300" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <PractitionerSidebar />

            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products by name or category…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-sage-200 pl-10 pr-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 focus:outline-none transition-colors"
                  />
                </div>

                <Link
                  href="/practitioner/shop/new"
                  className="inline-flex items-center gap-2 bg-forest-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Product
                </Link>
              </div>

              {/* Product count */}
              <p className="text-sm text-muted mb-4">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                {search && ` matching "${search}"`}
              </p>

              {/* Product table */}
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-sage-100 p-12 text-center">
                  <svg
                    className="w-12 h-12 text-sage-200 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <h3 className="font-heading text-lg font-semibold text-forest-700 mb-2">
                    {search ? "No products found" : "No products yet"}
                  </h3>
                  <p className="text-muted mb-6">
                    {search
                      ? "Try adjusting your search terms."
                      : "Get started by adding your first herbal product."}
                  </p>
                  {!search && (
                    <Link
                      href="/practitioner/shop/new"
                      className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                    >
                      Add First Product
                    </Link>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-sage-100 bg-sage-50/50">
                          <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                            Product
                          </th>
                          <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                            Category
                          </th>
                          <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                            Price
                          </th>
                          <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sage-100">
                        {filtered.map((product) => (
                          <tr
                            key={product.slug}
                            className="hover:bg-sage-50/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-sage-50 flex-shrink-0">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-charcoal">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-muted line-clamp-1">
                                    {product.shortDescription}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-charcoal font-medium">
                              £{product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/practitioner/shop/${product.slug}/edit`}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-sage-200 px-3 py-1.5 text-sm font-medium text-charcoal hover:bg-sage-50 transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                  Edit
                                </Link>
                                <button
                                  onClick={() => setDeleteSlug(product.slug)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile card list */}
                  <div className="md:hidden divide-y divide-sage-100">
                    {filtered.map((product) => (
                      <div key={product.slug} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-sage-50 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-charcoal truncate">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-forest-700">
                                {product.category}
                              </span>
                              <span className="text-sm font-medium text-charcoal">
                                £{product.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Link
                            href={`/practitioner/shop/${product.slug}/edit`}
                            className="flex-1 text-center rounded-lg border border-sage-200 px-3 py-2 text-sm font-medium text-charcoal hover:bg-sage-50 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteSlug(product.slug)}
                            className="flex-1 text-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delete confirmation modal */}
      {deleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteSlug(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-modal p-6 max-w-md w-full">
            <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
              Delete Product
            </h3>
            <p className="text-muted mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-charcoal">
                {productToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setDeleteSlug(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border border-sage-200 font-medium text-charcoal hover:bg-sage-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
