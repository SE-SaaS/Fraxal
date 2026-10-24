"use client";

import { useAuth } from "@clerk/nextjs";
import { cn } from "@repo/ui/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FraxalMark } from "@/components/fraxal-mark";
import { Logo } from "@/components/logo";
import { AuthRoutes } from "@/lib/clerk";
import { Site } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // "Sign in" until Clerk confirms a session, so the first paint (and the static
  // HTML) already has the link rather than a gap that fills in after load.
  const { isSignedIn } = useAuth();

  // /ar gets its own labels, direction and a switch back. The tracked-out caps
  // that give the Latin nav its voice are dropped there: they break Arabic joins.
  const arabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const items: readonly { href: string; label: string }[] = arabic ? Site.navAr : Site.nav;
  const caps = arabic ? "" : "tracking-[0.1em] uppercase";

  const account = isSignedIn
    ? { href: AuthRoutes.account, label: arabic ? "حسابي" : "Account" }
    : { href: AuthRoutes.signIn, label: arabic ? "تسجيل الدخول" : "Sign in" };
  const start = arabic
    ? { href: "/ar#contact", label: "ابدأ مشروعك" }
    : { href: "/start", label: "Start a project" };
  const language = arabic
    ? { href: "/", label: "English", lang: "en", caps: "tracking-[0.1em] uppercase" }
    : { href: "/ar", label: "عربي", lang: "ar", caps: "" };

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
    <header
      lang={arabic ? "ar" : undefined}
      dir={arabic ? "rtl" : undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(6,6,12,0.88)] backdrop-blur-[14px]"
    >
      <nav aria-label="Primary" className="flex items-center justify-between px-5 py-3.5 md:px-7">
        {/* The lockup is built from inline pieces; under the /ar header's rtl
            they would lay out backwards and spell LAXAFR. */}
        <Link
          href="/"
          dir="ltr"
          className="rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo className="text-lg" mark={<FraxalMark className="h-[1.25em]" />} />
        </Link>

        {/* Compact and hard right. Six items at the previous size crowded the
            bar; smaller type with tighter gaps keeps it a navigation bar rather
            than a wall, and leaves room to add one more item later. */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[0.76rem] font-bold transition-colors duration-200",
                  caps,
                  isActive(item.href) ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={account.href}
              className={cn(
                "text-[0.76rem] font-bold transition-colors duration-200",
                caps,
                isActive(account.href) ? "text-accent" : "text-ink hover:text-accent",
              )}
            >
              {account.label}
            </Link>
          </li>
          <li>
            <Link
              href={language.href}
              lang={language.lang}
              hrefLang={language.lang}
              className={cn(
                "text-[0.8rem] font-bold text-ink-muted transition-colors duration-200 hover:text-accent",
                language.caps,
              )}
            >
              {language.label}
            </Link>
          </li>
          <li>
            <Link
              href={start.href}
              className={cn(
                "rounded-[2px] border border-accent px-4 py-2 text-[0.74rem] font-bold text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-ink",
                caps,
              )}
            >
              {start.label}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-me-2 p-2 text-ink-subtle transition-colors hover:text-accent focus-visible:outline-accent lg:hidden"
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
          {items.map((item) => (
            <li key={item.href} className="border-b border-line last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3.5 text-sm font-bold text-ink-muted hover:text-accent",
                  caps,
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="border-b border-line">
            <Link
              href={account.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3.5 text-sm font-bold text-ink-muted hover:text-accent",
                caps,
              )}
            >
              {account.label}
            </Link>
          </li>
          <li className="border-b border-line">
            <Link
              href={language.href}
              lang={language.lang}
              hrefLang={language.lang}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3.5 text-sm font-bold text-ink-muted hover:text-accent",
                language.caps,
              )}
            >
              {language.label}
            </Link>
          </li>
          <li className="pt-4">
            <Link
              href={start.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-[2px] border border-accent px-4 py-3 text-center text-sm font-bold text-accent",
                caps,
              )}
            >
              {start.label}
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
