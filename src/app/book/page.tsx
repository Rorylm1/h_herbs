/*
  BOOKING PAGE — /book

  ARCHITECTURE TIP: This is a server component that fetches practitioner
  data from the database and passes it as a prop to the client-side
  BookingFlow component. This split is needed because:
  1. Server components can export metadata (for SEO) and query the DB
  2. BookingFlow uses useSearchParams() which requires Suspense
  3. The Suspense boundary shows a loading state while the client
     component hydrates and reads the URL parameters
*/

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import BookingFlow from "@/components/BookingFlow";

export const metadata = {
  title: "Book a Consultation | Hector's Herbs",
  description:
    "Book a consultation with one of our qualified naturopathic herbalists. Choose your practitioner, service, and preferred time.",
};

export default async function BookingPage() {
  const practitioners = await prisma.practitioner.findMany({
    select: {
      slug: true,
      name: true,
      title: true,
      photo: true,
      specialities: true,
      services: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const formatted = practitioners.map((p) => ({
    ...p,
    services: p.services as Array<{
      name: string;
      duration: string;
      price: number;
      description: string;
    }>,
  }));

  return (
    <Suspense
      fallback={
        <div className="bg-cream py-20 text-center">
          <p className="text-muted">Loading booking...</p>
        </div>
      }
    >
      <BookingFlow practitioners={formatted} />
    </Suspense>
  );
}
