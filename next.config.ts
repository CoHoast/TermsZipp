import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'export' - need server for API routes (auth, Stripe)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
