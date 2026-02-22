/*
  AVAILABILITY API — /api/availability

  GET → List availability slots for a practitioner (by practitionerSlug query param)
  PUT → Bulk upsert availability for all 7 days of the week
*/

import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET(request: Request) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url);
    const practitionerSlug = searchParams.get("practitionerSlug");

    if (!practitionerSlug) {
      return errorResponse("practitionerSlug is required", 400);
    }

    const availability = await prisma.availability.findMany({
      where: { practitionerSlug },
      orderBy: { dayOfWeek: "asc" },
    });

    return successResponse(availability);
  });
}

type AvailabilitySlot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export function PUT(request: Request) {
  return withErrorHandler(async () => {
    const { practitionerSlug, slots } = (await request.json()) as {
      practitionerSlug: string;
      slots: AvailabilitySlot[];
    };

    if (!practitionerSlug || !slots) {
      return errorResponse("practitionerSlug and slots are required", 400);
    }

    // Upsert each day's availability in a transaction
    const results = await prisma.$transaction(
      slots.map((slot) =>
        prisma.availability.upsert({
          where: {
            practitionerSlug_dayOfWeek: {
              practitionerSlug,
              dayOfWeek: slot.dayOfWeek,
            },
          },
          update: {
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          },
          create: {
            practitionerSlug,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          },
        }),
      ),
    );

    return successResponse(results);
  });
}
