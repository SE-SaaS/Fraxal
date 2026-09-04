import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { AssetCategories, Assets } from "@/lib/site";

export const metadata: Metadata = {
  title: "Assets",
  description:
    "Ready-made systems and tools — RAG pipelines, AI models, CLIs, and drop-in game systems for Unreal, Unity and Godot.",
};

export default function AssetsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Store"
        title="Problems we have already solved"
        lede="Every one of these started as work for a project and turned out to be worth building properly. Buy the piece you need, or bring us the problem and we will tell you whether one of these fits."
      />

      {AssetCategories.map((category) => {
        const items = Assets.filter((asset) => asset.category === category.id);
        if (items.length === 0) return null;

        return (
          <section key={category.id} className="border-b border-line py-14">
            <Container width="wide">
              <div className="max-w-[58ch]">
                <h2 className="font-display text-sm font-bold tracking-[0.16em] text-accent uppercase">
                  {category.title}
                </h2>
                <p className="mt-3 text-pretty text-ink-subtle">{category.blurb}</p>
              </div>

              <ul className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((asset) => (
                  <li
                    key={asset.slug}
                    className="group flex flex-col border border-line bg-[rgba(232,41,74,0.02)] p-7 transition-colors duration-300 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-[1rem] font-bold tracking-[0.05em] text-ink">
                        {asset.name}
                      </h3>
                      {asset.status === "coming-soon" ? (
                        <span className="shrink-0 border border-line-strong px-2 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-ink-subtle uppercase">
                          Soon
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 flex-1 text-[0.92rem] text-pretty text-ink-subtle">
                      {asset.blurb}
                    </p>

                    <div className="mt-6 border-t border-line pt-5">
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-subtle uppercase">
                        Works with
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {asset.worksWith.map((item) => (
                          <li
                            key={item}
                            className="border border-line px-2 py-0.5 font-mono text-[0.7rem] text-ink-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      {/* ── Consulting ───────────────────────────────────────────────────── */}
      {/* The alternative to buying a part: describe the problem and have
          someone work out whether a part is even the right answer. */}
      <section className="py-16">
        <Container width="wide">
          <div className="grid gap-8 border border-line-strong bg-[rgba(232,41,74,0.02)] p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.2rem,3vw,1.7rem)] font-black tracking-[0.1em] text-accent">
                Not sure which piece you need?
              </h2>
              <p className="mt-4 max-w-[52ch] text-pretty text-ink-subtle">
                Most people arrive with a problem, not a shopping list. Describe what you are trying
                to do and we will tell you whether one of these fits, whether it needs building, or
                whether you do not need us at all.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/start"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-8 py-3.5 text-center text-[0.82rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1",
                )}
              >
                Describe your problem
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-auto rounded-[2px] border-accent bg-transparent px-8 py-3.5 text-center text-[0.82rem] font-semibold tracking-[0.12em] text-accent uppercase transition-all duration-300 hover:bg-[rgba(232,41,74,0.07)]",
                )}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
