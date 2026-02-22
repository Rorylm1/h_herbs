/*
  ARTICLES API — /api/articles

  GET  → List articles, optionally filtered by authorSlug
  POST → Create a new article
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorSlug = searchParams.get("authorSlug");

  try {
    const articles = await prisma.article.findMany({
      where: authorSlug ? { authorSlug } : undefined,
      orderBy: { publishedDate: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
