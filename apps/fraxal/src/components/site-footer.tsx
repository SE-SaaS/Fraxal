import { Container } from "@repo/ui/primitives/container";
import Link from "next/link";

import { FraxalMark } from "@/components/fraxal-mark";
import { Logo } from "@/components/logo";
import { Site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-gradient-to-b from-transparent to-[rgba(6,6,12,0.96)] py-12">
      <Container width="wide" className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logo className="text-base" mark={<FraxalMark className="h-[1.3em]" />} />

          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {Site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.8rem] tracking-[0.08em] text-ink-subtle uppercase transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <a
            href={`mailto:${Site.email}`}
            className="text-sm text-ink-subtle transition-colors duration-300 hover:text-accent"
          >
            {Site.email}
          </a>
          <p className="font-display text-[0.78rem] tracking-[0.08em] text-ink-subtle">
            © {new Date().getFullYear()} {Site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
