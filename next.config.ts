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
// images: {
//   remotePatterns: [
//     {
//       protocol: 'https',
//       hostname: 'assets.example.com',
//       port: '',
//       pathname: '/account123/**',
//       search: '',
//     },
//   ],
// },
// images: {
//   domains: ['example.com'],
// },
