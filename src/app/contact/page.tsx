/*
  CONTACT PAGE — /contact

  Server component wrapper that exports metadata for SEO,
  then renders the client-side ContactContent component which
  handles the interactive form state.
*/

import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact Us | Hector's Herbs",
  description:
    "Get in touch with Hector's Herbs. Visit us at 12 Warrington Crescent, London W9 1EL, or send us a message.",
};

export default function ContactPage() {
  return <ContactContent />;
}
