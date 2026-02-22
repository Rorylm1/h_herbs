import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, withErrorHandler } from "@/lib/api-helpers";

export function GET() {
  return withErrorHandler(async () => {
    const session = await auth();
    if (!session?.user) return errorResponse("Unauthorized", 401);
    if (session.user.role !== "practitioner") return errorResponse("Forbidden", 403);

    const slug = session.user.practitionerSlug ?? "hector";

    const [products, upcomingBookings, publishedArticles, testimonials, nextBookings] =
      await Promise.all([
        prisma.product.count(),
        prisma.booking.count({
          where: { practitionerSlug: slug, status: "upcoming" },
        }),
        prisma.article.count({
          where: { authorSlug: slug, status: "published" },
        }),
        prisma.testimonial.count({
          where: { practitionerSlug: slug },
        }),
        prisma.booking.findMany({
          where: { practitionerSlug: slug, status: "upcoming" },
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
