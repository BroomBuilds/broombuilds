import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // Native shared-element morph for work index → case study cover.
    viewTransition: true,
  },
};

export default nextConfig;
