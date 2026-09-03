import { Container } from "@repo/ui/primitives/container";
import type { ReactNode } from "react";

/**
 * Title block for inner pages. `pt-32` clears the fixed nav — every page that
 * isn't the full-bleed hero needs that offset or its heading hides underneath.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line pt-32 pb-14">
      <Container width="wide">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
        <h1 className="font-display mt-4 text-[clamp(1.8rem,5vw,3rem)] font-bold tracking-[0.06em] text-balance">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-[58ch] text-lg text-pretty text-ink-muted">{lede}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
