import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const practitioner = request.nextUrl.searchParams.get("practitioner");

    const bookings = await prisma.booking.findMany({
      where: practitioner ? { practitionerSlug: practitioner } : undefined,
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
