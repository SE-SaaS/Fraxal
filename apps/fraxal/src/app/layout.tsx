import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Russo_One } from "next/font/google";

import { ScrollJump } from "@/components/scroll-jump";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Site } from "@/lib/site";

import "./globals.css";

// Rajdhani carries body copy, Orbitron does headings, Russo One is the logo
// lockup only — it has a single weight and is not a text face.
const body = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const wordmark = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(Site.url),
  title: {
    default: `${Site.name} — ${Site.tagline}`,
    template: `%s · ${Site.name}`,
  },
  description: Site.description,
  openGraph: {
    type: "website",
    siteName: Site.name,
    title: `${Site.name} — ${Site.tagline}`,
    description: Site.description,
    url: Site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#06060c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${wordmark.variable} scroll-smooth`}
    >
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
        <ScrollJump />
      </body>
    </html>
  );
}
