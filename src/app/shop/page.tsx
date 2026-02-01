/*
  HERB SHOP PAGE — /shop

  Server component wrapper that exports metadata for SEO,
  then renders the client-side ShopContent component which
  handles the interactive filter state.
*/

import ShopContent from "@/components/ShopContent";

export const metadata = {
  title: "Herb Shop | Hector's Herbs",
  description:
    "Browse our range of quality herbal remedies — tinctures, teas, capsules, and dried herbs. Handpicked and recommended by our practitioners.",
};

export default function ShopPage() {
  return <ShopContent />;
}
