"use client";

import { cn } from "@repo/ui/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FraxalMark } from "@/components/fraxal-mark";
import { Logo } from "@/components/logo";
import { Site } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The menu closes from the link's own onClick, not from an effect watching
  // pathname — setting state synchronously in an effect causes a second render
  // pass on every navigation, and the click already tells us what happened.

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(6,6,12,0.88)] backdrop-blur-[14px]">
      <nav aria-label="Primary" className="flex items-center justify-between px-5 py-3.5 md:px-7">
        <Link
          href="/"
          className="rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo className="text-lg" mark={<FraxalMark className="h-[1.25em]" />} />
        </Link>

        {/* Compact and hard right. Six items at the previous size crowded the
            bar; smaller type with tighter gaps keeps it a navigation bar rather
            than a wall, and leaves room to add one more item later. */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
          {Site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[0.76rem] font-bold tracking-[0.1em] uppercase transition-colors duration-200",
                  isActive(item.href) ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/start"
              className="rounded-[2px] border border-accent px-4 py-2 text-[0.74rem] font-bold tracking-[0.1em] text-accent uppercase transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
            >
              Start a project
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 p-2 text-ink-subtle transition-colors hover:text-accent focus-visible:outline-accent lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
            {open ? (
              <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <ul id="mobile-nav" className="border-t border-line px-6 pb-5 lg:hidden">
          {Site.nav.map((item) => (
            <li key={item.href} className="border-b border-line last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-sm font-bold tracking-[0.1em] text-ink-muted uppercase hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="block rounded-[2px] border border-accent px-4 py-3 text-center text-sm font-bold tracking-[0.12em] text-accent uppercase"
            >
              Start a project
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
