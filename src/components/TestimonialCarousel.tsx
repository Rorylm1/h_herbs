"use client";

/*
  TESTIMONIAL CAROUSEL — rotates through client quotes.

  "use client" because we use useState/useEffect for auto-rotation
  and manual navigation. This is a simple carousel — no external
  library needed for just cycling through items.
*/

import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";

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
      {/* Large quote mark */}
      <svg
        className="mx-auto h-10 w-10 text-sage-200 mb-6"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>

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
