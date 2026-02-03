"use client";

/*
  SITE HEADER — appears on every page.

  "use client" is needed because we use useState for the mobile menu toggle.
  In Next.js, components with interactivity (state, event handlers) must
  be client components. Static components render on the server (faster).
*/

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import DandelionLogo from "@/components/svg/DandelionLogo";

const navLinks = [
  { href: "/herbalists", label: "Our Herbalists" },
  { href: "/book", label: "Book" },
  { href: "/shop", label: "Herb Shop" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sage-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2">
            <DandelionLogo variant="icon" className="h-7 w-7 md:h-8 md:w-8 text-forest-700" />
            <span className="font-heading text-2xl font-semibold text-forest-700 md:text-3xl">
              Hector&apos;s Herbs
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile, shown md+ */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[15px] font-medium text-charcoal hover:text-forest-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative text-charcoal hover:text-forest-700 transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {/* Live cart count badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest-700 text-[10px] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Account icon */}
            <Link
              href="/login"
              className="hidden sm:block text-charcoal hover:text-forest-700 transition-colors"
              aria-label="Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>

            {/* Mobile hamburger button — shown on small screens only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-charcoal p-1"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav drawer — slides down when hamburger is tapped */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-sage-200/50 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 px-2 font-body text-base text-charcoal hover:bg-sage-50 hover:text-forest-700 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-2 px-2 font-body text-base text-charcoal hover:bg-sage-50 hover:text-forest-700 rounded-md transition-colors"
            >
              My Account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
