import type { Metadata, Viewport } from "next";
import { Kapakana } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteLayout } from "~/app/components/primary-layout";
import { SmoothScroll } from "~/app/components/smooth-scroll";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  fallback: ["sans-serif"],
});

const kapakana = Kapakana({
  variable: "--font-script",
  subsets: ["latin"],
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://katyandhunter.com"),
  title: {
    default: "Kathryn Pentz and Hunter Jennings Wedding - May 16, 2026 | Richmond, VA",
    template: "%s | Katy & Hunter Wedding 2026",
  },
  description:
    "Join Kathryn Pentz and Hunter Jennings for their wedding celebration on May 16th, 2026 at The Virginia House in Richmond, Virginia. Wedding weekend events, accommodations, and registry information.",
  keywords: [
    "Kathryn Pentz Hunter Jennings wedding",
    "Richmond Virginia wedding May 2026",
    "The Virginia House wedding venue",
    "Wedding weekend Richmond VA",
    "Katy Hunter wedding celebration",
    "May 16 2026 wedding",
    "Richmond wedding events",
    "Virginia House Sulgrave Road",
    "Wedding registry accommodations",
    "Spring wedding Richmond Virginia",
  ],
  authors: [{ name: "Kathryn Pentz" }, { name: "Hunter Jennings" }],
  creator: "Kathryn Pentz and Hunter Jennings",
  publisher: "Kathryn Pentz and Hunter Jennings",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kathryn Pentz and Hunter Jennings Wedding 2026",
    title: "Kathryn Pentz and Hunter Jennings Wedding - May 16, 2026",
    description:
      "Join us for our wedding celebration on May 16th, 2026 at The Virginia House in Richmond, Virginia. Wedding weekend events, accommodations, and registry information.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kathryn Pentz and Hunter Jennings Wedding - May 16, 2026",
    description: "Join us for our wedding celebration on May 16th, 2026 at The Virginia House in Richmond, Virginia.",
    creator: "@jennings_hunter",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://katyandhunter.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${kapakana.variable}`}>
        <SiteLayout>{children}</SiteLayout>
        <Analytics />
        <SmoothScroll />
      </body>
    </html>
  );
}
