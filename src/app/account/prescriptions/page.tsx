import { Suspense } from "react";
import PrescriptionsContent from "@/components/PrescriptionsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Prescriptions | Hector's Herbs",
  description: "View your herbal prescriptions from consultations at Hector's Herbs.",
};

export default function PrescriptionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PrescriptionsContent />
    </Suspense>
  );
}
