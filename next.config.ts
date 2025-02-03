import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  reactStrictMode: false,
};

export default nextConfig;
