import { Suspense } from "react";
import { notFound } from "next/navigation";
import PrescriptionDetail from "@/components/PrescriptionDetail";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const prescription = await prisma.prescription.findUnique({ where: { id } });

  if (!prescription) {
    return { title: "Prescription Not Found | Hector's Herbs" };
  }

  const items = prescription.items as PrescriptionItem[];
  return {
    title: `${prescription.condition} Prescription | Hector's Herbs`,
    description: `View your ${prescription.condition.toLowerCase()} prescription with ${items.length} herbs.`,
  };
}

export default async function PrescriptionDetailPage({ params }: Props) {
  const { id } = await params;

  const prescriptionRaw = await prisma.prescription.findUnique({
    where: { id },
  });

  if (!prescriptionRaw) {
    notFound();
  }

  const items = prescriptionRaw.items as PrescriptionItem[];

  const productSlugs = items
    .map((item) => item.productSlug)
    .filter((slug): slug is string => !!slug);

  const [practitionerRaw, productsRaw] = await Promise.all([
    prisma.practitioner.findUnique({
      where: { slug: prescriptionRaw.practitionerSlug },
      select: { slug: true, name: true, title: true, photo: true },
    }),
    prisma.product.findMany({
      where: { slug: { in: productSlugs } },
      select: { slug: true, name: true, price: true, image: true },
    }),
  ]);

  const prescription = {
    id: prescriptionRaw.id,
    practitionerSlug: prescriptionRaw.practitionerSlug,
    date: prescriptionRaw.date,
    condition: prescriptionRaw.condition,
    notes: prescriptionRaw.notes,
    items,
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PrescriptionDetail
        prescription={prescription}
        practitioner={practitionerRaw}
        products={productsRaw}
      />
    </Suspense>
  );
}
