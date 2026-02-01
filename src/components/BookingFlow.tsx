"use client";

/*
  BOOKING FLOW — the full 5-step booking process.

  ARCHITECTURE TIP: This is a "use client" component because the
  entire flow is interactive — step navigation, selections, form inputs.
  It uses useSearchParams() to read pre-selected values from the URL
  (e.g., /book?practitioner=hector&service=Initial%20Consultation).

  The parent page.tsx wraps this in <Suspense> because useSearchParams
  needs a Suspense boundary in Next.js App Router.

  Steps:
  1. Select practitioner (pre-filled from URL if available)
  2. Select service type
  3. Pick date & time (mock calendar with real upcoming dates)
  4. Enter your details (name, email, phone, notes)
  5. Confirmation with "Add to Google Calendar" links
*/

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { practitioners } from "@/data/practitioners";
import BookingStepper from "./BookingStepper";
import AddToCalendarLink from "./AddToCalendarLink";

/* ── Helper: parse "60 minutes" → 60 ── */
function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) : 60;
}

/* ── Helper: generate next N weekdays from today ── */
function getUpcomingWeekdays(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let current = new Date(today);
  current.setDate(current.getDate() + 1); // start from tomorrow

  while (dates.length < count) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      // Skip weekends
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/* ── Helper: deterministic mock availability ── */
function isSlotAvailable(dateStr: string, time: string): boolean {
  const hash = (dateStr + time)
    .split("")
    .reduce((a, b) => a + b.charCodeAt(0), 0);
  return hash % 3 !== 0; // ~67% of slots available
}

const timeSlots = [
  "9:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
];

const LOCATION = "12 Warrington Crescent, London, W9 1EL";

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const preselectedPractitioner = searchParams.get("practitioner");
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [selectedPractitioner, setSelectedPractitioner] = useState<string | null>(
    preselectedPractitioner
  );
  const [selectedService, setSelectedService] = useState<string | null>(
    preselectedService
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const upcomingDates = useMemo(() => getUpcomingWeekdays(10), []);

  const practitioner = practitioners.find(
    (p) => p.slug === selectedPractitioner
  );
  const service = practitioner?.services.find(
    (s) => s.name === selectedService
  );

  /* ── Navigation helpers ── */
  const canContinue = (): boolean => {
    switch (step) {
      case 1:
        return !!selectedPractitioner;
      case 2:
        return !!selectedService;
      case 3:
        return !!selectedDate && !!selectedTime;
      case 4:
        return !!details.name && !!details.email && !!details.phone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canContinue() && step < 5) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  /* ── Date/time for calendar links ── */
  function getBookingDates() {
    if (!selectedDate || !selectedTime || !service) return null;
    const [year, month, day] = selectedDate.split("-").map(Number);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);
    const durationMin = parseDuration(service.duration);
    const end = new Date(start.getTime() + durationMin * 60 * 1000);
    return { start, end };
  }

  /* ── Format date for display ── */
  function formatDisplayDate(dateStr: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div>
      {/* Stepper */}
      <div className="bg-earth-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BookingStepper currentStep={step} />
        </div>
      </div>

      <section className="bg-cream py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* ═══════════ STEP 1: Select Practitioner ═══════════ */}
          {step === 1 && (
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
                Choose Your Practitioner
              </h1>
              <p className="mt-2 text-muted">
                Select the herbalist you&apos;d like to book with.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {practitioners.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => {
                      setSelectedPractitioner(p.slug);
                      setSelectedService(null); // reset downstream
                    }}
                    className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedPractitioner === p.slug
                        ? "border-forest-700 bg-sage-50 ring-2 ring-forest-700/20"
                        : "border-sage-100 bg-white hover:border-sage-200 hover:shadow-card"
                    }`}
                  >
                    <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden">
                      <Image
                        src={p.photo}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-semibold text-forest-700">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted truncate">{p.title}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {p.specialities.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-sage-100 px-2 py-0.5 text-[10px] text-forest-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════ STEP 2: Select Service ═══════════ */}
          {step === 2 && practitioner && (
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
                Select a Service
              </h1>
              <p className="mt-2 text-muted">
                Choose your consultation type with{" "}
                {practitioner.name.split(" ")[0]}.
              </p>
              <div className="mt-6 space-y-4">
                {practitioner.services.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedService(s.name)}
                    className={`w-full rounded-xl border p-5 text-left transition-all ${
                      selectedService === s.name
                        ? "border-forest-700 bg-sage-50 ring-2 ring-forest-700/20"
                        : "border-sage-100 bg-white hover:border-sage-200 hover:shadow-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-heading text-lg font-semibold text-forest-700">
                          {s.name}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {s.duration}
                        </p>
                        <p className="mt-2 text-sm text-charcoal leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-earth-100 px-3 py-1.5 text-sm font-bold text-forest-700">
                        &pound;{s.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════ STEP 3: Pick Date & Time ═══════════ */}
          {step === 3 && (
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
                Pick a Date &amp; Time
              </h1>
              <p className="mt-2 text-muted">
                Select an available appointment slot.
              </p>

              {/* Date tabs */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                {upcomingDates.map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setSelectedTime(null);
                      }}
                      className={`shrink-0 rounded-lg border px-4 py-3 text-center transition-all ${
                        isSelected
                          ? "border-forest-700 bg-forest-700 text-white"
                          : "border-sage-100 bg-white text-charcoal hover:border-sage-200"
                      }`}
                    >
                      <p className="text-xs font-medium">
                        {date.toLocaleDateString("en-GB", {
                          weekday: "short",
                        })}
                      </p>
                      <p className="text-lg font-bold">{date.getDate()}</p>
                      <p className="text-xs">
                        {date.toLocaleDateString("en-GB", { month: "short" })}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Time slots for selected date */}
              {selectedDate && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-charcoal mb-3">
                    Available times
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {timeSlots.map((time) => {
                      const available = isSlotAvailable(selectedDate, time);
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          disabled={!available}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border py-3 text-sm font-medium transition-all ${
                            isSelected
                              ? "border-forest-700 bg-forest-700 text-white"
                              : available
                              ? "border-sage-100 bg-white text-charcoal hover:border-sage-200"
                              : "border-transparent bg-gray-50 text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ STEP 4: Your Details ═══════════ */}
          {step === 4 && (
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700">
                Your Details
              </h1>
              <p className="mt-2 text-muted">
                Tell us a bit about yourself so we can prepare for your
                consultation.
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none"
                    placeholder="e.g., Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none"
                    placeholder="07700 900000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Notes for your practitioner{" "}
                    <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={details.notes}
                    onChange={(e) =>
                      setDetails({ ...details, notes: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-charcoal placeholder:text-muted/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none resize-none"
                    placeholder="Briefly describe your health concerns or what you'd like to discuss..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ STEP 5: Confirmation ═══════════ */}
          {step === 5 && practitioner && service && (
            <div className="text-center">
              {/* Checkmark */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-forest-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>

              <h1 className="mt-5 font-heading text-2xl md:text-3xl font-semibold text-forest-700">
                Booking Confirmed!
              </h1>
              <p className="mt-2 text-muted">
                Your appointment has been booked. We&apos;ve sent a confirmation
                to {details.email}.
              </p>

              {/* Booking summary */}
              <div className="mt-8 rounded-xl bg-white border border-sage-100 p-6 text-left max-w-md mx-auto">
                <h3 className="font-heading text-lg font-semibold text-forest-700 mb-4">
                  Booking Summary
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Practitioner</dt>
                    <dd className="font-medium text-charcoal">
                      {practitioner.name}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Service</dt>
                    <dd className="font-medium text-charcoal">
                      {service.name}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium text-charcoal">
                      {service.duration}
                    </dd>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Date</dt>
                      <dd className="font-medium text-charcoal">
                        {formatDisplayDate(selectedDate)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted">Time</dt>
                    <dd className="font-medium text-charcoal">
                      {selectedTime}
                    </dd>
                  </div>
                  <div className="border-t border-sage-100 pt-3 flex justify-between">
                    <dt className="font-semibold text-charcoal">Total</dt>
                    <dd className="font-bold text-forest-700">
                      &pound;{service.price}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Google Calendar links */}
              {(() => {
                const dates = getBookingDates();
                if (!dates) return null;
                const clientDesc = `${service.name} with ${practitioner.name} at Hector's Herbs.\n\nDuration: ${service.duration}\nPrice: £${service.price}\n\nPlease arrive 5 minutes early. If you need to reschedule, contact us at least 24 hours in advance.`;
                const practitionerDesc = `Client: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}\n\nService: ${service.name} (${service.duration})\n\nNotes: ${details.notes || "None provided"}`;

                return (
                  <div className="mt-8 space-y-3">
                    <p className="text-sm text-muted">
                      Add this appointment to your calendar:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <AddToCalendarLink
                        title={`${service.name} — Hector's Herbs`}
                        description={clientDesc}
                        location={LOCATION}
                        startDate={dates.start}
                        endDate={dates.end}
                        label="Add to My Calendar"
                      />
                      <AddToCalendarLink
                        title={`${details.name} — ${service.name}`}
                        description={practitionerDesc}
                        location={LOCATION}
                        startDate={dates.start}
                        endDate={dates.end}
                        label="Practitioner Calendar"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Navigation links */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/herbalists/${practitioner.slug}`}
                  className="rounded-lg border border-sage-200 px-6 py-3 text-sm font-semibold text-forest-700 uppercase tracking-wide hover:bg-sage-50 transition-colors"
                >
                  View {practitioner.name.split(" ")[0]}&apos;s Profile
                </Link>
                <Link
                  href="/"
                  className="rounded-lg border border-sage-200 px-6 py-3 text-sm font-semibold text-forest-700 uppercase tracking-wide hover:bg-sage-50 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* ── Navigation Buttons ── */}
          {step < 5 && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="rounded-lg border border-sage-200 px-5 py-2.5 text-sm font-medium text-muted hover:text-forest-700 hover:border-sage-300 transition-colors"
                >
                  &larr; Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleNext}
                disabled={!canContinue()}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  canContinue()
                    ? "bg-forest-700 text-white hover:bg-forest-800"
                    : "bg-sage-100 text-muted cursor-not-allowed"
                }`}
              >
                {step === 4 ? "Confirm Booking" : "Continue"} &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
