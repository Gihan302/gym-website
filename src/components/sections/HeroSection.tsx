"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getAssetPath } from "../../lib/utils";

// ─── Social icons ─────────────────────────────────────────────
const FacebookIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const TwitterIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1rem", height: "1rem" }} aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
const MailIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "1rem", height: "1rem" }} aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>;

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com",    icon: <FacebookIcon />  },
  { label: "Instagram", href: "https://instagram.com",   icon: <InstagramIcon /> },
  { label: "Twitter",   href: "https://twitter.com",     icon: <TwitterIcon />   },
  { label: "Email",     href: "mailto:info@fitness.com", icon: <MailIcon />      },
];

// ─────────────────────────────────────────────────────────────
// Headline broken into words with their line grouping.
// Each word gets an index — the animated highlight cycles
// through these indices one by one.
// ─────────────────────────────────────────────────────────────
const HEADLINE_LINES = [
  ["Reach", "Your"],
  ["Limits", "And", "Get", "To"],
  ["The", "Next", "Level"],
];

// Flat list of all words in order for cycling
const ALL_WORDS = HEADLINE_LINES.flat();
// Total word count
const WORD_COUNT = ALL_WORDS.length;

// Injected keyframes for the glow pulse on the active word
const HERO_STYLES = `
  @keyframes wordPulse {
    0%   { opacity: 0.7; text-shadow: 0 0 0px #D5A310; }
    50%  { opacity: 1;   text-shadow: 0 0 18px rgba(213,163,16,0.45); }
    100% { opacity: 0.7; text-shadow: 0 0 0px #D5A310; }
  }
  .hero-word-active {
    animation: wordPulse 0.7s ease-in-out forwards;
  }
`;

