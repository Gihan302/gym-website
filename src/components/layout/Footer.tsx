"use client";

import Image from "next/image";
import { NAV_LINKS } from "../../lib/constants";

// ─── Social icons ────────────────────────────────────────────
const SocialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  ),
};

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com",    icon: SocialIcons.facebook  },
  { label: "Instagram", href: "https://instagram.com",   icon: SocialIcons.instagram },
  { label: "Twitter",   href: "https://twitter.com",     icon: SocialIcons.twitter   },
  { label: "Email",     href: "mailto:info@fitness.com", icon: SocialIcons.email     },
];

const CONTACT_INFO = {
  email:    "info@fitness.com",
  phone:    "+94 115462011",
  location: "Pita Kotte, Sri Lanka",
};

// ─── Reusable sub-components ─────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wider)",
        color:         "var(--cream)",
        marginBottom:  "1.25rem",
      }}
    >
      {children}
    </p>
  );
}

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display:       "block",
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-medium)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color:         "rgba(241,240,235,0.65)",
        textDecoration:"none",
        lineHeight:    "2",
        transition:    "color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.65)")
      }
    >
      {children}
    </a>
  );
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-xs)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wider)",
        color:         "rgba(241,240,235,0.35)",
        marginBottom:  "0.2rem",
      }}
    >
      {children}
    </p>
  );
}

function InfoValue({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    fontFamily:    "var(--font-primary)",
    fontSize:      "var(--text-sm)",
    color:         "rgba(241,240,235,0.65)",
    textDecoration:"none",
    transition:    "color 0.2s",
    display:       "block",
    marginBottom:  "1rem",
  };

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.65)")
        }
      >
        {children}
      </a>
    );
  }
  return <p style={{ ...style }}>{children}</p>;
}

// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--black)" }}>

      {/* Gold top accent line */}
      <div style={{ height: "3px", backgroundColor: "var(--gold)", width: "100%" }} />

      {/* Main grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin:   "0 auto",
          padding:  "4rem 2rem",
        }}
      >
        {/*
          4-column layout matching Figma:
          [Logo]  [Quick Links]  [Information]  [Social Media]

          On mobile: 1 column stacked.
          Logo column is slightly wider to balance the layout.
        */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "3rem",
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >

          {/* ── Col 1: Logo ─────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <a href="#home" aria-label="Go to top" style={{ display: "inline-block", lineHeight: 0 }}>
              <Image
                src="/logo.png"
                alt="Fitness Gym Logo"
                width={200}
                height={70}
                style={{ height: "72px", width: "auto", objectFit: "contain" }}
              />
            </a>
            {/* Decorative gold rule below logo */}
            <div style={{ width: "2.5rem", height: "2px", backgroundColor: "var(--gold)" }} />
          </div>

          {/* ── Col 2: Quick Links ───────────────── */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <nav aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <FooterNavLink key={link.href} href={link.href}>
                  {link.label}
                </FooterNavLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Information ───────────────── */}
          <div>
            <ColHeading>Information</ColHeading>

            <InfoLabel>E mail</InfoLabel>
            <InfoValue href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </InfoValue>

            <InfoLabel>Phone</InfoLabel>
            <InfoValue href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>
              {CONTACT_INFO.phone}
            </InfoValue>

            <InfoLabel>Location</InfoLabel>
            <InfoValue>{CONTACT_INFO.location}</InfoValue>
          </div>

          {/* ── Col 4: Social Media ──────────────── */}
          <div>
            <ColHeading>Social Media</ColHeading>
            {/*
              Figma shows icons stacked VERTICALLY, one per row.
              Each is a small square icon box.
            */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display:         "inline-flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    width:           "2.25rem",
                    height:          "2.25rem",
                    border:          "1px solid rgba(44,44,44,0.9)",
                    borderRadius:    "4px",
                    color:           "rgba(241,240,235,0.6)",
                    textDecoration:  "none",
                    transition:      "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--gold)";
                    el.style.color       = "var(--gold)";
                    el.style.background  = "rgba(213,163,16,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(44,44,44,0.9)";
                    el.style.color       = "rgba(241,240,235,0.6)";
                    el.style.background  = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom copyright bar */}
      <div
        style={{
          borderTop: "1px solid rgba(44,44,44,0.8)",
        }}
      >
        <div
          style={{
            maxWidth:       "1280px",
            margin:         "0 auto",
            padding:        "1.25rem 2rem",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
              color:         "rgba(241,240,235,0.3)",
            }}
          >
            © {year} Fitness Sports Center. All rights reserved.
          </p>
          <a
            href="#"
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
              color:         "rgba(241,240,235,0.3)",
              textDecoration:"none",
              transition:    "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.3)")
            }
          >
            Privacy Policy
          </a>
        </div>
      </div>

    </footer>
  );
}