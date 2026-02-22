/*
  ARTICLES API — /api/articles

  GET  → List articles, optionally filtered by authorSlug
  POST → Create a new article
*/

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  withErrorHandler,
} from "@/lib/api-helpers";

export function GET(request: Request) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url);
    const authorSlug = searchParams.get("authorSlug");

    const articles = await prisma.article.findMany({
      where: authorSlug ? { authorSlug } : undefined,
      orderBy: { publishedDate: "desc" },
    });

    return successResponse(articles);
  });
}

export function POST(request: Request) {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const body = await request.json();

    if (!body.slug || !body.title || !body.authorSlug || !body.content) {
      return errorResponse(
        "slug, title, authorSlug, and content are required",
        400,
      );
    }

    const article = await prisma.article.create({
      data: {
        slug: body.slug,
        title: body.title,
        authorSlug: body.authorSlug,
        category: body.category,
        featuredImage: body.featuredImage,
        excerpt: body.excerpt,
        content: body.content,
        publishedDate: new Date(body.publishedDate || Date.now()),
        status: body.status || "draft",
      },
    });

    return successResponse(article, 201);
  });
}
