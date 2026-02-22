import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.siteImage.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching site images:", error);
    return NextResponse.json(
      { error: "Failed to fetch site images" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, url, alt } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Image id is required" },
        { status: 400 }
      );
    }

    const image = await prisma.siteImage.update({
      where: { id },
      data: {
        ...(url !== undefined && { url }),
        ...(alt !== undefined && { alt }),
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error updating site image:", error);
    return NextResponse.json(
      { error: "Failed to update site image" },
      { status: 500 }
    );
  }
}
