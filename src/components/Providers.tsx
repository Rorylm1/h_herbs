"use client";

/*
  PROVIDERS — client-side wrapper for React Context providers.

  ARCHITECTURE TIP: Next.js layouts are server components by default,
  but React Contexts need "use client". This wrapper component bridges
  the gap — it's a client component that wraps children in our providers.

  As we add more contexts (auth toggle, etc.) they'll all go here,
  so there's only one place to manage the provider stack.
*/

import { CartProvider } from "@/context/CartContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
