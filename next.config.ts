import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
    responseLimit: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
