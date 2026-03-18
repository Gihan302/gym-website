"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Scroll-triggered fade-up hook
// ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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
export default function AboutSection({ id }: { id: string }) {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1);
  const { ref: rightRef, inView: rightIn } = useInView(0.1);

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--charcoal)",   // #2C2C2C dark bg
        paddingBlock: "var(--section-padding)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Image with gold offset block ──── */}
          <div
            ref={leftRef}
            className="relative"
            style={{
              opacity: leftIn ? 1 : 0,
              transform: leftIn ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Gold decorative rectangle — behind and offset top-left */}
            <div
              className="absolute"
              style={{
                top: "-1.5rem",
                left: "-1.5rem",
                width: "75%",
                height: "75%",
                backgroundColor: "var(--gold)",
                zIndex: 0,
              }}
            />

            {/* Main gym image — overlaps the gold block */}
            <div
              className="relative z-10"
              style={{
                // Offset right and down to expose gold block top-left
                marginLeft: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              <Image
                src="/About us image.jpg"
                alt="Training and fitness motivation at our gym"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* ── RIGHT: Text content ───────────────── */}
          <div
            ref={rightRef}
            style={{
              opacity: rightIn ? 1 : 0,
              transform: rightIn ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >

            {/* Section label: gold rule + "ABOUT US" */}
            <div className="flex items-center gap-4 mb-4">
              <div
                style={{
                  width: "2.5rem",
                  height: "3px",
                  backgroundColor: "var(--gold)",
                  flexShrink: 0,
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--weight-semibold)",
                  letterSpacing: "var(--tracking-widest)",
                  color: "var(--cream)",
                }}
              >
                About Us
              </span>
            </div>

            {/* Main heading — white + gold accent word */}
            <h2
              className="uppercase mb-6"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-h2)",
                fontWeight: "var(--weight-bold)",
                lineHeight: "var(--leading-tight)",
                color: "var(--cream)",
              }}
            >
              We Provide Training And Best{" "}
              <span style={{ color: "var(--gold)" }}>
                Fitness Motivations
              </span>
            </h2>

            {/* Divider line */}
            <div
              className="mb-6"
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "rgba(241,240,235,0.08)",
              }}
            />

            {/* Body text */}
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--weight-regular)",
                lineHeight: "var(--leading-normal)",
                color: "rgba(241,240,235,0.65)",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Optional stats row — visually matches gym design language */}
            <div className="flex gap-10 mt-10">
              {[
                { value: "500+", label: "Members" },
                { value: "20+",  label: "Trainers" },
                { value: "15+",  label: "Programs" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-h3)",
                      fontWeight: "var(--weight-bold)",
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="uppercase mt-1"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--weight-medium)",
                      letterSpacing: "var(--tracking-wider)",
                      color: "rgba(241,240,235,0.45)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}