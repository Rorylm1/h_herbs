/*
  ADD TO CALENDAR LINK — generates a Google Calendar event URL.

  ARCHITECTURE TIP: Instead of using the Google Calendar API (which
  requires OAuth, API keys, and server-side code), we construct a URL
  that opens Google Calendar's "create event" page with all the booking
  details pre-filled. The user just clicks "Save" in Google Calendar.

  This is Phase 1 of our Google Calendar integration — zero infrastructure,
  immediate value. Phase 2 (Milestone 8) will add full API integration.

  URL format: calendar.google.com/calendar/event?action=TEMPLATE&text=...&dates=...
*/

type CalendarEventProps = {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

/*
  Google Calendar wants dates in this format: YYYYMMDDTHHmmssZ
  The Z suffix means UTC. We convert local dates to UTC strings.
*/
function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildGoogleCalendarUrl({
  title,
  description,
  location,
  startDate,
  endDate,
}: CalendarEventProps): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: description,
    location: location,
  });
  return `https://calendar.google.com/calendar/event?${params.toString()}`;
}

export default function AddToCalendarLink({
  title,
  description,
  location,
  startDate,
  endDate,
  label = "Add to Google Calendar",
}: CalendarEventProps & { label?: string }) {
  const url = buildGoogleCalendarUrl({
    title,
    description,
    location,
    startDate,
    endDate,
  });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm font-medium text-forest-700 hover:bg-sage-50 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
      {label}
    </a>
  );
}
