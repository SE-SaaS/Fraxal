import { clerkMiddleware } from "@clerk/nextjs/server";

import { AuthRoutes } from "@/lib/clerk";

/**
 * Clerk runs only where being signed in matters (see `matcher`). Every other
 * page stays static and never pays for a proxy call just to be viewed.
 */
export default clerkMiddleware(
  async (auth, request) => {
    if (!request.nextUrl.pathname.startsWith(AuthRoutes.account)) return;

    // Not `auth.protect()`: that hides the page behind a 404 for signed-out
    // visitors, which is right for a secret URL and wrong for an account page
    // someone is trying to reach. Send them to sign in, then back here.
    const { isAuthenticated, redirectToSignIn } = await auth();
    if (!isAuthenticated) return redirectToSignIn({ returnBackUrl: request.url });
  },
  { signInUrl: AuthRoutes.signIn },
);

export const config = {
  matcher: ["/account/:path*", "/sign-in/:path*"],
};
