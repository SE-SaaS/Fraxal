import { Button } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";

import { site, work } from "@/lib/site";

const services = [
  {
    title: "Positioning",
    body: "Working out what the product actually is, who it beats, and the sentence everything else hangs off.",
  },
  {
    title: "Launch",
    body: "Sequencing the announcement, the assets, and the channels so a release lands instead of leaking out.",
  },
  {
    title: "Pages that convert",
    body: "Landing and pricing pages built to be measured — written, designed, and shipped by the same person.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="py-24 md:py-32">
        <Container>
          <p className="font-mono text-sm tracking-wide text-accent uppercase">{site.role}</p>

          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            A marketer who can read the codebase.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted">
            {site.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg">Start a project</Button>
            <Button size="lg" variant="secondary">
              See the work
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <Container>
          <h2 className="text-sm font-medium tracking-wide text-ink-subtle uppercase">
            Selected work
          </h2>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {work.map((item) => (
              <li
                key={item.slug}
                className="rounded-panel border border-line bg-overlay p-8 transition-colors duration-200 hover:border-line-strong"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                  <span className="font-mono text-xs text-ink-subtle">{item.year}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-muted">
                  {item.summary}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs tracking-wide text-ink-subtle uppercase">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What I do</h2>

          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {services.map((service) => (
              <li key={service.title}>
                <h3 className="font-medium text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">
                  {service.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line py-24">
        <Container width="prose" className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Got something that needs launching?
          </h2>
          <p className="mt-4 text-pretty text-ink-muted">
            Tell me what you are building and where it is stuck.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg">Get in touch</Button>
          </div>
        </Container>
      </section>

      <footer className="border-t border-line py-12">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-subtle">{site.name}</p>
          <p className="text-sm text-ink-subtle">© {new Date().getFullYear()}</p>
        </Container>
      </footer>
    </main>
  );
}
