import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
