import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY
  }
};

export default nextConfig;
