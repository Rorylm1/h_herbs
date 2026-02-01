"use client";

/*
  CART LINE ITEM — a single row in the shopping cart.

  Shows product image, name, unit price, quantity controls
  (increment/decrement buttons), line total, and a remove button.
  Uses the cart context for updating quantities and removing items.
*/

import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/context/CartContext";

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-lg bg-white border border-sage-100 p-4">
      {/* Product image */}
      <Link
        href={`/shop/${item.slug}`}
        className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </Link>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <Link href={`/shop/${item.slug}`}>
          <h3 className="font-heading text-base font-semibold text-forest-700 truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-muted">
          &pound;{item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-sage-200 text-muted hover:bg-sage-50 hover:text-forest-700 transition-colors"
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span className="w-8 text-center text-sm font-semibold text-charcoal">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-sage-200 text-muted hover:bg-sage-50 hover:text-forest-700 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="hidden sm:block w-20 text-right">
        <p className="font-semibold text-forest-700">
          &pound;{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove button */}
      <button
        onClick={() => removeItem(item.slug)}
        className="text-muted hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
