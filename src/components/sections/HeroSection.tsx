"use client";

import Image from "next/image";
import Button from "../ui/Button";

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
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--black)" }}
    >
      {/* ── Dark overlay on top of bg image ─────── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, var(--black) 0%, rgba(4,3,4,0.8) 50%, rgba(4,3,4,0.3) 100%)",
        }}
      />

      {/* ── Athlete image (right side, absolute) ─── */}
      <div className="absolute right-0 top-0 h-full w-full md:w-[50%] lg:w-[45%] xl:w-[40%] z-0">
        <Image
          src="/Hero image.jpg"
          alt="Fitness athlete"
          fill
          className="object-cover object-center md:object-top"
          priority
          sizes="(max-width: 76px) 10vw, 40vw"
        />

        {/* Gradient fade left edge of image into bg (desktop only) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, var(--black) 0%, transparent 40%)",
          }}
        />
        {/* Bottom fade to prevent harsh cut */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--black) 0%, transparent 20%)",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-2xl">

          {/* Headline */}
          <h1
            className="uppercase font-bold leading-none tracking-tight text-white mb-6 animate-fade-up"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-hero)",
              fontWeight: "var(--weight-bold)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.01em",
              animationDelay: "0ms",
            }}
          >
            Reach Your<br />
            Limits And Get To<br />
            The Next Level
          </h1>

          {/* Body text */}
          <p
            className="mb-10 max-w-md animate-fade-up"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--weight-regular)",
              lineHeight: "var(--leading-normal)",
              color: "rgba(241,240,235,0.7)",
              animationDelay: "120ms",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {/* LEARN MORE — white outline */}
            <button
              className="group relative font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-bold)",
                letterSpacing: "var(--tracking-widest)",
                fontSize: "var(--text-sm)",
                padding: "0.75rem 2.5rem",
                background: "transparent",
                color: "var(--cream)",
                border: "1.5px solid var(--cream)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cream)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--cream)";
              }}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </button>

            {/* JOIN NOW — gold filled */}
            <button
              className="font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-bold)",
                letterSpacing: "var(--tracking-widest)",
                fontSize: "var(--text-sm)",
                padding: "0.75rem 2.5rem",
                background: "var(--gold)",
                color: "var(--black)",
                border: "1.5px solid var(--gold)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#b8880d";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#b8880d";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
              }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join Now
            </button>
          </div>

        </div>
      </div>

      {/* ── Bottom-left: gold decorative line ────── */}
      <div
        className="absolute bottom-10 left-4 sm:left-8 lg:left-16 z-10"
        style={{ width: "3.5rem", height: "3px", backgroundColor: "var(--gold)" }}
      />

      {/* ── Bottom-right: SOCIAL + icons ─────────── */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-10 flex items-center gap-4">
        <span
          className="uppercase tracking-widest"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-semibold)",
            color: "rgba(241,240,235,0.5)",
            letterSpacing: "var(--tracking-widest)",
          }}
        >
          Social
        </span>
        {/* Short line between label and icons */}
        <div
          style={{ width: "2rem", height: "1px", backgroundColor: "rgba(241,240,235,0.3)" }}
        />
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors duration-200"
              style={{ color: "rgba(241,240,235,0.6)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,240,235,0.6)")
              }
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}