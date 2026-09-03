import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { NeuralField } from "@/components/neural-field";
import { services, site } from "@/lib/site";

/** The reference button treatment: gradient fill, tracked-out caps, hover lift. */
const CTA_BASE =
  "h-auto rounded-[2px] px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1";

const CTA_PRIMARY =
  "border-none bg-gradient-to-br from-accent to-accent-deep hover:shadow-[0_16px_42px_rgba(232,41,74,0.4)]";

const CTA_GHOST =
  "border-accent bg-transparent text-accent hover:border-accent hover:bg-[rgba(232,41,74,0.07)] hover:shadow-[0_0_24px_rgba(232,41,74,0.25)]";

export default function HomePage() {
  return (
    <main id="top">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-line">
        <NeuralField className="absolute inset-0 h-full w-full" />

        <div className="animate-boot relative z-10 px-6 text-center">
          <h1>
            <Logo pulse className="text-[clamp(2rem,10vw,5.5rem)]" />
            <span className="sr-only"> — {site.tagline}</span>
          </h1>

          <p className="mt-6 inline-block bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-7 py-1.5 text-[clamp(0.75rem,1.7vw,0.95rem)] font-semibold tracking-[0.4em] text-accent-ink uppercase shadow-[0_0_22px_rgba(232,41,74,0.5),0_0_55px_rgba(123,107,181,0.2)]">
            {site.tagline}
          </p>

          {/* Low commitment up top. "Start a project" is the closing ask,
              after the nine services have earned it. */}
          <div className="mt-11 flex flex-wrap justify-center gap-6">
            <Link
              href="#services"
              className={cn(buttonVariants({ size: "lg" }), CTA_BASE, CTA_PRIMARY)}
            >
              What we do
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                CTA_BASE,
                CTA_GHOST,
              )}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      {/* scroll-mt clears the fixed nav; without it the heading lands under it. */}
      <section id="services" className="scroll-mt-24 py-24">
        <Container width="wide">
          <div className="mx-auto max-w-[520px] text-center">
            <div className="mx-auto mb-4 h-px w-15 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <h2 className="text-gradient font-display text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[0.1em]">
              What We Build
            </h2>
            <p className="mt-3 text-ink-subtle">
              From the model to the pipeline to the product it ships inside.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.slug}
                className="group relative overflow-hidden border border-line bg-[rgba(232,41,74,0.02)] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)] hover:shadow-[0_20px_48px_rgba(123,107,181,0.15)]"
              >
                {/* Sweep on hover — one line of movement, not a whole animation. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[rgba(232,41,74,0.45)] to-transparent transition-transform duration-500 group-hover:translate-x-full"
                />
                <h3 className="font-display text-[0.95rem] font-bold tracking-[0.1em] text-accent uppercase">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.92rem] text-pretty text-ink-subtle">{service.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Closing ask ────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24 pb-24">
        <Container width="wide">
          <div className="border border-line-strong bg-[rgba(232,41,74,0.02)] px-6 py-20 text-center">
            <h2 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] font-black tracking-[0.12em] text-accent">
              Tell Us What You Are Building
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-ink-subtle">
              Describe the idea in your own words and we will work out which of the nine it needs.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-5">
              <Link
                href="/start"
                className={cn(buttonVariants({ size: "lg" }), CTA_BASE, CTA_PRIMARY)}
              >
                Start a project
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  CTA_BASE,
                  CTA_GHOST,
                )}
              >
                Just a question
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
