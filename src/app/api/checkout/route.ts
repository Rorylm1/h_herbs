/*
  STRIPE CHECKOUT API ROUTE — /api/checkout

  ARCHITECTURE TIP: This is a Next.js Route Handler — server-side
  code that runs as a Vercel serverless function. It never reaches
  the browser, which is important because the Stripe secret key
  must stay on the server.

  How it works:
  1. Cart page POSTs the cart items here
  2. We create a Stripe Checkout Session with inline pricing
     (price_data) so we don't need to pre-create products in Stripe
  3. We return the Stripe-hosted checkout URL
  4. The client redirects the user to that URL
  5. Stripe handles the entire payment form, card validation, 3D Secure

  If STRIPE_SECRET_KEY is not set, we return a helpful error message
  so the app degrades gracefully during development.
*/

import { NextResponse } from "next/server";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment variables to enable checkout.",
      },
      { status: 500 }
    );
  }

  try {
    /*
      Dynamic import — we import Stripe only when the route is called,
      not at module load time. This avoids errors if the stripe package
      isn't installed yet (the app still builds and runs without it).
    */
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey);

    const { items }: { items: CartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    /*
      Create a Checkout Session with inline pricing.
      unit_amount is in pence (Stripe uses smallest currency unit),
      so we multiply the price by 100.
    */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
