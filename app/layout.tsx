import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://truematchadvisory.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrueMatch Advisory | Executive Search i Rekrutacja Managerów",
    template: "%s | TrueMatch Advisory",
  },
  description:
    "Butikowa firma executive search i rekrutacji managerów. Direct search, 3–5 dopasowanych kandydatów, success fee i gwarancja do 6 miesięcy.",
  authors: [{ name: "TrueMatch Advisory" }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "TrueMatch Advisory",
    title: "TrueMatch Advisory | Executive Search i Rekrutacja Managerów",
    description:
      "Butikowa firma executive search i rekrutacji managerów. Direct search, 3–5 dopasowanych kandydatów, success fee i gwarancja do 6 miesięcy.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueMatch Advisory | Executive Search i Rekrutacja Managerów",
    description:
      "Butikowa firma executive search i rekrutacji managerów. Direct search, 3–5 dopasowanych kandydatów, success fee i gwarancja do 6 miesięcy.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "TrueMatch Advisory",
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      contactPoint: {
        "@type": "ContactPoint",
        email: "kontakt@truematchadvisory.com",
        contactType: "customer support",
        areaServed: "PL",
        availableLanguage: "Polish",
      },
    },
    {
      "@type": "WebSite",
      name: "TrueMatch Advisory",
      url: siteUrl,
      inLanguage: "pl",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
