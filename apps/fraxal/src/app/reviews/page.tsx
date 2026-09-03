import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What clients say about working with Fraxal — the process, not just the result.",
};

export default function ReviewsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Clients"
        title="What it is like to work with us"
        lede="Reviews of the process — how the work was scoped, how it ran, and what it was like when something went wrong."
      />

      <section className="py-16">
        <Container width="wide">
          {reviews.length === 0 ? (
            // Honest empty state. Inventing testimonials would mean publishing
            // fake quotes under invented people's names.
            <div className="mx-auto max-w-[52ch] border border-line p-12 text-center">
              <p className="font-display text-lg font-bold tracking-[0.06em] text-ink">
                No reviews published yet
              </p>
              <p className="mt-4 text-pretty text-ink-subtle">
                We would rather show nothing here than write our own. As projects close and clients
                agree to be quoted, their words go here — named, with the project attached.
              </p>
              <p className="mt-6 text-sm text-ink-subtle">
                Worked with us?{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  Send us a review
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <li
                  key={`${review.author}-${review.project}`}
                  className="border border-line bg-[rgba(232,41,74,0.02)] p-8"
                >
                  <blockquote className="text-pretty text-ink-muted">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 border-t border-line pt-5">
                    <p className="text-sm font-semibold text-ink">{review.author}</p>
                    <p className="text-sm text-ink-subtle">{review.role}</p>
                    <p className="mt-2 font-mono text-[0.72rem] tracking-[0.1em] text-accent uppercase">
                      {review.project}
                    </p>
                  </footer>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  );
}
