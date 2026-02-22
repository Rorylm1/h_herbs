import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

const VALID_STATUSES = ["upcoming", "completed", "cancelled"];

export function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return errorResponse(
        `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        400,
      );
    }

    const existing = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Booking not found", 404);
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return successResponse(booking);
  });
}
