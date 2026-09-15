import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { AuthRoutes } from "@/lib/clerk";

const isAccount = createRouteMatcher([`${AuthRoutes.account}(.*)`]);

/**
 * Clerk runs only where being signed in matters. Every other page stays static
 * and never pays for a proxy call just to be viewed.
 */
export default clerkMiddleware(
  async (auth, request) => {
    if (isAccount(request)) await auth.protect();
  },
  { signInUrl: AuthRoutes.signIn },
);

export const config = {
  matcher: ["/account/:path*", "/sign-in/:path*"],
};
