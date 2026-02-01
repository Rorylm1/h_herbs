import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Providers from "@/components/Providers";

/*
  FONT LOADING — next/font automatically optimises Google Fonts:
  - Downloads at build time (no runtime requests to Google)
  - Generates CSS variables we reference in globals.css
  - Cormorant Garamond = elegant serif for headings (apothecary vibe)
  - Lato = clean sans-serif for body text (highly readable)
*/

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hector's Herbs | Naturopathic Herbal Medicine",
  description:
    "Trained Naturopathic Herbalists providing the very best herbal remedies to help you regain your health and well-being. Book a consultation today.",
};

/*
  ROOT LAYOUT — wraps every page on the site.

  Structure: Header → Page content → Footer
  The header/footer appear on ALL pages automatically.
  Each page only needs to provide its own content.
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${lato.variable} antialiased`}>
        <Providers>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
