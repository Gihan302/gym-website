import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages serves from /gym-website/
  basePath: isProd ? '/gym-website' : '',
  images: {
    unoptimized: true,
  },
  // Expose the base path to the client components
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/gym-website' : '',
  },
};

export default nextConfig;
