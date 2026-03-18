import { NavLink, ServiceItem, PricingTier, GalleryImage } from '../types';

// ━━━ STEP 3: lib/constants.ts ━━━

export const NAV_LINKS: NavLink[] = [
  { label: 'Home',       href: '#home'     },
  { label: 'About Us',   href: '#about'    },
  { label: 'Services',   href: '#services' },
  { label: 'Gallery',    href: '#gallery'  },
  { label: 'Pricing',    href: '#pricing'  },
  { label: 'Contact Us', href: '#contact'  },
];

export const SERVICES_DATA: ServiceItem[] = [];
export const PRICING_DATA: PricingTier[]  = [];
export const GALLERY_IMAGES: GalleryImage[] = [];
