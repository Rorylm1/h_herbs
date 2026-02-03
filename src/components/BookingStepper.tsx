/*
  BOOKING STEPPER — visual progress indicator for the 5-step booking flow.

  Shows numbered circles connected by organic vine lines. Completed steps
  show a checkmark, the current step is highlighted with a ring, and
  future steps are greyed out. Small leaf accents decorate the vine
  connectors for a botanical feel.

  Pure visual component — all booking logic lives in the parent BookingFlow.
*/

const steps = [
  "Practitioner",
  "Service",
  "Date & Time",
  "Your Details",
  "Confirmation",
];

/* Small leaf SVG used on completed vine connectors */
function VineConnector({ completed }: { completed: boolean }) {
  return (
    <div className="relative mx-1 sm:mx-2 flex items-center">
      <svg
        width="40"
        height="16"
        viewBox="0 0 40 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden sm:block"
        aria-hidden="true"
      >
        {/* Main vine line — organic curve instead of straight */}
        <path
          d="M2 8 C10 6, 18 10, 26 7 C30 6, 34 8, 38 8"
          stroke={completed ? "var(--color-forest-700)" : "var(--color-sage-200)"}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Small leaf accent on completed connectors */}
        {completed && (
          <>
            <path
              d="M18 7 C16 4, 13 4, 12 6"
              stroke="var(--color-forest-700)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M18 7 C16 10, 14 10, 13 8"
              stroke="var(--color-forest-700)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        )}
      </svg>
      {/* Simpler connector on mobile */}
      <div
        className={`sm:hidden h-0.5 w-6 rounded-full ${
          completed ? "bg-forest-700" : "bg-sage-200"
        }`}
      />
    </div>
  );
}

export default function BookingStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isCompleted
                    ? "bg-forest-700 text-white"
                    : isActive
                    ? "bg-forest-700 text-white ring-4 ring-sage-200"
                    : "bg-sage-100 text-muted"
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-1 text-[10px] sm:text-xs font-medium ${
                  isActive || isCompleted ? "text-forest-700" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Organic vine connector between steps */}
            {index < steps.length - 1 && (
              <VineConnector completed={isCompleted} />
            )}
          </div>
        );
      })}
    </div>
  );
}
