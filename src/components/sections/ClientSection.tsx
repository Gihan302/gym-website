"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── useInView ────────────────────────────────────────────────
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

// ─── Real testimonials ────────────────────────────────────────
const TESTIMONIALS = [
  {
    id:     1,
    name:   "John Silva",
    role:   "Member since 2022",
    avatar: "/testimonials/client-1.jpg",
    quote:  "Joining Fitness Sports Center changed my life completely. In just six months I lost 18kg and gained more confidence than I've had in years. The trainers genuinely care about your progress — they remember your goals and push you in all the right ways.",
    stars:  5,
  },
  {
    id:     2,
    name:   "Sarah Perera",
    role:   "Personal Training Client",
    avatar: "/testimonials/client-2.jpg",
    quote:  "I'd tried so many gyms before but nothing stuck. Here, the personal training program is on another level. My coach built a plan around my lifestyle, not the other way around. Three months in, I'm stronger than I've ever been — and actually enjoying every session.",
    stars:  5,
  },
  {
    id:     3,
    name:   "Roshan De Mel",
    role:   "Strength Program Member",
    avatar: "/testimonials/client-3.jpg",
    quote:  "The strength program here is world-class. The equipment is always maintained, the coaching is technical and precise, and the community keeps you accountable. I hit my first 100kg squat within four months — something I didn't think was possible at my age.",
    stars:  5,
  },
  {
    id:     4,
    name:   "Amali Fernando",
    role:   "Group Classes Member",
    avatar: "/testimonials/client-4.jpeg",
    quote:  "The group classes are the highlight of my week. The energy in the room is electric and the instructors make everyone feel included regardless of fitness level. I come in tired from work and leave feeling unstoppable. Best investment I've made in myself.",
    stars:  5,
  },
];

// ─── Star ─────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#D5A310" style={{ width: "1.4rem", height: "1.4rem" }} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─── Arrow ────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
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
      {direction === "left"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "1.75rem", height: "1.75rem" }}><polyline points="15 18 9 12 15 6" /></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "1.75rem", height: "1.75rem" }}><polyline points="9 18 15 12 9 6" /></svg>
      }
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Slide-in testimonial content
// ─────────────────────────────────────────────────────────────
function TestimonialSlide({
  testimonial,
  visible,
  direction,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  visible: boolean;
  direction: "left" | "right";
}) {
  // Entering: slides in from right (next) or left (prev)
  // Exiting:  slides out to left (next) or right (prev)
  const enterFrom = direction === "right" ? "60px" : "-60px";

  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0)" : `translateX(${enterFrom})`,
        transition: "opacity 0.42s ease, transform 0.42s ease",
        // Stack all slides in same grid cell
        gridArea:   "1 / 1",
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          position:     "relative",
          width:        "88px",
          height:       "88px",
          borderRadius: "50%",
          overflow:     "hidden",
          border:       "3px solid #D5A310",
          marginBottom: "1.25rem",
          flexShrink:   0,
        }}
      >
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="88px"
        />
      </div>

      {/* Name */}
      <p style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-bold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color:         "#D5A310",
        marginBottom:  "0.2rem",
      }}>
        {testimonial.name}
      </p>

      {/* Role */}
      <p style={{
        fontFamily:  "var(--font-primary)",
        fontSize:    "var(--text-xs)",
        color:       "var(--text-muted)",
        marginBottom:"1.5rem",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
      }}>
        {testimonial.role}
      </p>

      {/* Quote mark decorative */}
      <div style={{
        fontFamily:  "Georgia, serif",
        fontSize:    "5rem",
        lineHeight:  0.6,
        color:       "#D5A310",
        opacity:     0.35,
        marginBottom:"0.75rem",
        userSelect:  "none",
      }} aria-hidden="true">
        "
      </div>

      {/* Quote */}
      <p style={{
        fontFamily:  "var(--font-primary)",
        fontSize:    "var(--text-sm)",
        fontWeight:  "var(--weight-regular)",
        lineHeight:  "var(--leading-normal)",
        color:       "var(--text-muted)",
        maxWidth:    "640px",
        textAlign:   "center",
        marginBottom:"2rem",
        fontStyle:   "italic",
      }}>
        {testimonial.quote}
      </p>

      {/* Stars */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem" }}>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
export default function TestimonialSection({ id }: { id: string }) {
  const [current,   setCurrent]   = useState(0);
  const [prev,      setPrev]      = useState<number | null>(null);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [sliding,   setSliding]   = useState(false);
  const { ref: sectionRef, inView } = useInView(0.1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Navigate to a slide
  const goTo = useCallback((index: number, dir: "right" | "left") => {
    if (sliding || index === current) return;
    setDirection(dir);
    setSliding(true);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setSliding(false);
    }, 450);
  }, [sliding, current]);

  const goNext = useCallback(() =>
    goTo((current + 1) % TESTIMONIALS.length, "right"), [current, goTo]);
  const goPrev = useCallback(() =>
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, "left"), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView, goNext]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5000);
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        backgroundColor: "var(--bg-page)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
        position:        "relative",
      }}
    >
      <div
        style={{
          maxWidth:  "900px",
          margin:    "0 auto",
          padding:   "0 2rem",
          textAlign: "center",
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition:"opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Label */}
        <div style={{ marginBottom: "1rem" }}>
          <p style={{
            display:       "inline-block",
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-label)",
            fontWeight:    "var(--weight-semibold)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            color:         "var(--text-primary)",
            paddingBottom: "0.4rem",
            borderBottom:  "2px solid #D5A310",
          }}>
            Testimonial
          </p>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily:    "var(--font-primary)",
          fontSize:      "var(--text-h1)",
          fontWeight:    "var(--weight-bold)",
          textTransform: "uppercase",
          lineHeight:    "var(--leading-tight)",
          color:         "var(--text-primary)",
          marginBottom:  "3rem",
        }}>
          Our <span style={{ color: "#D5A310" }}>Clients Say</span>
        </h2>

        {/* Arrows + slide area */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
          <ArrowBtn direction="left" onClick={() => { goPrev(); resetTimer(); }} />

          {/* ── Slide container ──────────────────────────────
              display:grid with all slides in the same cell
              (gridArea: "1 / 1") lets them overlap so the
              exit slide stays visible while the enter slides in.
              minHeight prevents layout jump as content changes.
          ─────────────────────────────────────────────────── */}
          <div
            style={{
              display:   "grid",
              flex:      1,
              minHeight: "380px",
              alignItems:"center",
              overflow:  "hidden",
            }}
          >
            {/* Current slide — always visible */}
            <TestimonialSlide
              testimonial={TESTIMONIALS[current]}
              visible={true}
              direction={direction}
            />

            {/* Previous slide — fades/slides out */}
            {prev !== null && (
              <TestimonialSlide
                testimonial={TESTIMONIALS[prev]}
                visible={false}
                direction={direction === "right" ? "left" : "right"}
              />
            )}
          </div>

          <ArrowBtn direction="right" onClick={() => { goNext(); resetTimer(); }} />
        </div>

        {/* Progress bar */}
        <div style={{ height: "2px", backgroundColor: "rgba(213,163,16,0.15)", width: "100%", margin: "2rem auto 1rem", maxWidth: "320px", borderRadius: "999px" }}>
          <div
            key={current}
            style={{
              height:          "100%",
              backgroundColor: "#D5A310",
              borderRadius:    "999px",
              width:           "100%",
              transformOrigin: "left",
              animation:       "testimonialProgress 5s linear forwards",
            }}
          />
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > current ? "right" : "left"); resetTimer(); }}
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

      <style>{`
        @keyframes testimonialProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}