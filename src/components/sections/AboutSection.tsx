"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// useInView hook
// ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────
// Slides data
// image    — your actual image path in /public
// imageAlt — accessibility label
// label    — small gold label above heading
// heading  — main bold headline (can include JSX via React.ReactNode)
// body     — paragraph text
// stats    — optional 3 stats shown below body
// layout   — "image-left" | "image-right" — alternates each slide
// ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id:      "training",
    image:   "/about/about-training.jpg",
    imageAlt:"Athletes training hard with weights",
    label:   "About Us",
    heading: (
      <>
        We Provide Training And Best{" "}
        <span style={{ color: "#D5A310" }}>Fitness Motivations</span>
      </>
    ),
    body:
      "At Fitness Sports Center, we believe transformation begins with the right environment. Our certified coaches design personalised programs that push your limits while keeping you safe — whether you're stepping into a gym for the first time or training for your next competition.",
    stats: [
      { value: "500+", label: "Active Members" },
      { value: "20+",  label: "Expert Trainers" },
      { value: "15+",  label: "Programs" },
    ],
    layout: "image-left" as const,
  },
  {
    id:      "equipment",
    image:   "/about/about-equipment.jpg",
    imageAlt:"Modern gym equipment and facilities",
    label:   "Our Facilities",
    heading: (
      <>
        World-Class Equipment For{" "}
        <span style={{ color: "#D5A310" }}>Elite Performance</span>
      </>
    ),
    body:
      "Train on the latest commercial-grade machines, free weights, and functional training zones. Our facility is meticulously maintained and updated regularly so you always have access to the best tools to achieve your goals — cardio, strength, or hybrid training.",
    stats: [
      { value: "10,000", label: "Sq Ft Floor" },
      { value: "200+",   label: "Equipment Pieces" },
      { value: "24/7",   label: "Access Available" },
    ],
    layout: "image-right" as const,
  },
  {
    id:      "community",
    image:   "/about/about-community.jpg",
    imageAlt:"Gym community working out together",
    label:   "Our Community",
    heading: (
      <>
        Join A Community That{" "}
        <span style={{ color: "#D5A310" }}>Lifts You Higher</span>
      </>
    ),
    body:
      "Fitness is a journey best taken together. Our members come from all walks of life — united by one goal: to be better than yesterday. Group classes, challenges, and events keep the energy high and the motivation contagious. When you join us, you gain more than a gym membership — you gain a family.",
    stats: [
      { value: "50+",  label: "Weekly Classes" },
      { value: "12",   label: "Years Established" },
      { value: "98%",  label: "Member Satisfaction" },
    ],
    layout: "image-left" as const,
  },
  {
    id:      "nutrition",
    image:   "/about/about-nutrition.jpg",
    imageAlt:"Nutrition planning and healthy food",
    label:   "Nutrition & Wellness",
    heading: (
      <>
        Fuel Your Body With{" "}
        <span style={{ color: "#D5A310" }}>Expert Nutrition Plans</span>
      </>
    ),
    body:
      "Training hard is only half the equation. Our certified nutritionists work alongside your coach to craft meal plans tailored to your body type, goals, and lifestyle. From lean muscle gain to fat loss, we ensure your diet powers your performance — not hinders it.",
    stats: [
      { value: "100+", label: "Custom Meal Plans" },
      { value: "5",    label: "Nutrition Coaches" },
      { value: "Free", label: "Initial Consultation" },
    ],
    layout: "image-right" as const,
  },
];

