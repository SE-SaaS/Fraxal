import { cn } from "@repo/ui/lib/cn";
import type { ReactNode } from "react";

/**
 * The lambda, drawn rather than typed.
 *
 * Russo One ships latin, latin-ext and cyrillic only — no Greek block. So
 * U+039B has never rendered in the wordmark font: it fell through to whatever
 * the system offered, and on a machine with no Greek-capable fallback it
 * rendered as a tofu box. Drawing it guarantees the mark looks the same
 * everywhere and always matches the wordmark's weight and colour.
 *
 * Sized in `em` so it scales with whatever font-size the lockup is given.
 */
function GlyphLambda({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 74 100"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[0.72em] w-auto shrink-0", className)}
      style={{ verticalAlign: "baseline" }}
    >
      <path
        d="M8 96 L37 10 L66 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="19"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export type LogoProps = {
  className?: string;
  /** Hero treatment: the whole lockup pulses. Off for nav and footer. */
  pulse?: boolean;
  /**
   * The mark, when you have the asset. Drop an <svg> (or next/image) in here
   * and it sits to the left of the wordmark at matching optical size:
   *
   *   <Logo mark={<FraxalMark className="h-[0.9em]" />} />
   *
   * Left empty the lockup is wordmark-only and nothing looks unfinished.
   */
  mark?: ReactNode;
};

/**
 * FRΛXΛL — Russo One, with Λ standing in for both A's, carried over from the
 * previous mark. The X keeps the accent and the glow.
 *
 * `aria-label` says "Fraxal" so assistive tech reads the name rather than
 * spelling out a Greek lambda.
 */
export function Logo({ className, pulse = false, mark }: LogoProps) {
  return (
    <span
      className={cn(
        "font-wordmark inline-flex items-center leading-none tracking-[0.06em] text-ink",
        pulse && "animate-wave-pulse",
        className,
      )}
      role="img"
      aria-label="Fraxal"
    >
      {mark ? (
        <span aria-hidden="true" className="mr-[0.34em] inline-flex shrink-0 items-center">
          {mark}
        </span>
      ) : null}
      <span aria-hidden="true">FR</span>
      <GlyphLambda />
      <span aria-hidden="true" className="animate-mark-glow text-accent">
        X
      </span>
      <GlyphLambda />
      <span aria-hidden="true">L</span>
    </span>
  );
}
