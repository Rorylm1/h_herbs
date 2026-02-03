/*
  SITE FOOTER — appears on every page.

  No "use client" needed — this is a purely static component
  that renders on the server (better for performance & SEO).
*/

import Link from "next/link";
import DandelionLogo from "@/components/svg/DandelionLogo";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import OrganicDivider from "@/components/svg/OrganicDivider";

const footerLinks = {
  explore: [
    { href: "/herbalists", label: "Our Herbalists" },
    { href: "/shop", label: "Herb Shop" },
    { href: "/learn", label: "Learn" },
    { href: "/book", label: "Book a Consultation" },
  ],
  account: [
    { href: "/login", label: "Sign In" },
    { href: "/account", label: "My Account" },
    { href: "/account/bookings", label: "My Bookings" },
    { href: "/account/prescriptions", label: "My Prescriptions" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="relative bg-forest-800 text-white overflow-hidden">
      {/* Organic vine transition at the top of the footer */}
      <OrganicDivider variant="leaf-vine" flip className="w-full h-6 text-sage-200 absolute top-0 left-0" />
      {/* Subtle botanical pattern overlay */}
      <BotanicalPattern className="absolute inset-0 text-white opacity-[0.03]" patternId="footer-pattern" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 pt-14 md:pt-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <DandelionLogo variant="icon" className="h-7 w-7 text-sage-200" />
              <span className="font-heading text-2xl font-semibold text-sage-200">
                Hector&apos;s Herbs
              </span>
            </Link>
            <p className="mt-3 text-sm text-sage-200/70 leading-relaxed">
              Trained Naturopathic Herbalists providing the very best herbal
              remedies to help you regain your health and well-being.
            </p>
            <p className="mt-3 text-xs text-sage-200/40 italic font-heading leading-relaxed">
              &ldquo;Let food be thy medicine and medicine be thy food&rdquo; &mdash; Hippocrates
            </p>
            {/* ANP Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-forest-900/50 px-3 py-2 text-xs text-sage-200/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-sage-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              ANP Registered Practitioner
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sage-200 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sage-200/70 hover:text-sage-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sage-200 mb-4">
              Your Account
            </h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sage-200/70 hover:text-sage-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sage-200 mb-4">
              Get in Touch
            </h3>
            <address className="not-italic text-sm text-sage-200/70 space-y-2">
              <p>12 Warrington Crescent</p>
              <p>London, W9 1EL</p>
              <p className="pt-1">
                <a
                  href="mailto:hector@hectorsherbs.com"
                  className="hover:text-sage-200 transition-colors"
                >
                  hector@hectorsherbs.com
                </a>
              </p>
            </address>
            {/* Instagram link */}
            <a
              href="https://instagram.com/hectorsherbs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-sage-200/70 hover:text-sage-200 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              @hectorsherbs
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-forest-700/50 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-sage-200/50">
          <p>&copy; {new Date().getFullYear()} Hector&apos;s Herbs. All rights reserved.</p>
          <Link href="#" className="hover:text-sage-200/80 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
