"use client";

import Image from "next/image";

// ─── Social icon SVGs ────────────────────────────────────────
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
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
export default function HeroSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--black)" }}
    >

      {/* ── Athlete image — right half, bottom-anchored ── */}
      {/*
        KEY FIXES vs previous version:
        1. Width capped at 45% on desktop — image no longer bleeds left
        2. object-position: top center — shows face/torso, not cropped weirdly
        3. Gradient covers ~50% from left so text is always readable
        4. Image starts at the header bottom (top: 0) and fills to bottom
      */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block"
        style={{ width: "45%", position: 'relative' }}          // ← was 50–100%, now fixed 45%
      >
        <Image
          src="/Hero image.jpg"
          alt="Fitness athlete"
          fill
          priority
          sizes="45vw"
          className="object-cover"
          style={{ objectPosition: "center top" }}   // ← show top of image (face/body)
        />

        {/* Left-side fade: blends image into dark bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--black) 0%, transparent 45%)",
          }}
        />

        {/* Bottom fade: softens the image bottom edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--black) 0%, transparent 18%)",
          }}
        />
      </div>

      {/* ── Subtle overall dark overlay (entire section) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(4,3,4,0.85) 0%, rgba(4,3,4,0.55) 55%, rgba(4,3,4,0.0) 100%)",
        }}
      />

      {/* ── Main text content ─────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/*
          Content occupies left ~55% of screen so it never overlaps image.
          On mobile it goes full width since image is hidden.
        */}
        <div style={{ maxWidth: "min(600px, 55%)" }} className="max-md:max-w-full">

          {/* ── Headline ─────────────────────────── */}
          <h1
            className="uppercase animate-fade-up"
            style={{
              fontFamily:   "var(--font-primary)",
              fontSize:     "var(--text-hero)",
              fontWeight:   "var(--weight-bold)",
              lineHeight:   "var(--leading-tight)",
              letterSpacing: "-0.01em",
              color:        "var(--cream)",
              animationDelay: "0ms",
              marginBottom: "1.5rem",
            }}
          >
            Reach Your<br />
            Limits And Get To<br />
            The Next Level
          </h1>

          {/* ── Body text ────────────────────────── */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily:  "var(--font-primary)",
              fontSize:    "var(--text-base)",
              fontWeight:  "var(--weight-regular)",
              lineHeight:  "var(--leading-normal)",
              color:       "rgba(241,240,235,0.65)",
              maxWidth:    "480px",
              marginBottom: "2.5rem",
              animationDelay: "120ms",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* ── CTA Buttons ──────────────────────── */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {/* LEARN MORE — white/cream outline */}
            <button
              className="uppercase transition-all duration-200"
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.8rem 2.2rem",
                background:    "transparent",
                color:         "var(--cream)",
                border:        "1.5px solid var(--cream)",
                cursor:        "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "var(--gold)";
                el.style.color       = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "var(--cream)";
                el.style.color       = "var(--cream)";
              }}
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>

            {/* JOIN NOW — gold filled */}
            <button
              className="uppercase transition-all duration-200"
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.8rem 2.2rem",
                background:    "var(--gold)",
                color:         "var(--black)",
                border:        "1.5px solid var(--gold)",
                cursor:        "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background   = "#b8880d";
                el.style.borderColor  = "#b8880d";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background   = "var(--gold)";
                el.style.borderColor  = "var(--gold)";
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

      {/* ── Bottom-left: gold decorative rule ────── */}
      <div
        className="absolute z-10"
        style={{
          bottom:          "2.5rem",
          left:            "clamp(1rem, 4vw, 4rem)",
          width:           "3.5rem",
          height:          "3px",
          backgroundColor: "var(--gold)",
        }}
      />

      {/* ── Bottom-right: SOCIAL label + icons ───── */}
      <div
        className="absolute z-10 flex items-center gap-3"
        style={{ bottom: "2.5rem", right: "clamp(1rem, 3vw, 2rem)" }}
      >
        <span
          className="uppercase hidden sm:inline"
          style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-xs)",
            fontWeight:    "var(--weight-semibold)",
            letterSpacing: "var(--tracking-widest)",
            color:         "rgba(241,240,235,0.45)",
          }}
        >
          Social
        </span>

        {/* Short rule between label and icons */}
        <div
          className="hidden sm:block"
          style={{ width: "1.75rem", height: "1px", backgroundColor: "rgba(241,240,235,0.25)" }}
        />

        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="transition-colors duration-200"
            style={{ color: "rgba(241,240,235,0.55)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.55)")
            }
          >
            {s.icon}
          </a>
        ))}
      </div>

    </section>
  );
}