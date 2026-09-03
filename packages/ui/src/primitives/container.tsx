import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn";

const widths = {
  // Long-form reading: caps out near 70 characters per line.
  prose: "max-w-2xl",
  // Default page gutter.
  default: "max-w-5xl",
  // Full-bleed sections that still need edge padding.
  wide: "max-w-7xl",
} as const;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: keyof typeof widths;
};

export function Container({ className, width = "default", ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6 md:px-8", widths[width], className)} {...props} />;
}
