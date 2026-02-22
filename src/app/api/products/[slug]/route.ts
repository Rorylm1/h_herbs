/*
  PRODUCT DETAIL API — /api/products/[slug]

  GET    → Returns a single product by its slug (the primary key).
  PUT    → Updates a product. Only updates fields that are provided.
  DELETE → Deletes a product permanently.

  ARCHITECTURE TIP: The [slug] folder name creates a dynamic route segment.
  Next.js passes { params: { slug } } to each handler, giving us access
  to the URL parameter. For example, /api/products/chamomile-tea passes
  slug = "chamomile-tea".
*/

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export function GET(_request: Request, context: RouteContext) {
  return withErrorHandler(async () => {
    const { slug } = await context.params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return errorResponse("Product not found", 404);
    }

    return successResponse(product);
  });
}

export function PUT(request: Request, context: RouteContext) {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const { slug } = await context.params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse("Product not found", 404);
    }

    const product = await prisma.product.update({
      where: { slug },
      data: {
        name: body.name ?? existing.name,
        category: body.category ?? existing.category,
        concerns: body.concerns ?? existing.concerns,
        price:
          body.price !== undefined
            ? parseFloat(body.price)
            : existing.price,
        image: body.image ?? existing.image,
        shortDescription: body.shortDescription ?? existing.shortDescription,
        fullDescription: body.fullDescription ?? existing.fullDescription,
        ingredients: body.ingredients ?? existing.ingredients,
        usage: body.usage ?? existing.usage,
        latinName: body.latinName !== undefined ? body.latinName : existing.latinName,
        recommendedBy:
          body.recommendedBy !== undefined
            ? body.recommendedBy || null
            : existing.recommendedBy,
      },
    });

    return successResponse(product);
  });
}

export function DELETE(_request: Request, context: RouteContext) {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const { slug } = await context.params;

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse("Product not found", 404);
    }

    await prisma.product.delete({
      where: { slug },
    });

    return successResponse({ success: true });
  });
}
