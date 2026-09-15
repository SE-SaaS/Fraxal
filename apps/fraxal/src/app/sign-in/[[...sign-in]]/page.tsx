import { SignIn } from "@clerk/nextjs";
import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Account"
        title="Sign in"
        lede="Enter your email and we will send you a code. There is no password to remember, and if you are new, the same code creates your account."
      />

      <section className="py-16">
        <Container>
          <div className="flex justify-center">
            <SignIn withSignUp />
          </div>
        </Container>
      </section>
    </main>
  );
}
