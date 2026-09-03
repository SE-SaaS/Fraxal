import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Russo_One } from "next/font/google";

import { ScrollJump } from "@/components/scroll-jump";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
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
