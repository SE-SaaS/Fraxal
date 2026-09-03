import { cn } from "@repo/ui/lib/cn";

/**
 * The Fraxal mark, taken verbatim from the supplied SVG.
 *
 * Coordinates, radii and stroke width are exactly as authored — do not
 * "tidy" or regularise them. The asymmetry is the logo.
 *
 * Two deliberate changes from the source file:
 *   1. `#111111` becomes `currentColor`, so the mark inherits its colour and
 *      works on the dark site as well as on white.
 *   2. The core reads `--color-accent` rather than the source's `#c0262d`, so
 *      the logo and the site's red are guaranteed to be the same red.
 */

const LINES: [number, number, number, number][] = [
  // Outer boundary
  [100, 25, 165, 60],
  [165, 60, 185, 105],
  [185, 105, 145, 145],
  [145, 145, 100, 175],
  [100, 175, 35, 145],
  [35, 145, 35, 65],
  [35, 65, 100, 25],
  // Internal structure and spokes
  [100, 25, 100, 175],
  [35, 65, 145, 145],
  [35, 145, 70, 70],
  [70, 70, 140, 70],
  [140, 70, 185, 105],
  [70, 70, 100, 100],
  [140, 70, 100, 100],
  [100, 100, 70, 135],
  [100, 100, 135, 130],
];

const NODES: [number, number, number][] = [
  [100, 25, 9],
  [165, 60, 8],
  [185, 105, 8],
  [145, 145, 8],
  [100, 175, 9],
  [35, 145, 8],
  [35, 65, 8],
  [70, 70, 8],
  [140, 70, 8],
  [70, 135, 7],
  [135, 130, 7],
];

export function FraxalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {LINES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>

      <g fill="currentColor">
        {NODES.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      {/* Core. Last, so it sits over the four spokes that meet under it. */}
      <circle cx="100" cy="100" r="12" fill="var(--color-accent)" />
    </svg>
  );
}
