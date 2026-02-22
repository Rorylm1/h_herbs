import { Suspense } from "react";
import OrdersContent from "@/components/OrdersContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Hector's Herbs",
  description: "View your order history from the Hector's Herbs shop.",
};

type OrderItem = {
  productSlug: string;
  name: string;
  quantity: number;
  price: number;
};

export default async function OrdersPage() {
  const ordersRaw = await prisma.order.findMany({
    orderBy: { date: "desc" },
  });

  const orders = ordersRaw.map((o) => ({
    id: o.id,
    date: o.date,
    status: o.status as "processing" | "shipped" | "delivered",
    items: o.items as OrderItem[],
    total: o.total,
    trackingNumber: o.trackingNumber,
  }));

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <OrdersContent orders={orders} />
    </Suspense>
  );
}
