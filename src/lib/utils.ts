export function getAssetPath(path: string): string {
  // NEXT_PUBLIC_BASE_PATH is injected at build time (e.g., '/gym-website')
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${sanitizedPath}`;
}
