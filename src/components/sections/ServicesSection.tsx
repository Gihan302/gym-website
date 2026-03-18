"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const SERVICES = [
  {
    id:    "personal-training",
    title: "Personal Training",
    image: "/services/personal-training.jpg",
    alt:   "Personal Training session",
  },
  {
    id:    "strength-exercises",
    title: "Strength Excercises",
    image: "/services/strength.jpg",
    alt:   "Strength exercises with barbell",
  },
  {
    id:    "cardio-training",
    title: "Cardio Training",
    image: "/services/cardio.jpg",
    alt:   "Cardio training with battle ropes",
  },
];

export default function ServicesSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section
      id={id}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBlock: "var(--section-padding)",
      }}
    >
      {/* ── Full-section background image ────────── */}
      {/*
        Always shows bg gym image regardless of theme.
        Overlay opacity differs: darker in dark mode, lighter in light mode.
      */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/services/services-bg.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          aria-hidden="true"
        />
        {/* Dark overlay — dark mode: very dark, light mode: medium dark */}
        {/* We use two layers so CSS variables can control opacity */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            // Base always-dark layer
            backgroundColor: "rgba(4,3,4,0.72)",
          }}
          className="dark-overlay"
        />
        {/* Additional light-mode softener */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(241,240,235,0.18)",
          }}
          className="light-overlay"
        />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* ── Section heading ───────────────────── */}
        <div
          ref={headRef}
          className={headIn ? "animate-fade-up" : "opacity-0"}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          {/* "What we do" small label */}
          <p
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-label)",
              fontWeight:    "var(--weight-medium)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)",
              color:         "#F1F0EB",
              marginBottom:  "0.5rem",
            }}
          >
            What we do
          </p>

          {/* "OUR SERVICES" — OUR in cream, SERVICES in gold */}
          <h2
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-h1)",
              fontWeight:    "var(--weight-bold)",
              textTransform: "uppercase",
              lineHeight:    "var(--leading-tight)",
              color:         "#F1F0EB",
              margin:        0,
            }}
          >
            Our{" "}
            <span style={{ color: "#D5A310" }}>Services</span>
          </h2>
        </div>

        {/* ── 3 Service cards ───────────────────── */}
        <div
          ref={gridRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 "1.25rem",
          }}
          className="max-md:grid-cols-1 max-lg:grid-cols-2"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={gridIn} />
          ))}
        </div>
      </div>

      {/* Inline styles for overlay behaviour */}
      <style>{`
        /* Dark mode: keep it very dark */
        .dark .light-overlay { opacity: 0; }
        .dark .dark-overlay  { opacity: 1; }
        /* Light mode: slightly lighter */
        :root .light-overlay { opacity: 1; }
        :root .dark-overlay  { opacity: 1; }
      `}</style>
    </section>
  );
}

// ─── Individual service card ──────────────────────────────────
function ServiceCard({
  service,
  index,
  inView,
}: {
  service: { id: string; title: string; image: string; alt: string };
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={inView ? "animate-fade-up" : "opacity-0"}
      style={{
        position:   "relative",
        overflow:   "hidden",
        cursor:     "pointer",
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Card image */}
      <div style={{ position: "relative", aspectRatio: "4/3" }}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit:  "cover",
            transition: "transform 0.5s ease",
            transform:  hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Bottom gradient so title is always readable */}
        <div
          style={{
            position: "absolute",
            inset:    0,
            background:
              "linear-gradient(to top, rgba(4,3,4,0.85) 0%, rgba(4,3,4,0.2) 50%, transparent 100%)",
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Gold left border accent on hover */}
        <div
          style={{
            position:        "absolute",
            left:            0,
            top:             0,
            bottom:          0,
            width:           "3px",
            backgroundColor: "#D5A310",
            transform:       hovered ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition:      "transform 0.3s ease",
          }}
        />
      </div>

      {/* Title bar below image */}
      <div
        style={{
          padding:         "0.9rem 1rem",
          backgroundColor: hovered ? "#D5A310" : "rgba(4,3,4,0.85)",
          transition:      "background-color 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-sm)",
            fontWeight:    "var(--weight-semibold)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color:         hovered ? "#040304" : "#F1F0EB",
            margin:        0,
            transition:    "color 0.3s ease",
            textAlign:     "center",
          }}
        >
          {service.title}
        </p>
      </div>
    </div>
  );
}