/*
  PRODUCTS API — /api/products

  GET  → Returns all products ordered by creation date (newest first).
  POST → Creates a new product. Validates required fields before inserting.

  ARCHITECTURE TIP: These are Next.js Route Handlers — server-only code
  that runs on Vercel serverless functions. They provide a REST-style API
  that our client components can call with fetch(). The Prisma client
  handles all database queries.
*/

import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET() {
  return withErrorHandler(async () => {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return successResponse(products);
  });
}

const REQUIRED_FIELDS = [
  "slug",
  "name",
  "category",
  "price",
  "image",
  "shortDescription",
  "fullDescription",
  "ingredients",
  "usage",
] as const;

export function POST(request: Request) {
  return withErrorHandler(async () => {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
    if (missing.length > 0) {
      return errorResponse(
        `Missing required fields: ${missing.join(", ")}`,
        400,
      );
    }

    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        category: body.category,
        concerns: body.concerns || [],
        price: parseFloat(body.price),
        image: body.image,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        ingredients: body.ingredients,
        usage: body.usage,
        latinName: body.latinName || null,
        recommendedBy: body.recommendedBy || null,
      },
    });

    return successResponse(product, 201);
  });
}
