import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProjectMatcher } from "./project-matcher";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Describe what you want to build in your own words. We work out which services it needs before anyone talks to you.",
};

export default function StartPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Start a project"
        title="Describe it in your own words"
        lede="You do not need to know which service you want, or what any of it is called. Write what you are trying to build and what is in the way — we will work out the rest."
      />

      <section className="py-16">
        <Container>
          <ProjectMatcher />
        </Container>
      </section>
    </main>
  );
}
