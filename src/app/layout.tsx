// src/app/layout.tsx
//
// humankind marketing site root layout.
// Geist font, dark theme, tracking scripts, page-view analytics.

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { TrackingScripts } from "@/components/tracking-scripts";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humankind.center"),
  // Google Search Console domain verification — must stay in place even after
  // verification succeeds, or the property is un-verified.
  verification: {
    google: "N9Sv-wjBToqWx51E_oL9PSRRHTobsvoSWiwesM4-C0w",
  },
  title: {
    default: "humankind",
    template: "%s · humankind",
  },
  description:
    "A conscious community for live events, streams, and connection — based in Sedona, AZ.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00031C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          href="/icons/uicons-regular-rounded-4.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
      <body
        style={{
          background: "#00031C",
          color: "#fff",
          minHeight: "100dvh",
          fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <TrackingScripts />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
