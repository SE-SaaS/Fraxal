import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask a question, report a problem, or request a quote. Fraxal reads everything that comes in.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Ask us anything"
        lede="A question, a problem with something we shipped, a quote, or none of the above. It all reaches the same inbox and it all gets read."
      />

      <section className="py-16">
        <Container>
          <ContactForm />

          <p className="mt-14 border-t border-line pt-8 text-sm text-pretty text-ink-subtle">
            Have a project in mind rather than a question?{" "}
            <Link href="/start" className="text-accent hover:underline">
              Describe it on the project page
            </Link>{" "}
            and we will work out which services it needs before you hear from anyone.
          </p>
        </Container>
      </section>
    </main>
  );
}