// ─────────────────────────────────────────────────────────────
// AnimatedHeadline
// ─────────────────────────────────────────────────────────────
function AnimatedHeadline({
  textColor,
  activeIndex,
}: {
  textColor: string;
  activeIndex: number;
}) {
  // Track a "leaving" word briefly so we can fade it back
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

  useEffect(() => {
    setLeavingIndex(null);
  }, [activeIndex]);

  let globalIdx = 0;

  return (
    <h1
      style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "clamp(2.5rem, 8vw, 5rem)",
        fontWeight:    "var(--weight-bold)",
        lineHeight:    "var(--leading-tight)",
        textTransform: "uppercase",
        letterSpacing: "-0.01em",
        color:         textColor,
        marginBottom:  "1.5rem",
        transition:    "color 0.3s ease",
      }}
    >
      {HEADLINE_LINES.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.map((word, wi) => {
            const idx = globalIdx++;
            const isActive = idx === activeIndex;

            return (
              <span key={wi}>
                <span
                  className={isActive ? "hero-word-active" : ""}
                  style={{
                    color:          isActive ? "#D5A310" : textColor,
                    transition:     "color 0.4s ease",
                    display:        "inline-block",
                    // Slight scale up on active word
                    transform:      isActive ? "scaleX(1.04)" : "scaleX(1)",
                    transformOrigin:"left center",
                    // Also transition the transform
                    transitionProperty: "color, transform",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "ease",
                  }}
                >
                  {word}
                </span>
                {/* Space between words (not after last word in line) */}
                {wi < line.length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function HeroSection({ id }: { id: string }) {
  const { theme }  = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  // Cycle the active word index every 600ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % WORD_COUNT);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const isDark         = mounted ? theme === "dark" : true;
  const bgMain         = isDark ? "#040304" : "#F1F0EB";
  const textColor      = isDark ? "#F1F0EB" : "#040304";
  const mutedTextColor = isDark ? "rgba(241,240,235,0.75)" : "rgba(4,3,4,0.7)";

  return (
    <section
      id={id}
      style={{
        position:        "relative",
        minHeight:       "100vh",
        display:         "flex",
        alignItems:      "center",
        overflow:        "hidden",
        backgroundColor: bgMain,
        transition:      "background-color 0.3s ease",
      }}
    >
      {/* Inject keyframes */}
      <style>{HERO_STYLES}</style>

      {/* ── Mobile bg image ──────────────────────── */}
      <div className="block md:hidden" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={getAssetPath("/hero-image.jpg")}
          alt="Fitness athlete"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: isDark ? "brightness(0.35) contrast(1.05)" : "brightness(0.85) contrast(1.05)",
          }}
        />
        {/* Bottom fade on mobile so text is readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: isDark
            ? "linear-gradient(to top, rgba(4,3,4,0.85) 0%, transparent 60%)"
            : "linear-gradient(to top, rgba(241,240,235,0.8) 0%, transparent 60%)",
        }} />
      </div>

      {/* ── Desktop athlete image — right 48% ──────── */}
      <div
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", zIndex: 0 }}
        className="hidden md:block animate-fade-in"
      >
        <Image
          src={getAssetPath("/hero-image.jpg")}
          alt="Fitness athlete"
          fill
          priority
          sizes="48vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: isDark ? "none" : "brightness(1.1) contrast(1.05)",
          }}
        />
        {/* Left fade */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right, ${bgMain} 0%, transparent 40%)`,
          transition: "background 0.3s ease",
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${bgMain} 0%, transparent 20%)`,
          transition: "background 0.3s ease",
        }} />
      </div>

      {/* ── Global directional overlay ─────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: isDark
          ? "linear-gradient(to right, rgba(4,3,4,0.95) 0%, rgba(4,3,4,0.6) 52%, rgba(4,3,4,0) 100%)"
          : "linear-gradient(to right, rgba(241,240,235,0.92) 0%, rgba(241,240,235,0.4) 52%, rgba(241,240,235,0) 100%)",
        transition: "background 0.3s ease",
      }} />

      {/* ── Main content ─────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 2, width: "100%",
        maxWidth: "1280px", margin: "0 auto",
        padding: "clamp(6rem, 15vh, 9rem) 1.5rem 6rem",
      }}>
        <div style={{ maxWidth: "clamp(300px, 100%, 580px)" }} className="md:max-w-[52%]">

          {/* Animated headline */}
          <div className="animate-fade-left" style={{ animationDelay: "100ms" }}>
            <AnimatedHeadline
              textColor={textColor}
              activeIndex={activeWordIndex}
            />
          </div>

          {/* Body text */}
          <p
            className="animate-fade-left"
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "clamp(0.9rem, 2vw, 1.1rem)",
              fontWeight:    "var(--weight-regular)",
              lineHeight:    "var(--leading-normal)",
              color:         mutedTextColor,
              maxWidth:      "460px",
              marginBottom:  "2.5rem",
              animationDelay:"250ms",
              transition:    "color 0.3s ease",
            }}
          >
            Push your boundaries and transform your physique with our world-class
            facilities and expert guidance. Join a community dedicated to excellence
            and results.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-left"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", animationDelay: "400ms" }}
          >
            {/* LEARN MORE */}
            <button
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.85rem 2.2rem",
                background:    "transparent",
                color:         textColor,
                border:        `1.5px solid ${textColor}`,
                cursor:        "pointer",
                transition:    "border-color 0.2s, color 0.2s",
                flex:          "1 1 auto",
                textAlign:     "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#D5A310";
                el.style.color       = "#D5A310";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = textColor;
                el.style.color       = textColor;
              }}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </button>

            {/* JOIN NOW */}
            <button
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-sm)",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                padding:       "0.85rem 2.2rem",
                background:    "#D5A310",
                color:         "#040304",
                border:        "1.5px solid #D5A310",
                cursor:        "pointer",
                transition:    "background 0.2s, border-color 0.2s",
                flex:          "1 1 auto",
                textAlign:     "center",
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
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join Now
            </button>
          </div>

        </div>
      </div>

      {/* ── Gold decorative line bottom-left ───────── */}
      <div
        className="animate-fade-up"
        style={{
          position: "absolute", bottom: "2.5rem",
          left: "clamp(1rem, 4vw, 4rem)", zIndex: 2,
          width: "3.5rem", height: "3px",
          backgroundColor: "#D5A310",
          animationDelay: "600ms",
        }}
      />

      {/* ── Social icons bottom-right ───────────────── */}
      <div
        className="animate-fade-up"
        style={{
          position: "absolute", bottom: "2.4rem",
          right: "clamp(1rem, 3vw, 2rem)", zIndex: 2,
          display: "flex", alignItems: "center", gap: "0.75rem",
          animationDelay: "600ms",
        }}
      >
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            color: isDark ? "rgba(241,240,235,0.4)" : "rgba(4,3,4,0.4)",
            transition: "color 0.3s ease",
          }}
        >
          Social
        </span>
        <div
          className="hidden sm:block"
          style={{
            width: "1.75rem", height: "1px",
            backgroundColor: isDark ? "rgba(241,240,235,0.2)" : "rgba(4,3,4,0.2)",
            transition: "background-color 0.3s ease",
          }}
        />
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{
              color: isDark ? "rgba(241,240,235,0.5)" : "rgba(4,3,4,0.5)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#D5A310")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(241,240,235,0.5)" : "rgba(4,3,4,0.5)")}
          >
            {s.icon}
          </a>
        ))}
      </div>

    </section>
  );
}