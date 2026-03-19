"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "../../lib/utils";

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

// ─── Feature data with image icons and real copy ──────────────
const FEATURES = [
  {
    id:    "equipment",
    image: "/icons/modern-equipment.png",
    alt:   "Modern gym equipment icon",
    title: "Modern Equipment",
    description:
      "Train on the latest commercial-grade machines, free weights, and functional zones. Our facility is updated regularly so you always have the best tools — whether it's strength, cardio, or mobility work.",
  },
  {
    id:    "nutrition",
    image: "/icons/nutrition-plan.png",
    alt:   "Healthy nutrition plan icon",
    title: "Healthy Nutrition Plan",
    description:
      "Our certified nutritionists build personalised meal plans around your body type, goals, and lifestyle. From lean muscle gain to fat loss, your diet is designed to power your performance — not hinder it.",
  },
  {
    id:    "training",
    image: "/icons/training-plan.png",
    alt:   "Professional training plan icon",
    title: "Professional Training Plan",
    description:
      "Every member receives a structured training program tailored to their level and objectives. Our coaches track your progress, adjust your plan weekly, and ensure you're always training with purpose.",
  },
  {
    id:    "unique",
    image: "/icons/unique-needs.png",
    alt:   "Unique to your needs icon",
    title: "Unique to Your Needs",
    description:
      "No two members are alike. We assess your fitness history, preferences, and goals to create a plan that fits your life. Flexible scheduling, adaptive programming, and a coach who actually listens.",
  },
];

// ─── Keyframes injected once ──────────────────────────────────
const WHY_STYLES = `
  @keyframes whyCardIn {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes iconPop {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.12); }
    100% { transform: scale(1); }
  }
  .why-card-in {
    animation: whyCardIn 0.6s cubic-bezier(0.34,1.3,0.64,1) both;
  }
  .why-icon-wrap:hover .why-icon-img {
    animation: iconPop 0.4s ease;
  }
`;

// ─────────────────────────────────────────────────────────────
export default function WhyChooseUsSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section
      id={id}
      style={{
        backgroundColor: "var(--bg-page)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
      }}
    >
      <style>{WHY_STYLES}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.25rem" }}>

        {/* ── Heading ───────────────────────────── */}
        <div
          ref={headRef}
          style={{
            textAlign:   "center",
            marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            opacity:      headIn ? 1 : 0,
            transform:    headIn ? "translateY(0)" : "translateY(24px)",
            transition:   "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p style={{
            display:        "inline-block",
            fontFamily:     "var(--font-primary)",
            fontSize:       "var(--text-label)",
            fontWeight:     "var(--weight-semibold)",
            textTransform:  "uppercase",
            letterSpacing:  "var(--tracking-widest)",
            color:          "var(--text-primary)",
            paddingBottom:  "0.35rem",
            borderBottom:   "2px solid var(--gold)",
            marginBottom:   "1.25rem",
          }}>
            Why Choose Us?
          </p>

          <h2 style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "clamp(1.6rem, 5vw, 3.5rem)",
            fontWeight:    "var(--weight-bold)",
            textTransform: "uppercase",
            lineHeight:    "var(--leading-tight)",
            color:         "var(--text-primary)",
            margin:        0,
          }}>
            Push Your{" "}
            <span style={{ color: "var(--gold)" }}>Limits Forward</span>
          </h2>
        </div>

        {/* ── Feature grid ──────────────────────── */}
        <div
          ref={gridRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "clamp(1.5rem, 3vw, 2.5rem)",
          }}
          className="max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.id}
              feature={f}
              index={i}
              inView={gridIn}
            />
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
  const [hov, setHov] = useState(false);

  return (
    <div
      className={inView ? "why-card-in" : ""}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        textAlign:       "center",
        gap:             "1rem",
        padding:         "clamp(1.25rem, 3vw, 2rem) 1rem",
        borderRadius:    "4px",
        // Subtle card bg on hover
        backgroundColor: hov ? "rgba(213,163,16,0.05)" : "transparent",
        border:          `1px solid ${hov ? "rgba(213,163,16,0.2)" : "transparent"}`,
        transition:      "background-color 0.3s ease, border-color 0.3s ease",
        animationDelay:  inView ? `${index * 120}ms` : "0ms",
        opacity:         inView ? undefined : 0,
        cursor:          "default",
      }}
    >
      {/* ── Icon image inside circle ────────────── */}
      <div
        className="why-icon-wrap"
        style={{
          width:           "clamp(4.5rem, 8vw, 6rem)",
          height:          "clamp(4.5rem, 8vw, 6rem)",
          borderRadius:    "50%",
          border:          `1.5px solid ${hov ? "var(--gold)" : "var(--border-default)"}`,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          backgroundColor: "var(--bg-surface)",
          flexShrink:      0,
          transition:      "border-color 0.3s ease, background-color 0.3s ease",
          overflow:        "hidden",
          position:        "relative",
        }}
      >
        <Image
          src={getAssetPath(feature.image)}
          alt={feature.alt}
          width={44}
          height={44}
          className="why-icon-img"
          style={{
            objectFit:  "contain",
            width:       "clamp(2rem, 4vw, 2.75rem)",
            height:      "clamp(2rem, 4vw, 2.75rem)",
            // In dark mode keep natural colors, light mode apply slight darkening
            filter:     "var(--icon-filter, none)",
          }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color:         "var(--gold)",
        margin:        0,
        lineHeight:    "var(--leading-snug)",
      }}>
        {feature.title}
      </h3>

      {/* Divider */}
      <div style={{
        width:           "2rem",
        height:          "2px",
        backgroundColor: "var(--gold)",
        opacity:         hov ? 1 : 0.4,
        transition:      "opacity 0.3s ease",
        flexShrink:      0,
      }} />

      {/* Description */}
      <p style={{
        fontFamily:  "var(--font-primary)",
        fontSize:    "var(--text-xs)",
        fontWeight:  "var(--weight-regular)",
        lineHeight:  "var(--leading-normal)",
        color:       "var(--text-muted)",
        margin:      0,
      }}>
        {feature.description}
      </p>
    </div>
  );
}