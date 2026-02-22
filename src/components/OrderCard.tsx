"use client";

/*
  ORDER CARD — displays an order in list views.

  Shows order ID, date, item count, total, and status badge.
  Expandable to show line items.
*/

import { useState } from "react";
import Link from "next/link";
import { type Order, formatOrderId } from "@/data/orders";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date for display
  const formattedDate = new Date(order.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Status badge colors
  const statusStyles = {
    processing: "bg-sage-100 text-charcoal",
    shipped: "bg-amber-100 text-amber-700",
    delivered: "bg-emerald-100 text-emerald-700",
  };

  // Status label
  const statusLabels = {
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
  };

  return (
    <div className="bg-white rounded-xl border border-sage-100 overflow-hidden hover:shadow-card transition-shadow">
      {/* Order header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Order icon */}
          <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-forest-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          {/* Order details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-heading text-lg font-semibold text-forest-700">
                {formatOrderId(order.id)}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
              <span>•</span>
              <span className="font-medium text-charcoal">£{order.total.toFixed(2)}</span>
            </div>
            {order.trackingNumber && order.status !== "processing" && (
              <p className="text-sm text-muted mt-1">
                Tracking: <span className="font-mono">{order.trackingNumber}</span>
              </p>
            )}
          </div>

          {/* Expand indicator */}
          <div className="flex-shrink-0 self-center">
            <svg
              className={`w-5 h-5 text-sage-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded content - order items */}
      {isExpanded && (
        <div className="border-t border-sage-100 bg-sage-50/50 p-5">
          <h4 className="text-sm font-semibold text-charcoal mb-3">Order Items</h4>
          <ul className="space-y-3">
            {order.items.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center text-xs font-medium text-charcoal">
                    {item.quantity}
                  </span>
                  <Link
                    href={`/shop/${item.productSlug}`}
                    className="text-forest-700 hover:text-forest-800 hover:underline font-medium"
                  >
                    {item.name}
                  </Link>
                </div>
                <span className="text-sm text-muted">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-sage-200 flex justify-between items-center">
            <span className="font-medium text-charcoal">Total</span>
            <span className="font-semibold text-forest-700">£{order.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
