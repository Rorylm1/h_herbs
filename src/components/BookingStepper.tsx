/*
  BOOKING STEPPER — visual progress indicator for the 5-step booking flow.

  Shows numbered circles connected by lines. Completed steps show
  a checkmark, the current step is highlighted with a ring, and
  future steps are greyed out. Pure visual component — all booking
  logic lives in the parent BookingFlow component.
*/

const steps = [
  "Practitioner",
  "Service",
  "Date & Time",
  "Your Details",
  "Confirmation",
];

export default function BookingStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
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

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`mx-1 sm:mx-2 h-0.5 w-6 sm:w-10 ${
                  isCompleted ? "bg-forest-700" : "bg-sage-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
