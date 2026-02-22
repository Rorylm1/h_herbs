import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [products, upcomingBookings, publishedArticles, testimonials, nextBookings] =
      await Promise.all([
        prisma.product.count(),
        prisma.booking.count({
          where: { practitionerSlug: "hector", status: "upcoming" },
        }),
        prisma.article.count({
          where: { authorSlug: "hector", status: "published" },
        }),
        prisma.testimonial.count({
          where: { practitionerSlug: "hector" },
        }),
        prisma.booking.findMany({
          where: { practitionerSlug: "hector", status: "upcoming" },
          orderBy: [{ date: "asc" }, { time: "asc" }],
          take: 3,
        }),
      ]);

    return NextResponse.json({
      stats: {
        products,
        upcomingBookings,
        publishedArticles,
        testimonials,
      },
      upcomingBookings: nextBookings,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
