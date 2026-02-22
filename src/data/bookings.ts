/*
  DUMMY DATA — Client Bookings

  Mock bookings for the client account area. In a real app these
  would come from a database and be linked to the authenticated user.
  For the prototype, we just show these to any "logged in" client.
*/

export type Booking = {
  id: string;
  practitionerSlug: string;
  service: string;
  date: string;        // ISO date string (YYYY-MM-DD)
  time: string;        // 24-hour format (HH:MM)
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;      // Client's notes added during booking
};

export const bookings: Booking[] = [
  {
    id: "bk-001",
    practitionerSlug: "hector",
    service: "Initial Consultation",
    date: "2026-02-20",
    time: "10:00",
    status: "upcoming",
    notes: "Would like to discuss ongoing digestive issues and fatigue.",
  },
  {
    id: "bk-002",
    practitionerSlug: "priya-sharma",
    service: "Follow-Up Consultation",
    date: "2026-03-05",
    time: "14:30",
    status: "upcoming",
    notes: "Review progress after 4 weeks on the anxiety protocol.",
  },
  {
    id: "bk-003",
    practitionerSlug: "hector",
    service: "Initial Consultation",
    date: "2026-01-15",
    time: "11:00",
    status: "completed",
    notes: "First visit to discuss stress and sleep issues.",
  },
  {
    id: "bk-004",
    practitionerSlug: "hector",
    service: "Follow-Up Consultation",
    date: "2026-01-29",
    time: "09:30",
    status: "completed",
  },
  {
    id: "bk-005",
    practitionerSlug: "amara-osei",
    service: "Initial Consultation",
    date: "2026-01-08",
    time: "15:00",
    status: "cancelled",
    notes: "Had to reschedule due to illness.",
  },
];

/*
  Helper function to get bookings by status.
  Useful for the bookings page filters.
*/
export function getBookingsByStatus(status: Booking["status"]): Booking[] {
  return bookings.filter((b) => b.status === status);
}

/*
  Helper to get upcoming bookings sorted by date (soonest first).
*/
export function getUpcomingBookings(): Booking[] {
  return bookings
    .filter((b) => b.status === "upcoming")
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
}

/*
  Helper to get past bookings (completed or cancelled) sorted by date (most recent first).
*/
export function getPastBookings(): Booking[] {
  return bookings
    .filter((b) => b.status === "completed" || b.status === "cancelled")
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
}
