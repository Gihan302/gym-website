"use client";

import { useEffect, useRef, useState } from "react";

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

// ─── SVG Icons matching Figma exactly ────────────────────────
const BikeIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" style={{ width: "2.8rem", height: "2.8rem" }} aria-hidden="true">
    <circle cx="16" cy="44" r="10" fill="none" stroke="currentColor" strokeWidth="3"/>
    <circle cx="48" cy="44" r="10" fill="none" stroke="currentColor" strokeWidth="3"/>
    <path d="M16 44l10-18h12l8 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M28 26l4-10h6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="16" cy="44" r="3" />
    <circle cx="48" cy="44" r="3" />
  </svg>
);

const NutritionIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" style={{ width: "2.8rem", height: "2.8rem" }} aria-hidden="true">
    <path d="M32 8C20 8 12 16 12 28c0 14 20 30 20 30s20-16 20-30C52 16 44 8 32 8z" fill="none" stroke="currentColor" strokeWidth="3"/>
    <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">B</text>
    <circle cx="40" cy="22" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="40" y="25" textAnchor="middle" fontSize="8" fill="currentColor">A</text>
  </svg>
);

const DumbbellIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" style={{ width: "2.8rem", height: "2.8rem" }} aria-hidden="true">
    <rect x="4"  y="26" width="8"  height="12" rx="2"/>
    <rect x="4"  y="22" width="8"  height="4"  rx="1"/>
    <rect x="4"  y="38" width="8"  height="4"  rx="1"/>
    <rect x="52" y="26" width="8"  height="12" rx="2"/>
    <rect x="52" y="22" width="8"  height="4"  rx="1"/>
    <rect x="52" y="38" width="8"  height="4"  rx="1"/>
    <rect x="12" y="30" width="40" height="4"  rx="2"/>
    <rect x="20" y="24" width="6"  height="16" rx="2"/>
    <rect x="38" y="24" width="6"  height="16" rx="2"/>
  </svg>
);

const HeartPulseIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: "2.8rem", height: "2.8rem" }} aria-hidden="true">
    <path d="M32 52C32 52 8 36 8 20a12 12 0 0 1 24 0 12 12 0 0 1 24 0c0 16-24 32-24 32z" />
    <polyline points="18,32 24,24 30,36 36,28 42,32" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Feature cards data ───────────────────────────────────────
const FEATURES = [
  {
    id:          "equipment",
    icon:        <BikeIcon />,
    title:       "Modern equipment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id:          "nutrition",
    icon:        <NutritionIcon />,
    title:       "Healthy nutrition plan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id:          "training",
    icon:        <DumbbellIcon />,
    title:       "Proffesonal training plan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id:          "unique",
    icon:        <HeartPulseIcon />,
    title:       "Unique to your needs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

// ─────────────────────────────────────────────────────────────
export default function WhyChooseUsSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section
      id={id}
      style={{
        // Fully theme-aware bg — dark mode: #040304, light mode: #F1F0EB
        backgroundColor: "var(--bg-page)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin:   "0 auto",
          padding:  "0 2rem",
        }}
      >

        {/* ── Heading block ────────────────────── */}
        <div
          ref={headRef}
          className={headIn ? "animate-fade-up" : "opacity-0"}
          style={{
            textAlign:   "center",
            marginBottom:"3.5rem",
          }}
        >
          {/* "Why chose us?" label + gold underline */}
          <p
            style={{
              display:       "inline-block",
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-label)",
              fontWeight:    "var(--weight-semibold)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)",
              color:         "var(--text-primary)",
              paddingBottom: "0.35rem",
              borderBottom:  "2px solid #D5A310",
              marginBottom:  "1.25rem",
            }}
          >
            Why chose us?
          </p>

          {/* "PUSH YOUR LIMITS FORWARD" */}
          <h2
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-h1)",
              fontWeight:    "var(--weight-bold)",
              textTransform: "uppercase",
              lineHeight:    "var(--leading-tight)",
              color:         "var(--text-primary)",
              margin:        0,
            }}
          >
            Push Your{" "}
            <span style={{ color: "#D5A310" }}>Limits Forward</span>
          </h2>
        </div>

        {/* ── 4-column feature grid ────────────── */}
        <div
          ref={gridRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "2.5rem",
          }}
          className="max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} inView={gridIn} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Feature card ─────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: (typeof FEATURES)[0];
  index:   number;
  inView:  boolean;
}) {
  return (
    <div
      className={inView ? "animate-fade-up" : "opacity-0"}
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        textAlign:     "center",
        gap:           "1rem",
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Circular icon container */}
      <div
        style={{
          width:           "5.5rem",
          height:          "5.5rem",
          borderRadius:    "50%",
          // Border color adapts: subtle in both modes
          border:          "1.5px solid var(--border-default)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          // Bg adapts to theme
          backgroundColor: "var(--bg-surface)",
          // Icon color adapts to theme
          color:           "var(--text-primary)",
          flexShrink:      0,
        }}
      >
        {feature.icon}
      </div>

      {/* Feature title — gold, uppercase */}
      <h3
        style={{
          fontFamily:    "var(--font-primary)",
          fontSize:      "var(--text-sm)",
          fontWeight:    "var(--weight-semibold)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color:         "#D5A310",
          margin:        0,
          lineHeight:    "var(--leading-snug)",
        }}
      >
        {feature.title}
      </h3>

      {/* Description — theme-aware muted text */}
      <p
        style={{
          fontFamily:  "var(--font-primary)",
          fontSize:    "var(--text-xs)",
          fontWeight:  "var(--weight-regular)",
          lineHeight:  "var(--leading-normal)",
          color:       "var(--text-muted)",
          margin:      0,
        }}
      >
        {feature.description}
      </p>
    </div>
  );
}