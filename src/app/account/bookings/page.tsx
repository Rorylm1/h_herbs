import { Suspense } from "react";
import BookingsContent from "@/components/BookingsContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | Hector's Herbs",
  description: "View and manage your consultation appointments at Hector's Herbs.",
};

export const dynamic = 'force-dynamic';

export default async function BookingsPage() {
  const bookingsRaw = await prisma.booking.findMany({
    include: {
      practitioner: {
        select: { slug: true, name: true, photo: true, title: true },
      },
    },
    orderBy: { date: "desc" },
  });

  const bookings = bookingsRaw.map((b) => ({
    id: b.id,
    practitionerSlug: b.practitionerSlug,
    service: b.service,
    date: b.date,
    time: b.time,
    status: b.status as "upcoming" | "completed" | "cancelled",
    notes: b.notes,
    practitioner: b.practitioner,
  }));

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <BookingsContent bookings={bookings} />
    </Suspense>
  );
}
