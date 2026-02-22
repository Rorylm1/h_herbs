/*
  AVAILABILITY API — /api/availability

  GET → List availability slots for a practitioner (by practitionerSlug query param)
  PUT → Bulk upsert availability for all 7 days of the week
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const practitionerSlug = searchParams.get("practitionerSlug");

  if (!practitionerSlug) {
    return NextResponse.json(
      { error: "practitionerSlug is required" },
      { status: 400 }
    );
  }

  try {
    const availability = await prisma.availability.findMany({
      where: { practitionerSlug },
      orderBy: { dayOfWeek: "asc" },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Failed to fetch availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

type AvailabilitySlot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export async function PUT(request: Request) {
  try {
    const { practitionerSlug, slots } = (await request.json()) as {
      practitionerSlug: string;
      slots: AvailabilitySlot[];
    };

    if (!practitionerSlug || !slots) {
      return NextResponse.json(
        { error: "practitionerSlug and slots are required" },
        { status: 400 }
      );
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
        })
      )
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to update availability:", error);
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
