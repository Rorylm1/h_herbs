/*
  LEARN PAGE — /learn

  Server component wrapper that exports metadata for SEO,
  then renders the client-side LearnContent component which
  handles the interactive category filter tabs.
*/

import LearnContent from "@/components/LearnContent";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Learn | Hector's Herbs",
  description:
    "Expert articles on herbal medicine, nutrition, holistic living, and seasonal wellness from our team of qualified practitioners.",
};

export const dynamic = 'force-dynamic';

export default async function LearnPage() {
  const dbArticles = await prisma.article.findMany({
    orderBy: { publishedDate: "desc" },
    include: { author: true },
  });

  const articles = dbArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    author: a.authorSlug,
    authorName: a.author.name,
    category: a.category,
    featuredImage: a.featuredImage,
    excerpt: a.excerpt,
    content: a.content,
    publishedDate: a.publishedDate.toISOString(),
  }));

  return <LearnContent articles={articles} />;
}
