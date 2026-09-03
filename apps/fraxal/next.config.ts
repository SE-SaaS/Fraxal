import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @repo/ui ships raw .tsx — this hands it to the compiler Next already runs
  // instead of standing up a second build step in the package.
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  poweredByHeader: false,
  // Kills the floating "N" badge in dev. It's Next's own route indicator, not
  // part of the site — compile and runtime errors still surface without it.
  devIndicators: false,
};

export default nextConfig;
