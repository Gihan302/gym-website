"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Scroll-triggered fade hook
// ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────
// AboutSection
//
// Dark mode  → bg: #2C2C2C (charcoal), text: #F1F0EB (cream)
// Light mode → bg: #F1F0EB (cream),    text: #040304 (black)
//
// Both modes: gold image offset block, gold label, gold accent
// words in headline. Matches screenshot exactly.
// ─────────────────────────────────────────────────────────────
export default function AboutSection({ id }: { id: string }) {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1);
  const { ref: rightRef, inView: rightIn } = useInView(0.1);

  return (
    <section
      id={id}
      style={{
        // Uses CSS variable so it responds to dark/light toggle
        backgroundColor: "var(--bg-page)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
        position:        "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin:   "0 auto",
          padding:  "0 2rem",
        }}
      >
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap:                 "5rem",
            alignItems:          "center",
          }}
          className="max-lg:grid-cols-1 max-lg:gap-12"
        >

          {/* ━━━ LEFT: Image with gold rectangle offset ━━━ */}
          <div
            ref={leftRef}
            className={leftIn ? "animate-fade-left" : "opacity-0"}
            style={{
              position:   "relative",
              // Extra padding bottom-right so gold block is visible
              paddingBottom: "1.5rem",
              paddingRight:  "1.5rem",
            }}
          >
            {/* Gold solid block — behind image, offset bottom-right */}
            {/*
              Matches screenshot: gold rectangle peeks out from
              behind image at bottom-right corner.
              In the Figma it's a solid gold fill (not outline).
            */}
            <div
              style={{
                position:        "absolute",
                bottom:          0,
                right:           0,
                // Size slightly smaller than image so it peeks correctly
                width:           "85%",
                height:          "85%",
                backgroundColor: "#D5A310",
                zIndex:          0,
              }}
            />

            {/* Main gym image — sits above gold block */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <Image
                src="/About us image.jpg"
                alt="Training and fitness motivation at our gym"
                width={600}
                height={520}
                style={{
                  width:      "100%",
                  height:     "auto",
                  objectFit:  "cover",
                  display:    "block",
                }}
              />
            </div>
          </div>

          {/* ━━━ RIGHT: Text content ━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div
            ref={rightRef}
            className={rightIn ? "animate-fade-right" : "opacity-0"}
            style={{
              animationDelay: "200ms",
            }}
          >

            {/* Section label row: gold line + "ABOUT US" */}
            <div
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width:           "2.5rem",
                  height:          "2px",
                  backgroundColor: "#D5A310",
                  flexShrink:      0,
                }}
              />
              <span
                style={{
                  fontFamily:    "var(--font-primary)",
                  fontSize:      "var(--text-label)",
                  fontWeight:    "var(--weight-semibold)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-widest)",
                  // Uses token so it adapts: gold in dark, gold in light (accent always gold)
                  color:         "var(--text-accent)",
                }}
              >
                About Us
              </span>
            </div>

            {/* Main heading */}
            {/*
              Dark mode:  "WE PROVIDE TRAINING AND BEST" in cream,
                          "FITNESS MOTIVATIONS" in gold
              Light mode: "WE PROVIDE TRAINING AND BEST" in near-black,
                          "FITNESS MOTIVATIONS" in gold
              → var(--text-primary) handles both automatically
            */}
            <h2
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-h2)",
                fontWeight:    "var(--weight-bold)",
                lineHeight:    "var(--leading-tight)",
                textTransform: "uppercase",
                color:         "var(--text-primary)",   // cream in dark / black in light
                marginBottom:  "1.5rem",
              }}
            >
              We Provide Training And Best{" "}
              <span style={{ color: "#D5A310" }}>
                Fitness Motivations
              </span>
            </h2>

            {/* Thin divider line — subtle in both modes */}
            <div
              style={{
                width:           "100%",
                height:          "1px",
                backgroundColor: "var(--border-subtle)",
                marginBottom:    "1.5rem",
              }}
            />

            {/* Body text */}
            <p
              style={{
                fontFamily:  "var(--font-primary)",
                fontSize:    "var(--text-sm)",
                fontWeight:  "var(--weight-regular)",
                lineHeight:  "var(--leading-normal)",
                // text-muted token:
                // dark mode  → rgba(241,240,235,0.55)
                // light mode → var(--charcoal) = #2C2C2C
                color:       "var(--text-muted)",
                marginBottom:"0",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}