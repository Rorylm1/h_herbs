/*
  SHOP MANAGEMENT PAGE — /practitioner/shop

  ARCHITECTURE TIP: This is a Server Component — it runs on the server
  at request time. That means we can query the database directly via
  Prisma (no API call needed!). The data is passed to the ShopManagement
  client component, which handles all the interactive bits (search,
  delete, etc.). This pattern is called "server-component-as-data-layer".
*/

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ShopManagement from "@/components/ShopManagement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Management | Hector's Herbs",
  description: "Manage products in the Hector's Herbs shop.",
};

export const dynamic = "force-dynamic";

async function ShopContent() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      name: true,
      category: true,
      price: true,
      image: true,
      shortDescription: true,
      concerns: true,
      createdAt: true,
    },
  });

  const serialized = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return <ShopManagement products={serialized} />;
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ShopContent />
    </Suspense>
  );
}
