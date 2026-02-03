"use client";

/*
  CONTACT CONTENT — the Contact page with form, map, and details.

  "use client" because the form uses useState for field values
  and submission state.

  ARCHITECTURE TIP: The form is "mock" — it validates fields on
  the client (using native HTML required attributes) and shows a
  success message, but doesn't actually send data anywhere. In
  production you'd POST to an API route that sends an email via
  SendGrid, Resend, etc.
*/

import { useState } from "react";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactContent() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock submission — just show the success state
    setIsSubmitted(true);
  }

  function handleReset() {
    setIsSubmitted(false);
    setFormData(initialFormData);
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="contact-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Get in Touch
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            We&apos;d love to hear from you. Send us a message, pop in for a
            visit, or follow us on Instagram.
          </p>
        </div>
      </section>

      {/* Form + Contact info two-column layout */}
      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <DandelionWatermark
          position="left"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ── Left column: Contact form ── */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-forest-700 mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                /* Success state */
                <div className="relative rounded-xl bg-sage-50 border border-sage-200 p-8 text-center overflow-hidden">
                  <BotanicalBorder
                    position="top-right"
                    className="absolute top-0 right-0 w-14 h-14 text-sage-200 opacity-40"
                  />
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-7 w-7 text-forest-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-forest-700">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">
                    Thank you for getting in touch. We&apos;ll respond within 24
                    hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 text-sm font-medium text-forest-700 hover:text-forest-800 underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-colors"
                    />
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Phone Number{" "}
                      <span className="text-muted text-xs">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07000 000 000"
                      className="w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-colors"
                    >
                      <option value="">Please select&hellip;</option>
                      <option value="general">General Enquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="products">Product Enquiry</option>
                      <option value="practitioner">
                        Become a Practitioner
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-forest-700 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide hover:bg-forest-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* ── Right column: Contact info + Map ── */}
            <div className="space-y-8">
              {/* Contact details card */}
              <div className="relative rounded-xl bg-white border border-sage-100 p-6 md:p-8 overflow-hidden">
                <BotanicalBorder
                  position="bottom-right"
                  className="absolute bottom-0 right-0 w-14 h-14 text-sage-200 opacity-30"
                />
                <h3 className="font-heading text-xl font-semibold text-forest-700 mb-5">
                  Contact Details
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-sage-300 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-charcoal">Address</p>
                      <p className="text-sm text-muted">
                        12 Warrington Crescent
                      </p>
                      <p className="text-sm text-muted">London, W9 1EL</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-sage-300 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-charcoal">Email</p>
                      <a
                        href="mailto:hector@hectorsherbs.com"
                        className="text-sm text-forest-700 hover:text-forest-800 transition-colors"
                      >
                        hector@hectorsherbs.com
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sage-300 shrink-0 mt-0.5"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                    </svg>
                    <div>
                      <p className="font-medium text-charcoal">Instagram</p>
                      <a
                        href="https://instagram.com/hectorsherbs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-forest-700 hover:text-forest-800 transition-colors"
                      >
                        @hectorsherbs
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border border-sage-100">
                <iframe
                  src="https://www.google.com/maps?q=12+Warrington+Crescent,+London+W9+1EL&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hector's Herbs location — 12 Warrington Crescent, London W9 1EL"
                />
              </div>

              {/* Opening hours */}
              <div className="rounded-xl bg-sage-50 border border-sage-100 p-6">
                <h3 className="font-heading text-lg font-semibold text-forest-700 mb-3">
                  Opening Hours
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal">Monday &ndash; Friday</span>
                    <span className="text-charcoal font-medium">
                      9:00 &ndash; 18:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal">Saturday</span>
                    <span className="text-charcoal font-medium">
                      10:00 &ndash; 16:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Sunday</span>
                    <span className="text-muted">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
