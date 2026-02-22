"use client";

/*
  BOOKING CARD — displays a single booking in list views.

  Shows practitioner, service, date/time, and status badge.
  Includes action buttons for upcoming bookings (calendar link, cancel).
*/

import Link from "next/link";
import AddToCalendarLink from "@/components/AddToCalendarLink";

type BookingPractitioner = {
  slug: string;
  name: string;
  photo: string;
  title: string;
};

type BookingData = {
  id: string;
  practitionerSlug: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  notes: string | null;
  practitioner: BookingPractitioner;
};

type BookingCardProps = {
  booking: BookingData;
};

export default function BookingCard({ booking }: BookingCardProps) {
  const practitioner = booking.practitioner;

  // Format date for display
  const dateObj = new Date(booking.date);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Status badge colors
  const statusStyles = {
    upcoming: "bg-emerald-100 text-emerald-700",
    completed: "bg-sage-100 text-charcoal",
    cancelled: "bg-red-100 text-red-700",
  };

  // Build calendar event data for upcoming bookings
  const calendarEvent = (() => {
    if (booking.status !== "upcoming" || !practitioner) return null;
    const [hours, minutes] = booking.time.split(":").map(Number);
    const start = new Date(booking.date);
    start.setHours(hours, minutes, 0, 0);
    const durationMinutes = booking.service.includes("Initial") ? 60 : 30;
    const end = new Date(start.getTime() + durationMinutes * 60_000);
    return {
      title: `${booking.service} with ${practitioner.name}`,
      startDate: start,
      endDate: end,
      location: "12 Warrington Crescent, London W9 1EB",
      description: booking.notes || `Your ${booking.service.toLowerCase()} at Hector's Herbs`,
    };
  })();

  return (
    <div className="bg-white rounded-xl border border-sage-100 p-5 hover:shadow-card transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Practitioner photo */}
        {practitioner && (
          <div className="flex-shrink-0">
            <img
              src={practitioner.photo}
              alt={practitioner.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-sage-100"
            />
          </div>
        )}

        {/* Booking details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3 className="font-heading text-lg font-semibold text-forest-700">
              {booking.service}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          {practitioner && (
            <p className="text-charcoal">
              with{" "}
              <Link
                href={`/herbalists/${practitioner.slug}`}
                className="text-forest-700 hover:underline font-medium"
              >
                {practitioner.name}
              </Link>
            </p>
          )}

          <p className="text-sm text-muted mt-1">
            {formattedDate} at {booking.time}
          </p>

          {booking.notes && (
            <p className="text-sm text-muted mt-2 italic">
              &ldquo;{booking.notes}&rdquo;
            </p>
          )}
        </div>

        {/* Actions for upcoming bookings */}
        {booking.status === "upcoming" && (
          <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
            {calendarEvent && (
              <AddToCalendarLink
                title={calendarEvent.title}
                startDate={calendarEvent.startDate}
                endDate={calendarEvent.endDate}
                location={calendarEvent.location}
                description={calendarEvent.description}
                label="Add to Calendar"
              />
            )}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              onClick={() => alert("Cancel booking functionality would go here")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
