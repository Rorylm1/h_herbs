/*
  PRACTITIONER API — /api/practitioners/[slug]

  GET  → Fetch a single practitioner by slug
  PUT  → Update a practitioner's profile fields
*/

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
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

    const practitioner = await prisma.practitioner.findUnique({
      where: { slug },
    });

    if (!practitioner) {
      return errorResponse("Practitioner not found", 404);
    }

    return successResponse(practitioner);
  });
}

export function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const { slug } = await params;
    const body = await request.json();

    const existing = await prisma.practitioner.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse("Practitioner not found", 404);
    }

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
      Object.entries(updatable).filter(([, v]) => v !== undefined),
    );

    const practitioner = await prisma.practitioner.update({
      where: { slug },
      data,
    });

    return successResponse(practitioner);
  });
}
