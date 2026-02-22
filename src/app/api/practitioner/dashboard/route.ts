import { prisma } from "@/lib/prisma";
import { successResponse, withErrorHandler } from "@/lib/api-helpers";

export function GET() {
  return withErrorHandler(async () => {
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

    return successResponse({
      stats: {
        products,
        upcomingBookings,
        publishedArticles,
        testimonials,
      },
      upcomingBookings: nextBookings,
    });
  });
}
