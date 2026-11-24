import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cdEvent } from "../../../content/contemplating-death";
import "./cd.css";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces.woff2", style: "normal", weight: "100 900" },
    {
      path: "./fonts/fraunces-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--cd-font-serif",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  weight: "100 1000",
  variable: "--cd-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contemplating Death | Mathabah",
  description: `Join Mathabah for ${cdEvent.title} on ${cdEvent.dateLabel}, at ${cdEvent.venueName} in Mississauga.`,
  icons: { icon: "/contemplating-death/mathabah-logo.png" },
  openGraph: {
    title: "Contemplating Death | Mathabah",
    description: `A one day knowledge seminar. ${cdEvent.dateLabel}, ${cdEvent.venueName}, Mississauga.`,
    images: ["/contemplating-death/mirror.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#151612" };

export default function ContemplatingDeathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`cd ${fraunces.variable} ${dmSans.variable}`}>
      {children}
    </div>
  );
}
