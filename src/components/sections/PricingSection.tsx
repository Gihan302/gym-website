"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const PLANS = [
  {
    id:          "beginners",
    label:       "Our Pricing",
    price:       "RS. 6500/=",
    tier:        "Beginners",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    featured:    false,
  },
  {
    id:          "basic",
    label:       "Our Pricing",
    price:       "RS. 8500/=",
    tier:        "Basic",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    featured:    true,   // middle card — slightly more prominent
  },
  {
    id:          "advanced",
    label:       "Our Pricing",
    price:       "RS. 10500/=",
    tier:        "Advanced",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    featured:    false,
  },
];

export default function PricingSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.05);
  const { theme }    = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Overlay: darker in dark mode, slightly lighter in light mode
  const overlayOpacity = mounted && theme === "light" ? "0.60" : "0.78";

  return (
    <section
      id={id}
      style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-padding)" }}
    >
      {/* ── BG image + overlay ──────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/pricing/pricing-bg.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          aria-hidden="true"
        />
        <div
          style={{
            position:        "absolute",
            inset:           0,
            backgroundColor: `rgba(4,3,4,${overlayOpacity})`,
            transition:      "background-color 0.4s ease",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Heading */}
        <div
          ref={headRef}
          className={headIn ? "animate-fade-up" : "opacity-0"}
          style={{
            textAlign: "center", marginBottom: "3.5rem",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontFamily: "var(--font-primary)", fontSize: "var(--text-label)",
              fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)", color: "#F1F0EB",
              paddingBottom: "0.35rem", borderBottom: "2px solid #D5A310", marginBottom: "1rem",
            }}
          >
            Our Pricing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-primary)", fontSize: "var(--text-h1)",
              fontWeight: "var(--weight-bold)", textTransform: "uppercase",
              lineHeight: "var(--leading-tight)", color: "#F1F0EB", margin: 0,
            }}
          >
            Choose Your{" "}
            <span style={{ color: "#D5A310" }}>Pricing Plan</span>
          </h2>
        </div>

        {/* 3 cards */}
        <div
          ref={gridRef}
          style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem",
            opacity: gridIn ? 1 : 0, transition: "opacity 0.7s ease 0.1s",
          }}
          className="max-md:grid-cols-1"
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} inView={gridIn} />
          ))}
        </div>

      </div>
    </section>
  );
}

function PricingCard({
  plan, index, inView,
}: {
  plan: (typeof PLANS)[0]; index: number; inView: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={inView ? "animate-fade-up" : "opacity-0"}
      style={{
        // Dark semi-transparent card bg — same in both modes (always on bg image)
        backgroundColor: hov ? "rgba(213,163,16,0.12)" : "rgba(4,3,4,0.72)",
        border:          `1px solid ${hov || plan.featured ? "#D5A310" : "rgba(241,240,235,0.12)"}`,
        padding:         "2.5rem 2rem",
        cursor:          "default",
        animationDelay:  `${index * 150}ms`,
        backdropFilter:  "blur(4px)",
      }}
    >
      {/* "Our Pricing" label */}
      <p
        style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)", color: "#F1F0EB",
          marginBottom: "1.25rem",
        }}
      >
        {plan.label}
      </p>

      {/* Price */}
      <p
        style={{
          fontFamily: "var(--font-primary)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
          fontWeight: "var(--weight-bold)", textTransform: "uppercase",
          color: "#F1F0EB", marginBottom: "0.5rem", lineHeight: 1.1,
        }}
      >
        {plan.price}
      </p>

      {/* Tier name — gold */}
      <p
        style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-base)",
          fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)", color: "#D5A310",
          marginBottom: "1.5rem",
        }}
      >
        {plan.tier}
      </p>

      {/* Thin divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(241,240,235,0.1)", marginBottom: "1.5rem" }} />

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-regular)", lineHeight: "var(--leading-normal)",
          color: "rgba(241,240,235,0.6)",
        }}
      >
        {plan.description}
      </p>
    </div>
  );
}