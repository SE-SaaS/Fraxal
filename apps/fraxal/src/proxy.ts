import { clerkMiddleware } from "@clerk/nextjs/server";

import { AuthRoutes } from "@/lib/clerk";

/**
 * Clerk runs only where being signed in matters (see `matcher`). Every other
 * page stays static and never pays for a proxy call just to be viewed.
 */
export default clerkMiddleware(
  async (auth, request) => {
    if (request.nextUrl.pathname.startsWith(AuthRoutes.account)) await auth.protect();
  },
  { signInUrl: AuthRoutes.signIn },
);

export const config = {
  matcher: ["/account/:path*", "/sign-in/:path*"],
};
