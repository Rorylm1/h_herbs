/*
  HERB SHOP PAGE — /shop

  Server component wrapper that exports metadata for SEO,
  then renders the client-side ShopContent component which
  handles the interactive filter state.
*/

import ShopContent from "@/components/ShopContent";
import type { Product } from "@/types";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Herb Shop | Hector's Herbs",
  description:
    "Browse our range of quality herbal remedies — tinctures, teas, capsules, and dried herbs. Handpicked and recommended by our practitioners.",
};

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = (await prisma.product.findMany()) as unknown as Product[];
  return <ShopContent products={products} />;
}
