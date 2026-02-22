/*
  ARTICLE CRUD API — /api/articles/[slug]

  GET    → Fetch a single article by slug
  PUT    → Update an article
  DELETE → Delete an article
*/

import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withErrorHandler(async () => {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return errorResponse("Article not found", 404);
    }

    return successResponse(article);
  });
}

export function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withErrorHandler(async () => {
    const { slug } = await params;
    const body = await request.json();

    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse("Article not found", 404);
    }

    const article = await prisma.article.update({
      where: { slug },
      data: {
        title: body.title,
        category: body.category,
        featuredImage: body.featuredImage,
        excerpt: body.excerpt,
        content: body.content,
        status: body.status,
        publishedDate: body.publishedDate
          ? new Date(body.publishedDate)
          : undefined,
      },
    });

    return successResponse(article);
  });
}

export function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withErrorHandler(async () => {
    const { slug } = await params;

    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse("Article not found", 404);
    }

    await prisma.article.delete({
      where: { slug },
    });

    return successResponse({ success: true });
  });
}
