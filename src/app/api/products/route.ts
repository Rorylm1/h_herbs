/*
  PRODUCTS API — /api/products

  GET  → Returns all products ordered by creation date (newest first).
  POST → Creates a new product. Validates required fields before inserting.

  ARCHITECTURE TIP: These are Next.js Route Handlers — server-only code
  that runs on Vercel serverless functions. They provide a REST-style API
  that our client components can call with fetch(). The Prisma client
  handles all database queries.
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);

    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
