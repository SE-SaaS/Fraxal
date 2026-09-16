import { ImageResponse } from "next/og";

import { Site } from "@/lib/site";

export const alt = `${Site.name} — ${Site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The picture shown when a link to the site is shared — WhatsApp, LinkedIn, X,
 * Slack, Discord, iMessage. Built from the site's own mark rather than a photo.
 *
 * The mark is the geometry from `components/fraxal-mark.tsx` with the colours
 * written out: this is rasterised on a server that cannot read the site's CSS,
 * so `currentColor` and `var(--color-accent)` have nothing to resolve against.
 * Keep the two in step.
 */
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <g stroke="#eae8f2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M100 25 L165 60 L185 105 L145 145 L100 175 L35 145 L35 65 Z"/>
    <path d="M100 25 L100 175 M35 65 L145 145 M35 145 L70 70 L140 70 L185 105 M70 70 L100 100 L140 70 M100 100 L70 135 M100 100 L135 130"/>
  </g>
  <g fill="#eae8f2">
    <circle cx="100" cy="25" r="9"/><circle cx="165" cy="60" r="8"/><circle cx="185" cy="105" r="8"/>
    <circle cx="145" cy="145" r="8"/><circle cx="100" cy="175" r="9"/><circle cx="35" cy="145" r="8"/>
    <circle cx="35" cy="65" r="8"/><circle cx="70" cy="70" r="8"/><circle cx="140" cy="70" r="8"/>
    <circle cx="70" cy="135" r="7"/><circle cx="135" cy="130" r="7"/>
  </g>
  <circle cx="100" cy="100" r="12" fill="#e8294a"/>
</svg>`;

const markSource = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;

/**
 * The wordmark's Λ, drawn for the same reason `components/logo.tsx` draws it:
 * Russo One has no Greek block, so a typed Λ falls through to whatever face the
 * renderer has, or to a tofu box. Geometry matches that component exactly.
 */
const LAMBDA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 100" width="74" height="100">
  <path d="M8 96 L37 10 L66 96" fill="none" stroke="#eae8f2" stroke-width="19" stroke-linecap="butt" stroke-linejoin="miter"/>
</svg>`;

const lambdaSource = `data:image/svg+xml;base64,${Buffer.from(LAMBDA).toString("base64")}`;

const WORDMARK_SIZE = 108;
// The drawing fills 86% of its box, so the box runs taller than the 0.72em cap
// height it has to match. Sat on the baseline, the Λ then measures like a capital.
const LAMBDA_HEIGHT = Math.round((WORDMARK_SIZE * 0.72) / 0.86);
const LAMBDA_WIDTH = Math.round(LAMBDA_HEIGHT * 0.74);

/**
 * Russo One is the wordmark face. It is fetched rather than bundled, so if the
 * request fails the image still renders in the default face instead of failing
 * the build — a plain share image beats no share image.
 */
async function wordmarkFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Russo+One&display=swap", {
      // An old user agent makes Google serve TrueType, which this renderer reads.
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" },
    }).then((response) => response.text());

    const url = /src:\s*url\((https:[^)]+)\)/.exec(css)?.[1];
    if (!url) return null;

    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await wordmarkFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#06060c",
        padding: "0 90px",
        position: "relative",
      }}
    >
      {/* The accent hairline the site puts above every section. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "linear-gradient(90deg, #06060c 0%, #e8294a 50%, #06060c 100%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSource} width={232} height={232} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "Russo One",
              fontSize: WORDMARK_SIZE,
              letterSpacing: 8,
              color: "#eae8f2",
              lineHeight: 1,
            }}
          >
            <span>FR</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lambdaSource}
              width={LAMBDA_WIDTH}
              height={LAMBDA_HEIGHT}
              alt=""
              style={{ marginRight: 8 }}
            />
            <span style={{ color: "#e8294a" }}>X</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lambdaSource}
              width={LAMBDA_WIDTH}
              height={LAMBDA_HEIGHT}
              alt=""
              style={{ marginRight: 8 }}
            />
            <span>L</span>
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#7d7796",
            }}
          >
            {Site.tagline}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 54,
          paddingTop: 36,
          borderTop: "1px solid rgba(232, 41, 74, 0.32)",
          fontSize: 30,
          lineHeight: 1.4,
          color: "#5a5570",
          maxWidth: 1000,
        }}
      >
        {Site.description}
      </div>
    </div>,
    {
      ...size,
      fonts: font
        ? [{ name: "Russo One", data: font, style: "normal" as const, weight: 400 as const }]
        : undefined,
    },
  );
}
