"use client";

import { cn } from "@repo/ui/lib/cn";
import { usePrefersReducedMotion } from "@repo/ui/hooks/use-media-query";
import { useEffect, useState } from "react";

/**
 * Jump to the top or the bottom of the page from anywhere in it.
 *
 * Both directions stay available at every scroll position — at 67% down, "top"
 * goes all the way up and "bottom" goes all the way down. Each button dims and
 * stops responding only when you are already at that end, so the control never
 * moves or reflows under the cursor.
 *
 * Sits where Next's dev badge used to, and is hidden entirely on pages too
 * short to scroll.
 */
export function ScrollJump() {
  const [scrollable, setScrollable] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollable(max > 120);
      setAtTop(window.scrollY < 40);
      setAtBottom(window.scrollY > max - 40);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!scrollable) return null;

  const jump = (to: "top" | "bottom") => {
    window.scrollTo({
      top: to === "top" ? 0 : document.documentElement.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const base =
    "grid h-10 w-10 place-items-center border border-line bg-[rgba(6,6,12,0.86)] backdrop-blur-md transition-all duration-200";

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => jump("top")}
        disabled={atTop}
        aria-label="Jump to top of page"
        className={cn(
          base,
          atTop
            ? "cursor-default text-ink-subtle opacity-35"
            : "text-ink-muted hover:border-accent hover:text-accent",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
          <path
            d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => jump("bottom")}
        disabled={atBottom}
        aria-label="Jump to bottom of page"
        className={cn(
          base,
          atBottom
            ? "cursor-default text-ink-subtle opacity-35"
            : "text-ink-muted hover:border-accent hover:text-accent",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
          <path
            d="M8 3v10M8 13l-4.5-4.5M8 13l4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
