import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
