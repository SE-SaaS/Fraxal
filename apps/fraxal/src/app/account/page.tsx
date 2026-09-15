import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

const LABEL = "font-mono text-[0.68rem] tracking-[0.14em] text-ink-subtle uppercase";

export default async function AccountPage() {
  // The proxy already sends signed-out visitors to sign in; this is the backstop.
  await auth.protect();
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? "No email on file";
  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <PageHeader eyebrow="Account" title="Your account" lede={`Signed in as ${email}.`} />

      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-12">
            <dl className="grid gap-6 border-y border-line py-8 sm:grid-cols-2">
              <div>
                <dt className={LABEL}>Email</dt>
                <dd className="mt-2 text-ink">{email}</dd>
              </div>
              <div>
                <dt className={LABEL}>Member since</dt>
                <dd className="mt-2 text-ink">{joined}</dd>
              </div>
            </dl>

            <div>
              <h2 className="font-display text-[0.95rem] font-bold tracking-[0.08em] text-ink uppercase">
                Purchases
              </h2>
              <p className="mt-3 max-w-[60ch] text-pretty text-ink-muted">
                Nothing here yet. Assets cannot be bought online yet — once they can, everything you
                buy will be listed here.
              </p>
              <Link
                href="/assets"
                className="mt-4 inline-block text-sm text-accent hover:underline"
              >
                Browse assets
              </Link>
            </div>

            <div className="border-t border-line pt-8">
              <SignOutButton redirectUrl="/">
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-auto rounded-[2px] border border-line-strong bg-transparent px-8 py-3 text-[0.8rem] font-semibold tracking-[0.12em] text-ink uppercase hover:border-accent hover:text-accent",
                  )}
                >
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
