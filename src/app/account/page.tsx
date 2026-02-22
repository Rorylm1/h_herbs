import { Suspense } from "react";
import AccountDashboard from "@/components/AccountDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Hector's Herbs",
  description: "Manage your bookings, prescriptions, and orders at Hector's Herbs.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <AccountDashboard />
    </Suspense>
  );
}
