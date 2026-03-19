import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// On GitHub Pages, the repository name is usually the base path
// We can get it from GITHUB_REPOSITORY (e.g., "username/repo-name")
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '/gym-website';

const basePath = isGitHubActions ? repoName : '';

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages serves from a subpath (the repo name)
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
