"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// ─── useInView hook ───────────────────────────────────────────
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

// ─── Testimonial data ─────────────────────────────────────────
const TESTIMONIALS = [
  {
    id:     1,
    name:   "John Silva",
    role:   "Member since 2022",
    avatar: "/testimonials/client-1.jpg",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    stars:  5,
  },
  {
    id:     2,
    name:   "Sarah Perera",
    role:   "Personal Training client",
    avatar: "/testimonials/client-2.jpg",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    stars:  5,
  },
  {
    id:     3,
    name:   "Roshan De Mel",
    role:   "Strength program member",
    avatar: "/testimonials/client-3.jpg",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    stars:  5,
  },
];

// ─── Star icon ────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#D5A310"
      style={{ width: "1.4rem", height: "1.4rem" }}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─── Arrow button ─────────────────────────────────────────────
function ArrowBtn({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}
      style={{
        background:  "transparent",
        border:      "none",
        cursor:      "pointer",
        padding:     "0.5rem",
        color:       hov ? "#b8880d" : "#D5A310",
        transition:  "color 0.2s, transform 0.2s",
        transform:   hov ? "scale(1.15)" : "scale(1)",
        flexShrink:  0,
      }}
    >
      {direction === "left" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
          style={{ width: "1.75rem", height: "1.75rem" }}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
          style={{ width: "1.75rem", height: "1.75rem" }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
export default function TestimonialSection({ id }: { id: string }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: sectionRef, inView } = useInView(0.1);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 250);
  };

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        // Responds to dark/light: dark → #040304, light → #F1F0EB
        backgroundColor: "var(--bg-section-dark)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
        position:        "relative",
      }}
    >
      {/*
        In light mode --bg-section-dark is still #040304 (always dark).
        But from your screenshot the testimonial bg in light mode is cream.
        So we use --bg-page which correctly flips per theme.
      */}
      <style>{`
        #${id} {
          background-color: var(--bg-page) !important;
        }
      `}</style>

      <div
        style={{
          maxWidth:  "860px",
          margin:    "0 auto",
          padding:   "0 2rem",
          textAlign: "center",
        }}
        className={inView ? "animate-fade-up" : "opacity-0"}
      >

        {/* ── Section label: "Testimonial" + gold underline ── */}
        <div style={{ marginBottom: "1rem" }}>
          <p
            style={{
              display:       "inline-block",
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-label)",
              fontWeight:    "var(--weight-semibold)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)",
              // Uses text-primary token: cream in dark, black in light
              color:         "var(--text-primary)",
              paddingBottom: "0.4rem",
              // Gold underline via border-bottom
              borderBottom:  "2px solid #D5A310",
            }}
          >
            Testimonial
          </p>
        </div>

        {/* ── Heading: OUR white/dark + CLIENTS SAY gold ── */}
        <h2
          style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-h1)",
            fontWeight:    "var(--weight-bold)",
            textTransform: "uppercase",
            lineHeight:    "var(--leading-tight)",
            color:         "var(--text-primary)",
            marginBottom:  "3rem",
          }}
        >
          Our{" "}
          <span style={{ color: "#D5A310" }}>Clients Say</span>
        </h2>

        {/* ── Slider row: arrow · avatar · arrow ─────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "2rem",
            marginBottom:   "2rem",
          }}
        >
          <ArrowBtn direction="left"  onClick={prev} />

          {/* Circular avatar */}
          <div
            style={{
              position:     "relative",
              width:        "80px",
              height:       "80px",
              borderRadius: "50%",
              overflow:     "hidden",
              border:       "3px solid #D5A310",
              flexShrink:   0,
              opacity:      animating ? 0 : 1,
              transform:    animating ? "scale(0.9)" : "scale(1)",
              transition:   "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="80px"
            />
          </div>

          <ArrowBtn direction="right" onClick={next} />
        </div>

        {/* Name + role */}
        <p
          style={{
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-sm)",
            fontWeight:    "var(--weight-semibold)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color:         "#D5A310",
            marginBottom:  "0.25rem",
            opacity:       animating ? 0 : 1,
            transition:    "opacity 0.25s ease",
          }}
        >
          {t.name}
        </p>
        <p
          style={{
            fontFamily:  "var(--font-primary)",
            fontSize:    "var(--text-xs)",
            color:       "var(--text-muted)",
            marginBottom:"1.5rem",
            opacity:     animating ? 0 : 1,
            transition:  "opacity 0.25s ease",
          }}
        >
          {t.role}
        </p>

        {/* ── Quote text ─────────────────────────────────── */}
        <p
          style={{
            fontFamily:   "var(--font-primary)",
            fontSize:     "var(--text-sm)",
            fontWeight:   "var(--weight-regular)",
            lineHeight:   "var(--leading-normal)",
            color:        "var(--text-muted)",
            maxWidth:     "680px",
            margin:       "0 auto 2rem",
            opacity:      animating ? 0 : 1,
            transform:    animating ? "translateY(8px)" : "translateY(0)",
            transition:   "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {t.quote}
        </p>

        {/* ── 5 gold stars ──────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "0.35rem",
            opacity:        animating ? 0 : 1,
            transition:     "opacity 0.25s ease",
          }}
        >
          {Array.from({ length: t.stars }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* ── Dot indicators ────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "0.5rem",
            marginTop:      "2rem",
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width:           i === current ? "1.5rem" : "0.5rem",
                height:          "0.5rem",
                borderRadius:    "999px",
                backgroundColor: i === current ? "#D5A310" : "rgba(213,163,16,0.3)",
                border:          "none",
                cursor:          "pointer",
                padding:         0,
                transition:      "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}