import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Site } from "@/lib/site";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-app",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-app",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(Site.url),
  title: {
    default: `${Site.name} — ${Site.role}`,
    template: `%s · ${Site.name}`,
  },
  description: Site.intro,
  openGraph: {
    type: "website",
    siteName: Site.name,
    title: `${Site.name} — ${Site.role}`,
    description: Site.intro,
    url: Site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fdfcfa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
