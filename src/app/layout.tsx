import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://aozatgc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aozat General Contractors",
    template: "%s, Aozat General Contractors",
  },
  description:
    "Commercial, industrial, and multi-unit residential general contractor across the Greater Toronto Area. Slow craft, disciplined sites.",
  keywords: [
    "general contractor",
    "Toronto",
    "GTA",
    "commercial construction",
    "industrial construction",
    "CMHC residential",
    "tenant fit-out",
  ],
  authors: [{ name: "Aozat General Contractors" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Aozat General Contractors",
    title: "Aozat General Contractors",
    description:
      "Commercial, industrial, and multi-unit residential general contractor across the GTA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aozat General Contractors",
    description: "Buildings that earn their ground.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-bone text-ink antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
