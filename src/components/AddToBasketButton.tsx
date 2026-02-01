"use client";

/*
  ADD TO BASKET BUTTON — a standalone client component for adding
  a product to the cart. Used on the product detail page (which is
  a server component and can't use hooks directly).

  ARCHITECTURE TIP: In Next.js, server components can't use React
  hooks. When a mostly-static page needs one interactive element,
  we extract just that element into a small "use client" component
  rather than making the entire page a client component.
*/

import { useCart } from "@/context/CartContext";

type Props = {
  slug: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToBasketButton({ slug, name, price, image }: Props) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ slug, name, price, image })}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest-700 px-8 py-3.5 font-body text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
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
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      Add to Basket
    </button>
  );
}
