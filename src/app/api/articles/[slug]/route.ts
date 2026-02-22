/*
  ARTICLE CRUD API — /api/articles/[slug]

  GET    → Fetch a single article by slug
  PUT    → Update an article
  DELETE → Delete an article
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const body = await request.json();

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

    return NextResponse.json(article);
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
