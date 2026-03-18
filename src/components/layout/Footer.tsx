import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "../../lib/constants";

// ─────────────────────────────────────────────
// Social icon SVG paths (no external icon dep)
// ─────────────────────────────────────────────
const SocialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  ),
};

// ─────────────────────────────────────────────
// Static data — move to lib/constants.ts later
// ─────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com",  icon: SocialIcons.facebook  },
  { label: "Instagram", href: "https://instagram.com", icon: SocialIcons.instagram },
  { label: "Twitter",   href: "https://twitter.com",   icon: SocialIcons.twitter   },
  { label: "Email",     href: "mailto:info@fitness.com", icon: SocialIcons.email   },
];

const CONTACT_INFO = {
  email:    "info@fitness.com",
  phone:    "+94 115462011",
  location: "Pita Kotte, Sri Lanka",
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-primary font-semibold uppercase tracking-widest text-sm text-[var(--cream)] mb-5">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  const baseClass =
    "font-primary font-medium uppercase tracking-wider text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors duration-200 block leading-relaxed";

  if (isExternal) {
    return (
      <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={baseClass}>
      {children}
    </a>
  );
}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--black)] border-t border-[var(--charcoal)]">

      {/* ── Top gold accent line ─────────────────── */}
      <div className="h-[3px] bg-[var(--gold)] w-full" />

      {/* ── Main footer content ──────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Column 1: Logo + tagline ───────────── */}
          <div className="flex flex-col gap-6">
            <a href="#home" aria-label="Fitness Sports Center — go to top">
              <span className="font-primary font-bold text-2xl tracking-tighter text-white uppercase">
                FITNESS<span className="text-[#D5A310]">GYM</span>
              </span>
            </a>
            {/* Short tagline below logo */}
            <p className="font-primary text-sm text-[var(--cream)]/50 leading-relaxed max-w-[180px]">
              Train hard. Live strong. Established 2022.
            </p>
            {/* Decorative gold rule */}
            <div className="w-10 h-[2px] bg-[var(--gold)]" />
          </div>

          {/* ── Column 2: Quick links ─────────────── */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <nav aria-label="Footer navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Contact information ─────── */}
          <div>
            <FooterHeading>Information</FooterHeading>
            <div className="flex flex-col gap-4">

              {/* Email */}
              <div>
                <p className="font-primary font-semibold text-xs uppercase tracking-widest text-[var(--cream)]/40 mb-1">
                  E mail
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-primary text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors duration-200"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="font-primary font-semibold text-xs uppercase tracking-widest text-[var(--cream)]/40 mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="font-primary text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors duration-200"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="font-primary font-semibold text-xs uppercase tracking-widest text-[var(--cream)]/40 mb-1">
                  Location
                </p>
                <p className="font-primary text-sm text-[var(--cream)]/70">
                  {CONTACT_INFO.location}
                </p>
              </div>

            </div>
          </div>

          {/* ── Column 4: Social media ────────────── */}
          <div>
            <FooterHeading>Social Media</FooterHeading>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={[
                    "w-9 h-9 flex items-center justify-center",
                    "border border-[var(--charcoal)] rounded",
                    "text-[var(--cream)]/60",
                    "hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10",
                    "transition-all duration-200",
                  ].join(" ")}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom copyright bar ─────────────────── */}
      <div className="border-t border-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-primary text-xs text-[var(--cream)]/35 uppercase tracking-wider">
            © {year} Fitness Sports Center. All rights reserved.
          </p>
          <a
            href="#"
            className="font-primary text-xs text-[var(--cream)]/35 hover:text-[var(--gold)] uppercase tracking-wider transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>

    </footer>
  );
}