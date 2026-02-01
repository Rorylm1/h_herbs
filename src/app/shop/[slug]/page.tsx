/*
  PRODUCT DETAIL PAGE — /shop/[slug]

  ARCHITECTURE TIP: Like the practitioner profile, this uses
  generateStaticParams() for Static Site Generation — Next.js
  pre-builds a page for each product at build time. The page
  itself is a server component (fast, SEO-friendly), with just
  the "Add to Basket" button extracted as a client component.

  The "Recommended by" badge links to the recommending practitioner's
  profile, creating a cross-linking web between shop and herbalists.
*/

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { practitioners } from "@/data/practitioners";
import AddToBasketButton from "@/components/AddToBasketButton";
import ProductCard from "@/components/ProductCard";

/* Pre-build a page for each product */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* Dynamic SEO metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | Hector's Herbs`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find the recommending practitioner (if any)
  const recommender = product.recommendedBy
    ? practitioners.find((p) => p.slug === product.recommendedBy)
    : null;

  // Related products (same category, excluding this one)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* Product hero */}
      <section className="bg-cream py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-sage-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-4 left-4 rounded-full bg-forest-700/90 px-4 py-1.5 text-sm font-semibold text-white">
                {product.category}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Breadcrumb */}
              <nav className="text-sm text-muted mb-4">
                <Link href="/shop" className="hover:text-forest-700">
                  Shop
                </Link>
                <span className="mx-2">/</span>
                <span>{product.name}</span>
              </nav>

              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-forest-700">
                {product.name}
              </h1>

              {/* Concern tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {product.concerns.map((concern) => (
                  <span
                    key={concern}
                    className="rounded-full bg-sage-50 border border-sage-100 px-3 py-1 text-xs font-medium text-forest-700"
                  >
                    {concern}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="mt-5 text-3xl font-bold text-forest-700">
                &pound;{product.price.toFixed(2)}
              </p>

              {/* Short description */}
              <p className="mt-4 text-charcoal leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Recommended by badge */}
              {recommender && (
                <Link
                  href={`/herbalists/${recommender.slug}`}
                  className="mt-5 inline-flex items-center gap-3 rounded-lg bg-earth-100 border border-earth-200 p-3 hover:bg-earth-200 transition-colors"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={recommender.photo}
                      alt={recommender.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Recommended by</p>
                    <p className="text-sm font-semibold text-forest-700">
                      {recommender.name}
                    </p>
                  </div>
                </Link>
              )}

              {/* Add to basket */}
              <div className="mt-8">
                <AddToBasketButton
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full description, ingredients, usage */}
      <section className="bg-earth-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-forest-700">
                About This Product
              </h2>
              <p className="mt-3 text-charcoal leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white border border-sage-100 p-5">
                <h3 className="font-heading text-lg font-semibold text-forest-700 mb-2">
                  Ingredients
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
              <div className="rounded-xl bg-white border border-sage-100 p-5">
                <h3 className="font-heading text-lg font-semibold text-forest-700 mb-2">
                  How to Use
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {product.usage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700 mb-6">
              More {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
