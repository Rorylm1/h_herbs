"use client";

/*
  TESTIMONIAL CAROUSEL — rotates through client quotes.

  "use client" because we use useState/useEffect for auto-rotation
  and manual navigation. This is a simple carousel — no external
  library needed for just cycling through items.
*/

import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";
import QuoteLeaf from "@/components/svg/QuoteLeaf";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      {/* Decorative quote mark with botanical leaf accent */}
      <QuoteLeaf className="mx-auto h-10 w-14 text-sage-200 mb-6" />

      {/* Quote text */}
      <blockquote className="font-heading text-xl md:text-2xl text-forest-700 leading-relaxed italic">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="mt-6">
        <p className="font-body font-bold text-charcoal">{t.clientName}</p>
        <p className="text-sm text-muted">
          {t.condition} &middot; with {t.practitioner}
        </p>
      </div>

      {/* Dot navigation */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === current ? "bg-forest-700" : "bg-sage-200 hover:bg-sage-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
