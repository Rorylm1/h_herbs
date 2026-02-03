"use client";

/*
  PRODUCT CARD — displays a single herb product in the shop grid.

  "use client" because we use the cart context to add items on click.
  Shows product image, category tag, concern tags, short description,
  price, and an "Add to Basket" button.
*/

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import LatinName from "@/components/LatinName";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col rounded-xl bg-white border border-sage-100 overflow-hidden shadow-card hover:shadow-hover transition-shadow">
      {/* Product image with category overlay */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-square overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-forest-700/90 px-3 py-1 text-xs font-semibold text-white">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-heading text-lg font-semibold text-forest-700 group-hover:text-forest-800 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Latin botanical name */}
        {product.latinName && (
          <LatinName name={product.latinName} className="mt-0.5 block" />
        )}

        {/* Concern tags */}
        <div className="mt-1.5 flex flex-wrap gap-1">
          {product.concerns.map((concern) => (
            <span
              key={concern}
              className="rounded-full bg-sage-50 px-2 py-0.5 text-xs text-muted"
            >
              {concern}
            </span>
          ))}
        </div>

        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Price + Add to basket */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-forest-700">
            &pound;{product.price.toFixed(2)}
          </span>
          <button
            onClick={() =>
              addItem({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="rounded-lg bg-forest-700 px-4 py-2 text-xs font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
