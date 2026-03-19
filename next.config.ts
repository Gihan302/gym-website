import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

// Hardcode the base path for production to ensure it's always set correctly for GitHub Pages
const basePath = isProd ? '/gym-website' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Expose the base path to the client components
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
