import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@essencia/ui", "@essencia/shared"],
};

export default nextConfig;
