"use client";

/*
  PRESCRIPTIONS CONTENT — list of client prescriptions.

  Shows all prescriptions from consultations, sorted by date.
  Each prescription links to its detail page.
*/

import Link from "next/link";
import { useSession } from "next-auth/react";
import AccountSidebar from "@/components/AccountSidebar";
import PrescriptionCard from "@/components/PrescriptionCard";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";

type PrescriptionItem = {
  herb: string;
  productSlug?: string;
  form: string;
  dosage: string;
  duration: string;
};

type PrescriptionData = {
  id: string;
  practitionerSlug: string;
  date: string;
  condition: string;
  notes: string;
  items: PrescriptionItem[];
  practitionerName: string;
};

type PrescriptionsContentProps = {
  prescriptions: PrescriptionData[];
};

export default function PrescriptionsContent({ prescriptions }: PrescriptionsContentProps) {
  const { data: session, status } = useSession();
  const isClient = session?.user?.role === "client";

  if (status === "loading") {
    return null;
  }

  if (!isClient) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-forest-700 mb-4">
            Please Sign In
          </h1>
          <p className="text-muted mb-6">
            You need to be signed in as a client to view your prescriptions.
          </p>
          <Link
            href="/login"
            className="inline-block bg-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-12 md:py-16 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="prescriptions-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            My Prescriptions
          </h1>
          <p className="mt-2 text-sage-200/70">
            Herbal protocols from your consultations
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <AccountSidebar />

            {/* Prescriptions content */}
            <div className="flex-1">
              {/* Info banner */}
              <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-charcoal">
                    Your prescriptions contain personalized herbal recommendations.
                    Many herbs are available in our shop — click &ldquo;Order These Herbs&rdquo;
                    on any prescription to add them to your cart.
                  </p>
                </div>
              </div>

              {/* Prescriptions list */}
              {prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <PrescriptionCard key={prescription.id} prescription={prescription} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-sage-100 p-8 text-center">
                  <p className="text-muted mb-4">
                    You don&apos;t have any prescriptions yet.
                  </p>
                  <p className="text-sm text-muted mb-6">
                    Prescriptions are created by your herbalist after a consultation.
                  </p>
                  <Link
                    href="/book"
                    className="inline-block bg-forest-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
