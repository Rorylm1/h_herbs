import { Suspense } from "react";
import PrescriptionDetail from "@/components/PrescriptionDetail";
import { prescriptions, getPrescriptionById } from "@/data/prescriptions";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Generate static paths for all prescriptions
export function generateStaticParams() {
  return prescriptions.map((prescription) => ({
    id: prescription.id,
  }));
}

// Dynamic metadata based on prescription
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const prescription = getPrescriptionById(id);

  if (!prescription) {
    return {
      title: "Prescription Not Found | Hector's Herbs",
    };
  }

  return {
    title: `${prescription.condition} Prescription | Hector's Herbs`,
    description: `View your ${prescription.condition.toLowerCase()} prescription with ${prescription.items.length} herbs.`,
  };
}

export default async function PrescriptionDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PrescriptionDetail prescriptionId={id} />
    </Suspense>
  );
}
