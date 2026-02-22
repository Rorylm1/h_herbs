import { Suspense } from "react";
import AccountDashboard from "@/components/AccountDashboard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Hector's Herbs",
  description: "Manage your bookings, prescriptions, and orders at Hector's Herbs.",
};

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

type OrderItem = {
  productSlug: string;
  name: string;
  quantity: number;
  price: number;
};

export default async function AccountPage() {
  const [upcomingBookingsRaw, prescriptionsRaw, ordersRaw] = await Promise.all([
    prisma.booking.findMany({
      where: { status: "upcoming" },
      orderBy: { date: "asc" },
      include: { practitioner: { select: { name: true } } },
    }),
    prisma.prescription.findMany({
      orderBy: { date: "desc" },
    }),
    prisma.order.findMany({
      orderBy: { date: "desc" },
    }),
  ]);

  const upcomingBookings = upcomingBookingsRaw.map((b) => ({
    id: b.id,
    service: b.service,
    date: b.date,
    time: b.time,
    practitioner: b.practitioner,
  }));

  const prescriptionsCount = prescriptionsRaw.length;
  const ordersCount = ordersRaw.length;

  const recentRx = prescriptionsRaw[0];
  let recentPrescription = null;
  if (recentRx) {
    const practitioner = await prisma.practitioner.findUnique({
      where: { slug: recentRx.practitionerSlug },
      select: { name: true },
    });
    const items = recentRx.items as PrescriptionItem[];
    recentPrescription = {
      id: recentRx.id,
      condition: recentRx.condition,
      date: recentRx.date,
      herbCount: items.length,
      practitionerName: practitioner?.name || recentRx.practitionerSlug,
    };
  }

  const recentOrd = ordersRaw[0];
  let recentOrder = null;
  if (recentOrd) {
    const items = recentOrd.items as OrderItem[];
    recentOrder = {
      id: recentOrd.id,
      date: recentOrd.date,
      total: recentOrd.total,
      status: recentOrd.status,
      itemCount: items.length,
    };
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <AccountDashboard
        upcomingBookings={upcomingBookings}
        prescriptionsCount={prescriptionsCount}
        ordersCount={ordersCount}
        recentPrescription={recentPrescription}
        recentOrder={recentOrder}
      />
    </Suspense>
  );
}
