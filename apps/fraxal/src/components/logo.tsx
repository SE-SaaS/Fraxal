import { cn } from "@repo/ui/lib/cn";
import type { ReactNode } from "react";

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
      <span aria-hidden="true">Λ</span>
      <span aria-hidden="true" className="animate-mark-glow text-accent">
        X
      </span>
      <span aria-hidden="true">Λ</span>
      <span aria-hidden="true">L</span>
    </span>
  );
}
