import { Suspense } from "react";
import BookingsContent from "@/components/BookingsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | Hector's Herbs",
  description: "View and manage your consultation appointments at Hector's Herbs.",
};

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <BookingsContent />
    </Suspense>
  );
}
