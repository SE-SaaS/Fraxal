import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { NeuralField } from "@/components/neural-field";
import { Pillars, ProcessSteps, Projects, Proof, Services, Site, Team } from "@/lib/site";

/** The reference button treatment: gradient fill, tracked-out caps, hover lift. */
const CTA_BASE =
  "h-auto rounded-[2px] px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1";

const CTA_PRIMARY =
  "border-none bg-gradient-to-br from-accent to-accent-deep hover:shadow-[0_16px_42px_rgba(232,41,74,0.4)]";

const CTA_GHOST =
  "border-accent bg-transparent text-accent hover:border-accent hover:bg-[rgba(232,41,74,0.07)] hover:shadow-[0_0_24px_rgba(232,41,74,0.25)]";

/** Section eyebrow + heading, so all six section openers align exactly. */
function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="max-w-[54ch]">
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display mt-3 text-[clamp(1.3rem,3.2vw,2rem)] font-bold tracking-[0.08em] text-balance">
        {title}
      </h2>
      {lede ? <p className="mt-3 text-pretty text-ink-subtle">{lede}</p> : null}
    </div>
  );
}

const titleFor = (slug: string) => Services.find((s) => s.slug === slug)?.title ?? slug;

export default function HomePage() {
  const featured = Projects.filter((project) => project.featured);

  return (
    <main id="top">
      {/* ── 01 · Hero ──────────────────────────────────────────────────────
          78svh, not 100svh: the next section has to peek above the fold, or
          nothing on the page tells a visitor there is more to scroll to. */}
      <section className="relative flex min-h-[78svh] items-center justify-center overflow-hidden border-b border-line py-24">
        <NeuralField className="absolute inset-0 h-full w-full" />

        <div className="animate-boot relative z-10 px-6 text-center">
          <h1>
            <Logo pulse className="text-[clamp(2rem,9vw,4.8rem)]" />
            <span className="sr-only">
              {Site.headline ? ` — ${Site.headline}` : ` — ${Site.tagline}`}
            </span>
          </h1>

          {/* Renders only once you write it. Nothing placeholder ships. */}
          {Site.headline ? (
            <p className="font-display mx-auto mt-7 max-w-[22ch] text-[clamp(1rem,2.4vw,1.5rem)] leading-tight font-bold tracking-[0.03em] text-balance text-ink">
              {Site.headline}
            </p>
          ) : null}

          <p
            className={cn(
              "inline-block bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-7 py-1.5 text-[clamp(0.7rem,1.6vw,0.9rem)] font-semibold tracking-[0.4em] text-accent-ink uppercase shadow-[0_0_22px_rgba(232,41,74,0.5),0_0_55px_rgba(123,107,181,0.2)]",
              Site.headline ? "mt-6" : "mt-7",
            )}
          >
            {Site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="#work"
              className={cn(buttonVariants({ size: "lg" }), CTA_BASE, CTA_PRIMARY)}
            >
              See our work
            </Link>
            <Link
              href="/start"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                CTA_BASE,
                CTA_GHOST,
              )}
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02 · Proof strip ───────────────────────────────────────────────
          Credibility before any ask. Every figure is checkable. */}
      <section className="border-b border-line">
        <Container width="wide" className="px-0 md:px-0">
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {Proof.map((item) => (
              <div key={item.label} className="bg-[rgba(232,41,74,0.02)] px-6 py-8 md:px-8">
                <dt className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-subtle uppercase">
                  {item.label}
                </dt>
                <dd className="font-display mt-2 text-[1.6rem] leading-none font-bold text-ink tabular-nums">
                  {item.value}
                </dd>
                <dd className="mt-2 text-[0.85rem] text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── 03 · Three pillars ─────────────────────────────────────────────
          The same nine services, grouped so a reader takes in three ideas. */}
      <section id="services" className="scroll-mt-24 py-20">
        <Container width="wide">
          <SectionHead
            eyebrow="What we build"
            title="From the model to the product it ships inside"
            lede="Nine services, three groups. Most projects touch more than one."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {Pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="group border border-line bg-[rgba(232,41,74,0.02)] p-8 transition-colors duration-300 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)]"
              >
                <h3 className="font-display text-[0.95rem] font-bold tracking-[0.12em] text-accent uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9rem] text-pretty text-ink-subtle">{pillar.blurb}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {pillar.members.map((slug) => (
                    <li key={slug} className="flex items-baseline gap-3 text-[0.92rem] text-ink">
                      <span aria-hidden="true" className="text-accent">
                        ·
                      </span>
                      {titleFor(slug)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 04 · Selected work ─────────────────────────────────────────────
          The claim, turned into evidence. Three only — the rest live on
          the GitHub org, so the home page stays short. */}
      <section
        id="work"
        className="scroll-mt-24 border-y border-line bg-[rgba(232,41,74,0.02)] py-20"
      >
        <Container width="wide">
          <SectionHead
            eyebrow="Selected work"
            title="Things we have actually shipped"
            lede="Public repositories, with the numbers that make them checkable."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <li key={project.name} className="group border border-line bg-[#0b0b14]">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col border border-transparent p-7 transition-colors duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <h3 className="font-display text-[0.98rem] font-bold tracking-[0.05em] text-ink transition-colors duration-300 group-hover:text-accent">
                    {project.name}
                  </h3>

                  {project.note ? (
                    <p className="mt-2.5 font-mono text-[0.7rem] leading-relaxed tracking-[0.03em] text-accent">
                      {project.note}
                    </p>
                  ) : null}

                  <p className="mt-3 flex-1 text-[0.9rem] text-pretty text-ink-subtle">
                    {project.blurb}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="border border-line px-2 py-0.5 font-mono text-[0.68rem] text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-ink-subtle">
            <a
              href={Site.github}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              Everything we have built →
            </a>
          </p>
        </Container>
      </section>

      {/* ── 05 · How we work ───────────────────────────────────────────────
          Numbering is honest here: it is a real sequence, not decoration.
          Renders nothing if the steps array is emptied. */}
      {ProcessSteps.length > 0 ? (
        <section className="py-20">
          <Container width="wide">
            <SectionHead
              eyebrow="How we work"
              title="What happens after you email us"
              lede="Four steps, in order. You see something running before the end."
            />

            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {ProcessSteps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-accent pt-5">
                  <span className="font-mono text-[0.68rem] tracking-[0.14em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-2 text-[0.95rem] font-bold tracking-[0.06em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] text-pretty text-ink-subtle">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {/* ── 06 · The team ──────────────────────────────────────────────────
          Four named engineers with public profiles is a stronger signal than
          any amount of copy. */}
      <section className="border-t border-line py-20">
        <Container width="wide">
          <SectionHead
            eyebrow="The team"
            title="Four engineers, all reachable"
            lede="Amman, Jordan. Every profile below is public — check the work yourself."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Team.map((person) => {
              const links = [
                { label: "GitHub", href: person.github },
                { label: "LinkedIn", href: person.linkedin },
                { label: "Scholar", href: person.scholar },
              ].filter((link): link is { label: string; href: string } => Boolean(link.href));

              return (
                <li
                  key={person.name}
                  className="group relative border border-line bg-[rgba(232,41,74,0.02)] p-7 transition-colors duration-300 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <h3 className="text-glow font-display text-[1rem] font-bold tracking-[0.05em] text-ink">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[0.86rem] tracking-[0.04em] text-ink-muted">
                    {person.role}
                  </p>
                  <div className="mt-6 flex min-h-[1.25rem] flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
                    {links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[0.72rem] tracking-[0.1em] text-ink-subtle uppercase transition-colors duration-200 hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ── 07 · Closing ask ───────────────────────────────────────────────
          Unchanged — it just lands better here, after the evidence. */}
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
