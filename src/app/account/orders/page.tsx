import { Suspense } from "react";
import OrdersContent from "@/components/OrdersContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Hector's Herbs",
  description: "View your order history from the Hector's Herbs shop.",
};

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <OrdersContent />
    </Suspense>
  );
}
