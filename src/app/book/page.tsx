/*
  BOOKING PAGE — /book

  ARCHITECTURE TIP: This is a server component that wraps the client
  BookingFlow component in a <Suspense> boundary. This split is needed
  because:
  1. Server components can export metadata (for SEO)
  2. BookingFlow uses useSearchParams() which requires Suspense
  3. The Suspense boundary shows a loading state while the client
     component hydrates and reads the URL parameters
*/

import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";

export const metadata = {
  title: "Book a Consultation | Hector's Herbs",
  description:
    "Book a consultation with one of our qualified naturopathic herbalists. Choose your practitioner, service, and preferred time.",
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-cream py-20 text-center">
          <p className="text-muted">Loading booking...</p>
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
