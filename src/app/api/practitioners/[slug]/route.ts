/*
  PRACTITIONER API — /api/practitioners/[slug]

  GET  → Fetch a single practitioner by slug
  PUT  → Update a practitioner's profile fields
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const practitioner = await prisma.practitioner.findUnique({
      where: { slug },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(practitioner);
  } catch (error) {
    console.error("Failed to fetch practitioner:", error);
    return NextResponse.json(
      { error: "Failed to fetch practitioner" },
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

    const updatable = {
      name: body.name,
      title: body.title,
      tagline: body.tagline,
      bio: body.bio,
      approach: body.approach,
      photo: body.photo,
      instagram: body.instagram,
      specialities: body.specialities,
      qualifications: body.qualifications,
      certifications: body.certifications,
      services: body.services,
    };

    // Remove undefined fields so Prisma only updates what's provided
    const data = Object.fromEntries(
      Object.entries(updatable).filter(([, v]) => v !== undefined)
    );

    const practitioner = await prisma.practitioner.update({
      where: { slug },
      data,
    });

    return NextResponse.json(practitioner);
  } catch (error) {
    console.error("Failed to update practitioner:", error);
    return NextResponse.json(
      { error: "Failed to update practitioner" },
      { status: 500 }
    );
  }
}
