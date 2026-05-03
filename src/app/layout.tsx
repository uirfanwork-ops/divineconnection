import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divine Connections: Servants of the Most Merciful",
  description:
    "An intensive Islamic academic retreat at Mansfield Outdoor Centre. July 31 - August 3, 2026.",
  keywords: ["Islamic retreat", "Divine Connections", "Servants of the Most Merciful"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${playfair.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
