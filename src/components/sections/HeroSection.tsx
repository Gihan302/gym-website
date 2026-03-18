"use client";

import Image from "next/image";

// ─── Social icon SVGs ─────────────────────────────────────────
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com",    icon: <FacebookIcon />  },
  { label: "Instagram", href: "https://instagram.com",   icon: <InstagramIcon /> },
  { label: "Twitter",   href: "https://twitter.com",     icon: <TwitterIcon />   },
  { label: "Email",     href: "mailto:info@fitness.com", icon: <MailIcon />      },
];

// ─────────────────────────────────────────────────────────────
// Hero section — always dark (#040304) regardless of theme.
// In the screenshot both dark and light mode show the same
// black hero — only the About section below changes.
// ─────────────────────────────────────────────────────────────
export default function HeroSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      style={{
        position:        "relative",
        minHeight:       "100vh",
        display:         "flex",
        alignItems:      "center",
        overflow:        "hidden",
        backgroundColor: "#040304",   // always black — never inherits theme
      }}
    >
      {/* ── Athlete image — right 45%, full height ── */}
      <div
        style={{
          position: "absolute",
          right:    0,
          top:      0,
          bottom:   0,
          width:    "48%",
        }}
        className="hidden md:block"
      >
        <Image
          src="/Hero image.jpg"
          alt="Fitness athlete"
          fill
          priority
          sizes="48vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />

        {/* Fade left edge into black */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to right, #040304 0%, transparent 40%)",
          }}
        />
        {/* Fade bottom edge */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to top, #040304 0%, transparent 20%)",
          }}
        />
      </div>

      {/* ── Global overlay (whole section) ───────── */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          zIndex:         1,
          pointerEvents:  "none",
          background:
            "linear-gradient(to right, rgba(4,3,4,0.9) 0%, rgba(4,3,4,0.6) 52%, rgba(4,3,4,0) 100%)",
        }}
      />

      {/* ── Main content ─────────────────────────── */}
      <div
        style={{
          position:  "relative",
          zIndex:    2,
          width:     "100%",
          maxWidth:  "1280px",
          margin:    "0 auto",
          padding:   "7rem 2rem 6rem",
        }}
      >
        {/* Text column — left 52% */}
        <div style={{ maxWidth: "clamp(300px, 52%, 580px)" }}>

          {/* Headline */}
          <h1
            className="animate-fade-up"
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-hero)",
              fontWeight:    "var(--weight-bold)",
              lineHeight:    "var(--leading-tight)",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color:         "#F1F0EB",             // always cream on dark hero
              marginBottom:  "1.5rem",
              animationDelay:"0ms",
            }}
          >
            Reach Your<br />
            Limits And Get To<br />
            The Next Level
          </h1>

          {/* Body text */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-base)",
              fontWeight:    "var(--weight-regular)",
              lineHeight:    "var(--leading-normal)",
              color:         "rgba(241,240,235,0.65)",
              maxWidth:      "460px",
              marginBottom:  "2.5rem",
              animationDelay:"120ms",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-up"
            style={{
              display:       "flex",
              flexWrap:      "wrap",
              gap:           "1rem",
              animationDelay:"240ms",
            }}
          >
            {/* LEARN MORE — white outline, matches Figma exactly */}
            <button
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.8rem 2.2rem",
                background:    "transparent",
                color:         "#F1F0EB",
                border:        "1.5px solid #F1F0EB",
                cursor:        "pointer",
                transition:    "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#D5A310";
                el.style.color       = "#D5A310";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#F1F0EB";
                el.style.color       = "#F1F0EB";
              }}
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>

            {/* JOIN NOW — gold filled */}
            <button
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.8rem 2.2rem",
                background:    "#D5A310",
                color:         "#040304",
                border:        "1.5px solid #D5A310",
                cursor:        "pointer",
                transition:    "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background  = "#b8880d";
                el.style.borderColor = "#b8880d";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background  = "#D5A310";
                el.style.borderColor = "#D5A310";
              }}
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Now
            </button>
          </div>

        </div>
      </div>

      {/* ── Bottom-left: gold decorative line ────── */}
      <div
        style={{
          position:        "absolute",
          bottom:          "2.5rem",
          left:            "clamp(1rem, 4vw, 4rem)",
          zIndex:          2,
          width:           "3.5rem",
          height:          "3px",
          backgroundColor: "#D5A310",
        }}
      />

      {/* ── Bottom-right: SOCIAL + icons ─────────── */}
      <div
        style={{
          position:   "absolute",
          bottom:     "2.4rem",
          right:      "clamp(1rem, 3vw, 2rem)",
          zIndex:     2,
          display:    "flex",
          alignItems: "center",
          gap:        "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-xs)",
            fontWeight:    "var(--weight-semibold)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            color:         "rgba(241,240,235,0.4)",
          }}
          className="hidden sm:inline"
        >
          Social
        </span>
        <div
          className="hidden sm:block"
          style={{ width: "1.75rem", height: "1px", backgroundColor: "rgba(241,240,235,0.2)" }}
        />
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{ color: "rgba(241,240,235,0.5)", transition: "color 0.2s" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#D5A310")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.5)")
            }
          >
            {s.icon}
          </a>
        ))}
      </div>

    </section>
  );
}