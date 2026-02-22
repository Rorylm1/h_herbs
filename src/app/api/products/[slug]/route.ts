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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
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

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
