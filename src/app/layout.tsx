
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import ContributeWidget from "./components/ContributeWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "ELEVIT is an engineering learning platform offering handwritten study notes, engineering resources, project tutorials and student-focused learning tools.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elevateorbit.in"),

  title: {
    default: "ELEVIT | Learn. Build. Grow.",
    template: "%s | ELEVIT",
  },

  description: siteDescription,

  applicationName: "ELEVIT",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.elevateorbit.in/",
    siteName: "ELEVIT",
    title: "ELEVIT | Learn. Build. Grow.",
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: "ELEVIT | Learn. Build. Grow.",
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ContributeWidget />
        <Analytics />
      </body>
    </html>
  );
}
