import type { NextConfig } from "next";

/*
  NEXT.JS CONFIG

  The images.remotePatterns setting tells Next.js which external domains
  are allowed to serve images via the <Image> component. Without this,
  Next.js blocks external images for security. We allow Unsplash since
  that's where our placeholder photos come from.
*/

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
