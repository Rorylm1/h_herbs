/*
  AVAILABILITY PREVIEW — a mock weekly calendar showing
  available appointment slots.

  This is purely visual for the prototype. It displays a
  week grid with some pre-set "available" slots. In the real
  app this would pull from the practitioner's actual calendar.

  No "use client" needed — all static rendering.
*/

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

/*
  Mock availability — a set of "day-time" keys that are available.
  Different practitioners would have different availability patterns.
*/
const availableSlots = new Set([
  "Mon-9:00", "Mon-10:00", "Mon-14:00",
  "Tue-10:00", "Tue-11:00", "Tue-15:00", "Tue-16:00",
  "Wed-9:00", "Wed-14:00", "Wed-15:00",
  "Thu-10:00", "Thu-11:00", "Thu-14:00", "Thu-15:00", "Thu-16:00",
  "Fri-9:00", "Fri-10:00",
]);

export default function AvailabilityPreview({
  practitionerName,
}: {
  practitionerName: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted mb-4">
        Showing a typical week for {practitionerName}. Actual availability may
        vary — select your preferred slot when booking.
      </p>

      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          {/* Day headers */}
          <div className="grid grid-cols-6 gap-1.5 mb-1.5">
            <div /> {/* Empty corner cell */}
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-forest-700 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time rows */}
          {times.map((time) => (
            <div key={time} className="grid grid-cols-6 gap-1.5 mb-1.5">
              {/* Time label */}
              <div className="flex items-center justify-end pr-2 text-xs text-muted">
                {time}
              </div>

              {/* Slot cells */}
              {days.map((day) => {
                const isAvailable = availableSlots.has(`${day}-${time}`);
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`h-9 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                      isAvailable
                        ? "bg-sage-100 text-forest-700 cursor-pointer hover:bg-sage-200"
                        : "bg-gray-50 text-gray-300"
                    }`}
                  >
                    {isAvailable ? "Open" : "—"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-sage-100 border border-sage-200" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-gray-50 border border-gray-200" />
          Unavailable
        </div>
      </div>
    </div>
  );
}
