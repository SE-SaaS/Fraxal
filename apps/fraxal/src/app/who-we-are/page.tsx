import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { projects, site, team, type Project } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Fraxal builds AI systems and the software around them. Here is what we have shipped and who ships it.",
};

/** One card shape for both lists, so company and personal work read as a set. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="group border border-line">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col border border-transparent bg-[rgba(232,41,74,0.02)] p-7 transition-colors duration-300 hover:border-accent hover:bg-[rgba(232,41,74,0.05)] focus-visible:outline-2 focus-visible:outline-accent"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-[0.98rem] font-bold tracking-[0.05em] text-ink transition-colors duration-300 group-hover:text-accent">
            {project.name}
          </h3>
          {project.by ? (
            <span className="font-mono text-[0.68rem] tracking-[0.08em] text-ink-subtle">
              {project.by}
            </span>
          ) : null}
        </div>

        {project.note ? (
          <p className="mt-2.5 font-mono text-[0.72rem] tracking-[0.04em] text-accent">
            {project.note}
          </p>
        ) : null}

        <p className="mt-3 flex-1 text-[0.92rem] text-pretty text-ink-subtle">{project.blurb}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="border border-line px-2 py-0.5 font-mono text-[0.7rem] text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </a>
    </li>
  );
}

export default function WhoWeArePage() {
  return (
    <main>
      {/* One line, as asked. The work below does the rest of the talking. */}
      <PageHeader
        eyebrow="Who we are"
        title="We build AI systems and the software they live inside."
      />

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section className="py-16">
        <Container width="wide">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-sm font-bold tracking-[0.16em] text-accent uppercase">
              What we have shipped
            </h2>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-subtle transition-colors duration-200 hover:text-accent"
            >
              All repositories →
            </a>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ul>
        </Container>
      </section>

      {/* ── People ───────────────────────────────────────────────────────── */}
      <section className="pb-20">
        <Container width="wide">
          <div className="border-t border-line pt-12">
            <h2 className="font-display text-sm font-bold tracking-[0.16em] text-accent uppercase">
              Developers
            </h2>

            {team.length === 0 ? (
              <p className="mt-6 max-w-[52ch] text-pretty text-ink-subtle">
                Names and profiles go here. Send me each person&rsquo;s name, role and GitHub or
                LinkedIn and they render as a card linking straight out — I have left this empty
                rather than invent colleagues.
              </p>
            ) : (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((person) => {
                  // Built as a list so the row renders identically no matter
                  // which profiles a person has, and adding one is one line.
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

                      <h3 className="text-glow font-display text-[1.02rem] font-bold tracking-[0.05em] text-ink">
                        {person.name}
                      </h3>
                      <p className="mt-2 text-[0.86rem] tracking-[0.04em] text-ink-muted">
                        {person.role}
                      </p>

                      {/* Fixed min-height keeps card bodies aligned whether or
                          not a person has profiles yet. */}
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
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
