import { Suspense } from "react";
import PrescriptionsContent from "@/components/PrescriptionsContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Prescriptions | Hector's Herbs",
  description: "View your herbal prescriptions from consultations at Hector's Herbs.",
};

export const dynamic = 'force-dynamic';

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

export default async function PrescriptionsPage() {
  const prescriptionsRaw = await prisma.prescription.findMany({
    orderBy: { date: "desc" },
  });

  const practitionerSlugs = [
    ...new Set(prescriptionsRaw.map((p) => p.practitionerSlug)),
  ];
  const practitioners = await prisma.practitioner.findMany({
    where: { slug: { in: practitionerSlugs } },
    select: { slug: true, name: true },
  });
  const nameMap = Object.fromEntries(practitioners.map((p) => [p.slug, p.name]));

  const prescriptions = prescriptionsRaw.map((p) => ({
    id: p.id,
    practitionerSlug: p.practitionerSlug,
    date: p.date,
    condition: p.condition,
    notes: p.notes,
    items: p.items as PrescriptionItem[],
    practitionerName: nameMap[p.practitionerSlug] || p.practitionerSlug,
  }));

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PrescriptionsContent prescriptions={prescriptions} />
    </Suspense>
  );
}
