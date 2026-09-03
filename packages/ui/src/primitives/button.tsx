import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../lib/cn";

/*
 * Every utility below resolves to a token from base.css. There is deliberately
 * no `bg-blue-600` and no hex anywhere — that is what lets ChaosX and the
 * portfolio share this file and still look like unrelated companies.
 */
const button = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-control font-medium",
    "transition-colors duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:opacity-90",
        secondary: "border border-line bg-surface text-ink hover:border-line-strong",
        ghost: "text-ink-muted hover:bg-surface hover:text-ink",
        danger: "bg-danger text-accent-ink hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

export function Button({ className, variant, size, block, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size, block }), className)} {...props} />;
}

export { button as buttonVariants };
