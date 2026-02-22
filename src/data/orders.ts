/*
  DUMMY DATA — Client Orders

  Order history from the herb shop. In a real app these would
  come from Stripe/database after successful payments.
*/

export type OrderItem = {
  productSlug: string;
  name: string;
  quantity: number;
  price: number;        // Price per unit at time of purchase
};

export type Order = {
  id: string;
  date: string;         // ISO date string
  status: "processing" | "shipped" | "delivered";
  items: OrderItem[];
  total: number;        // Total amount paid
  trackingNumber?: string;
};

export const orders: Order[] = [
  {
    id: "ord-2026-001",
    date: "2026-02-01",
    status: "processing",
    items: [
      {
        productSlug: "ashwagandha-capsules",
        name: "Ashwagandha Capsules",
        quantity: 2,
        price: 22.0,
      },
      {
        productSlug: "chamomile-lavender-tea",
        name: "Chamomile & Lavender Tea Blend",
        quantity: 1,
        price: 12.5,
      },
    ],
    total: 56.5,
  },
  {
    id: "ord-2026-002",
    date: "2026-01-20",
    status: "shipped",
    trackingNumber: "RM123456789GB",
    items: [
      {
        productSlug: "milk-thistle-tincture",
        name: "Milk Thistle Tincture",
        quantity: 1,
        price: 17.0,
      },
      {
        productSlug: "peppermint-fennel-tea",
        name: "Peppermint & Fennel Tea",
        quantity: 2,
        price: 11.0,
      },
    ],
    total: 39.0,
  },
  {
    id: "ord-2025-047",
    date: "2025-12-15",
    status: "delivered",
    trackingNumber: "RM987654321GB",
    items: [
      {
        productSlug: "echinacea-tincture",
        name: "Echinacea Tincture",
        quantity: 1,
        price: 18.0,
      },
      {
        productSlug: "elderberry-syrup",
        name: "Elderberry Syrup",
        quantity: 1,
        price: 15.0,
      },
      {
        productSlug: "dried-nettle-leaf",
        name: "Dried Nettle Leaf",
        quantity: 1,
        price: 8.5,
      },
    ],
    total: 41.5,
  },
  {
    id: "ord-2025-039",
    date: "2025-11-28",
    status: "delivered",
    trackingNumber: "RM456789123GB",
    items: [
      {
        productSlug: "valerian-root-tincture",
        name: "Valerian Root Tincture",
        quantity: 1,
        price: 16.5,
      },
    ],
    total: 16.5,
  },
];

/*
  Get all orders sorted by date (most recent first).
*/
export function getOrdersSorted(): Order[] {
  return [...orders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/*
  Get orders by status.
*/
export function getOrdersByStatus(status: Order["status"]): Order[] {
  return orders.filter((o) => o.status === status);
}

/*
  Helper to format order ID for display (e.g., "ORD-2026-001").
*/
export function formatOrderId(id: string): string {
  return id.toUpperCase().replace("ord-", "ORD-");
}
