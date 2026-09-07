import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";

import { About, Projects, Site, Skills } from "@/lib/site";

const CTA =
  "h-auto rounded-control px-8 py-3.5 text-[0.85rem] font-semibold tracking-[0.06em] transition-all duration-200";

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-[54ch]">
      <p className="font-mono text-[0.7rem] tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.4rem,3.2vw,2rem)] font-semibold tracking-tight text-balance">
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* ── 01 · Introduction ──────────────────────────────────────────────
          You asked to be introduced first, so the page opens on who you are
          rather than on an offer. The name is the headline. */}
      <section className="border-b border-line py-24 md:py-32">
        <Container width="wide">
          <p className="font-mono text-[0.72rem] tracking-[0.18em] text-accent uppercase">
            {Site.role} · {Site.location}
          </p>

          <h1 className="mt-5 text-[clamp(2.2rem,7vw,4rem)] leading-[1.05] font-semibold tracking-tight text-balance">
            {Site.name}
          </h1>

          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-pretty text-ink-muted">
            {Site.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className={cn(buttonVariants({ size: "lg" }), CTA)}>
              See the work
            </a>
            <a
              href={`mailto:${Site.email}`}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), CTA)}
            >
              Get in touch
            </a>
          </div>
        </Container>
      </section>

      {/* ── 02 · About ─────────────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-20 py-20">
        <Container width="wide">
          <SectionHead eyebrow="About" title="How I work" />
          <div className="mt-8 flex max-w-[62ch] flex-col gap-5">
            {About.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="leading-relaxed text-pretty text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 03 · Skills ────────────────────────────────────────────────── */}
      <section id="skills" className="scroll-mt-20 border-y border-line bg-surface py-20">
        <Container width="wide">
          <SectionHead eyebrow="Skills" title="What I actually use" />

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {Skills.map((group) => (
              <li key={group.title}>
                <h3 className="text-[0.95rem] font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-1.5 text-[0.9rem] text-pretty text-ink-subtle">{group.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-control border border-line bg-overlay px-2.5 py-1 font-mono text-[0.72rem] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 04 · Work ──────────────────────────────────────────────────── */}
      <section id="work" className="scroll-mt-20 py-20">
        <Container width="wide">
          <SectionHead eyebrow="Work" title="Things I have built" />

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {Projects.map((project) => (
              <li key={project.name} className="group">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col rounded-panel border border-line p-7 transition-colors duration-200 hover:border-line-strong hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
                      {project.name}
                    </h3>
                    {project.note ? (
                      <span className="font-mono text-[0.7rem] text-accent">{project.note}</span>
                    ) : null}
                  </div>

                  <p className="mt-3 flex-1 text-[0.92rem] text-pretty text-ink-subtle">
                    {project.blurb}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-control border border-line px-2 py-0.5 font-mono text-[0.7rem] text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 05 · Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-20 border-t border-line py-20">
        <Container width="wide">
          <SectionHead eyebrow="Contact" title="Working on something hard?" />

          <p className="mt-4 max-w-[54ch] text-pretty text-ink-muted">
            Low-level performance, a model that needs building rather than calling, or a product
            that needs both. Tell me what it is and I will tell you whether I am the right person.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={`mailto:${Site.email}`} className={cn(buttonVariants({ size: "lg" }), CTA)}>
              {Site.email}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-8">
            {Site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.75rem] tracking-[0.1em] text-ink-subtle uppercase transition-colors duration-200 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
