import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET() {
  return withErrorHandler(async () => {
    const testimonials = await prisma.testimonial.findMany({
      where: { practitionerSlug: "hector" },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(testimonials);
  });
}

export function POST(request: Request) {
  return withErrorHandler(async () => {
    const body = await request.json();
    const { clientName, text, condition } = body;

    if (!clientName || !text || !condition) {
      return errorResponse(
        "clientName, text, and condition are required",
        400,
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        text,
        condition,
        practitionerSlug: "hector",
      },
    });

    return successResponse(testimonial, 201);
  });
}
