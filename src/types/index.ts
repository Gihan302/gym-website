// ━━━ STEP 4: types/index.ts ━━━

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  featured: boolean;
  ctaLabel: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}
