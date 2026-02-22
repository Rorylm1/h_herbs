import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET() {
  return withErrorHandler(async () => {
    const images = await prisma.siteImage.findMany({
      orderBy: { key: "asc" },
    });

    return successResponse(images);
  });
}

export function PUT(request: Request) {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const body = await request.json();
    const { id, url, alt } = body;

    if (!id) {
      return errorResponse("Image id is required", 400);
    }

    const existing = await prisma.siteImage.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Site image not found", 404);
    }

    const image = await prisma.siteImage.update({
      where: { id },
      data: {
        ...(url !== undefined && { url }),
        ...(alt !== undefined && { alt }),
      },
    });

    return successResponse(image);
  });
}
