import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, withErrorHandler } from "@/lib/api-helpers";

export function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const practitioner = request.nextUrl.searchParams.get("practitioner");

    const bookings = await prisma.booking.findMany({
      where: practitioner ? { practitionerSlug: practitioner } : undefined,
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return successResponse(bookings);
  });
}