// ─────────────────────────────────────────────────────────────
// Dot indicator
// ─────────────────────────────────────────────────────────────
function Dot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to slide"
      style={{
        width:           active ? "2rem" : "0.5rem",
        height:          "0.5rem",
        borderRadius:    "999px",
        backgroundColor: active ? "#D5A310" : "rgba(213,163,16,0.3)",
        border:          "none",
        cursor:          "pointer",
        padding:         0,
        transition:      "width 0.35s ease, background-color 0.35s ease",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Arrow button
// ─────────────────────────────────────────────────────────────
function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      style={{
        width:           "2.75rem",
        height:          "2.75rem",
        borderRadius:    "50%",
        border:          `1.5px solid ${hov ? "#D5A310" : "rgba(213,163,16,0.4)"}`,
        background:      hov ? "rgba(213,163,16,0.12)" : "transparent",
        color:           "#D5A310",
        cursor:          "pointer",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        transition:      "border-color 0.2s, background 0.2s",
        flexShrink:      0,
      }}
    >
      {dir === "prev" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
          style={{ width: "1rem", height: "1rem" }}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
          style={{ width: "1rem", height: "1rem" }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function AboutSection({ id }: { id: string }) {
  const [current,   setCurrent]   = useState(0);
  const [prev,      setPrev]      = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref: sectionRef, inView } = useInView(0.05);

  const slide = SLIDES[current];
  const isImageLeft = slide.layout === "image-left";

  // ── Go to a specific slide ─────────────────────────────────
  const goTo = useCallback((index: number, dir: "next" | "prev" = "next") => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  }, [animating, current]);

  const goNext = useCallback(() =>
    goTo((current + 1) % SLIDES.length, "next"), [current, goTo]);
  const goPrev = useCallback(() =>
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"), [current, goTo]);

  // ── Auto-advance every 5s ──────────────────────────────────
  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView, goNext]);

  // Reset timer on manual nav
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5000);
  };

  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleNext = () => { goNext(); resetTimer(); };
  const handleDot  = (i: number) => {
    goTo(i, i > current ? "next" : "prev");
    resetTimer();
  };

  // ── CSS-in-JS animation state ─────────────────────────────
  // text slides in from right on "next", from left on "prev"
  // image does the opposite
  const textEnter: React.CSSProperties = animating ? {
    opacity:   0,
    transform: direction === "next" ? "translateX(40px)" : "translateX(-40px)",
  } : {
    opacity:   1,
    transform: "translateX(0)",
    transition:"opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
  };

  const imageEnter: React.CSSProperties = animating ? {
    opacity:   0,
    transform: direction === "next" ? "translateX(-30px)" : "translateX(30px)",
  } : {
    opacity:   1,
    transform: "translateX(0)",
    transition:"opacity 0.55s ease, transform 0.55s ease",
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        backgroundColor: "var(--bg-page)",
        overflow:        "hidden",
        position:        "relative",
        // Remove default section padding — we control it below
        paddingBlock:    0,
      }}
    >
      {/* ── Progress bar at top ────────────────────────────── */}
      <div style={{ height: "3px", backgroundColor: "rgba(213,163,16,0.15)", width: "100%" }}>
        <div
          key={current}                        // re-mounts on slide change → restarts animation
          style={{
            height:          "100%",
            backgroundColor: "#D5A310",
            width:           "100%",
            transformOrigin: "left",
            animation:       "progressBar 5s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* ── Slide content ─────────────────────────────────── */}
      <div
        style={{
          maxWidth:  "1280px",
          margin:    "0 auto",
          padding:   "clamp(3rem, 6vw, 6rem) 2rem",
        }}
      >
        <div
          style={{
            display:             "grid",
            // Flip columns based on layout — image-left or image-right
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas:   isImageLeft
              ? '"image text"'
              : '"text image"',
            gap:                 "4rem",
            alignItems:          "center",
            minHeight:           "520px",
          }}
          className="max-lg:grid-cols-1 max-lg:grid-areas-none"
        >

          {/* ━━━ IMAGE COLUMN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div
            style={{
              gridArea: "image",
              position: "relative",
              // Room for the gold block to peek out
              paddingBottom: "1.5rem",
              paddingRight:  isImageLeft ? "1.5rem" : 0,
              paddingLeft:   isImageLeft ? 0 : "1.5rem",
              ...imageEnter,
            }}
          >
            {/* Gold offset block */}
            <div
              style={{
                position:        "absolute",
                bottom:          0,
                right:           isImageLeft ? 0 : "auto",
                left:            isImageLeft ? "auto" : 0,
                width:           "80%",
                height:          "80%",
                backgroundColor: "#D5A310",
                zIndex:          0,
                transition:      "opacity 0.4s ease",
              }}
            />

            {/* Main image */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={620}
                height={520}
                style={{
                  width:     "100%",
                  height:    "auto",
                  objectFit: "cover",
                  display:   "block",
                  // Subtle image reveal
                  transition:"opacity 0.4s ease",
                }}
                priority={current === 0}
              />

              {/* Slide counter badge on image */}
              <div
                style={{
                  position:        "absolute",
                  top:             "1rem",
                  right:           isImageLeft ? "auto" : "1rem",
                  left:            isImageLeft ? "1rem" : "auto",
                  backgroundColor: "#D5A310",
                  color:           "#040304",
                  fontFamily:      "var(--font-primary)",
                  fontSize:        "var(--text-xs)",
                  fontWeight:      "var(--weight-bold)",
                  letterSpacing:   "var(--tracking-wider)",
                  padding:         "0.25rem 0.7rem",
                  textTransform:   "uppercase",
                }}
              >
                {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* ━━━ TEXT COLUMN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={{ gridArea: "text", ...textEnter }}>

            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "2.5rem", height: "2px", backgroundColor: "#D5A310", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily:    "var(--font-primary)",
                  fontSize:      "var(--text-label)",
                  fontWeight:    "var(--weight-semibold)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-widest)",
                  color:         "#D5A310",
                }}
              >
                {slide.label}
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "var(--text-h2)",
                fontWeight:    "var(--weight-bold)",
                lineHeight:    "var(--leading-tight)",
                textTransform: "uppercase",
                color:         "var(--text-primary)",
                marginBottom:  "1.5rem",
              }}
            >
              {slide.heading}
            </h2>

            {/* Divider */}
            <div
              style={{
                width:           "100%",
                height:          "1px",
                backgroundColor: "var(--border-subtle)",
                marginBottom:    "1.5rem",
              }}
            />

            {/* Body */}
            <p
              style={{
                fontFamily:   "var(--font-primary)",
                fontSize:     "var(--text-sm)",
                fontWeight:   "var(--weight-regular)",
                lineHeight:   "var(--leading-normal)",
                color:        "var(--text-muted)",
                marginBottom: "2.5rem",
              }}
            >
              {slide.body}
            </p>

            {/* Stats */}
            {slide.stats && (
              <div
                style={{
                  display:       "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap:           "1.5rem",
                  paddingTop:    "1.5rem",
                  borderTop:     "1px solid var(--border-subtle)",
                  marginBottom:  "2.5rem",
                }}
              >
                {slide.stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      style={{
                        fontFamily:    "var(--font-primary)",
                        fontSize:      "var(--text-h3)",
                        fontWeight:    "var(--weight-bold)",
                        color:         "#D5A310",
                        lineHeight:    1,
                        marginBottom:  "0.3rem",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily:    "var(--font-primary)",
                        fontSize:      "var(--text-xs)",
                        fontWeight:    "var(--weight-medium)",
                        letterSpacing: "var(--tracking-wider)",
                        textTransform: "uppercase",
                        color:         "var(--text-muted)",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Controls: arrows + dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Arrow dir="prev" onClick={handlePrev} />
              <Arrow dir="next" onClick={handleNext} />
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "0.5rem" }}>
                {SLIDES.map((_, i) => (
                  <Dot key={i} active={i === current} onClick={() => handleDot(i)} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}