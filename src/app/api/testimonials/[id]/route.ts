import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const body = await request.json();
    const { clientName, text, condition } = body;

    if (!clientName || !text || !condition) {
      return errorResponse(
        "clientName, text, and condition are required",
        400,
      );
    }

    const existing = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Testimonial not found", 404);
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { clientName, text, condition },
    });

    return successResponse(testimonial);
  });
}

export function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return withErrorHandler(async () => {
    const { id } = await params;

    const existing = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Testimonial not found", 404);
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return successResponse({ success: true });
  });
}
