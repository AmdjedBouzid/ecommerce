import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  },
};

export default nextConfig;
