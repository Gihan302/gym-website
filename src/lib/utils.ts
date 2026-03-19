export function getAssetPath(path: string): string {
  // NEXT_PUBLIC_BASE_PATH is injected at build time (e.g., '/gym-website')
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Ensure path starts with a slash
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Join base and path, ensuring no double slashes
  // If base ends with a slash, remove it before joining
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  
  return `${cleanBase}${sanitizedPath}`;
}
