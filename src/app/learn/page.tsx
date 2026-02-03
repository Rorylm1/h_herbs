/*
  LEARN PAGE — /learn

  Server component wrapper that exports metadata for SEO,
  then renders the client-side LearnContent component which
  handles the interactive category filter tabs.
*/

import LearnContent from "@/components/LearnContent";

export const metadata = {
  title: "Learn | Hector's Herbs",
  description:
    "Expert articles on herbal medicine, nutrition, holistic living, and seasonal wellness from our team of qualified practitioners.",
};

export default function LearnPage() {
  return <LearnContent />;
}
