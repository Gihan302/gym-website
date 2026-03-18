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

const MEAL_DAYS = [
  {
    day:   "Monday",
    meals: "Grilled chicken breast, brown rice, steamed broccoli, protein shake — 2,100 cal",
  },
  {
    day:   "Tuesday",
    meals: "Oatmeal with berries, egg whites, sweet potato, grilled salmon — 2,050 cal",
  },
  {
    day:   "Wednesday",
    meals: "Turkey wrap, quinoa salad, Greek yoghurt, almonds, green tea — 1,980 cal",
  },
  {
    day:   "Thursday",
    meals: "Tuna sandwich, mixed vegetables, cottage cheese, banana — 2,200 cal",
  },
  {
    day:   "Friday",
    meals: "Beef stir fry, brown rice, spinach salad, whey protein shake — 2,150 cal",
  },
];

function ContactBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-bold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-widest)",
        padding:       "0.8rem 2.4rem",
        background:    "transparent",
        color:         hov ? "#D5A310" : "var(--text-primary)",
        border:        `1.5px solid ${hov ? "#D5A310" : "var(--text-primary)"}`,
        cursor:        "pointer",
        transition:    "color 0.2s, border-color 0.2s",
        marginTop:     "2rem",
        display:       "inline-block",
      }}
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
    >
      Contact Us
    </button>
  );
}

export default function DietSection({ id }: { id: string }) {
  const { ref: sectionRef, inView } = useInView(0.05);
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1);
  const { ref: rightRef, inView: rightIn } = useInView(0.1);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        // Theme-aware: dark mode #040304, light mode #F1F0EB
        backgroundColor: "var(--bg-page)",
        paddingBlock:    "var(--section-padding)",
        overflow:        "hidden",
        position:        "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Section heading ───────────────────── */}
        <div
          className={inView ? "animate-fade-up" : "opacity-0"}
          style={{
            textAlign:   "center",
            marginBottom:"4rem",
          }}
        >
          {/* "DIET" label + gold underline */}
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
            Diet
          </p>

          {/* "GET YOUR OWN DIET PLAN!" */}
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
            Get Your{" "}
            <span style={{ color: "#D5A310" }}>Own Diet Plan!</span>
          </h2>
        </div>

        {/* ── Two-column body ───────────────────── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "start",
            position:            "relative",
          }}
          className="max-lg:grid-cols-1 max-lg:gap-12"
        >

          {/* ━━━ LEFT COLUMN ━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div
            ref={leftRef}
            className={leftIn ? "animate-fade-left" : "opacity-0"}
            style={{
              position:   "relative",
            }}
          >
            {/* Large "FITNESS" watermark text behind content */}
            <div
              style={{
                position:      "absolute",
                top:           "-1rem",
                left:          "-1rem",
                fontFamily:    "var(--font-primary)",
                fontSize:      "clamp(4rem, 12vw, 9rem)",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight:    1,
                // Watermark: outline text effect
                color:         "transparent",
                WebkitTextStroke: "2px rgba(213,163,16,0.15)",
                userSelect:    "none",
                pointerEvents: "none",
                zIndex:        0,
                whiteSpace:    "nowrap",
              }}
              aria-hidden="true"
            >
              Fitness
            </div>

            {/* Actual content sits above watermark */}
            <div style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>

              {/* Gold subtitle */}
              <p
                style={{
                  fontFamily:    "var(--font-primary)",
                  fontSize:      "var(--text-sm)",
                  fontWeight:    "var(--weight-semibold)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wider)",
                  color:         "#D5A310",
                  marginBottom:  "0.75rem",
                }}
              >
                Nutrition at FitnessPlus
              </p>

              {/* Bold headline */}
              <h3
                style={{
                  fontFamily:    "var(--font-primary)",
                  fontSize:      "var(--text-h3)",
                  fontWeight:    "var(--weight-bold)",
                  textTransform: "uppercase",
                  lineHeight:    "var(--leading-snug)",
                  color:         "var(--text-primary)",
                  marginBottom:  "1.25rem",
                }}
              >
                Achieve your fitness goals faster with a custom-tailored diet and workout plan designed just for you. Our experts at FitnessPlus will analyze your needs, preferences, and lifestyle to create a plan that fits perfectly into your routine
              </h3>

              <ContactBtn />
            </div>
          </div>

          {/* ━━━ RIGHT COLUMN — Meal plan card ━━━━━ */}
          <div
            ref={rightRef}
            className={rightIn ? "animate-fade-right" : "opacity-0"}
            style={{
              animationDelay: "200ms",
            }}
          >
            <div
              style={{
                backgroundColor: "#040304",      // always dark card
                position:        "relative",
                overflow:        "hidden",
                paddingBottom:   "2rem",
              }}
            >
              {/* Gold half-circle at top — decorative header */}
              <div
                style={{
                  position:        "relative",
                  backgroundColor: "#D5A310",
                  padding:         "1.75rem 2rem 2.5rem",
                  // Clip to half-circle shape at bottom
                  clipPath:        "ellipse(55% 100% at 50% 0%)",
                  textAlign:       "center",
                  marginBottom:    "0.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily:    "var(--font-primary)",
                    fontSize:      "var(--text-h3)",
                    fontWeight:    "var(--weight-bold)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                    color:         "#040304",
                    marginBottom:  "0.25rem",
                  }}
                >
                  Weekly Meal
                </p>
                <p
                  style={{
                    fontFamily:    "var(--font-primary)",
                    fontSize:      "var(--text-xs)",
                    fontWeight:    "var(--weight-regular)",
                    color:         "rgba(4,3,4,0.7)",
                  }}
                >
                  For inquiries +94 7784 634
                </p>
              </div>

              {/* Meal list */}
              <div style={{ padding: "0.5rem 2rem 0" }}>
                {MEAL_DAYS.map((item, i) => (
                  <div
                    key={item.day}
                    style={{
                      display:       "flex",
                      gap:           "1rem",
                      alignItems:    "flex-start",
                      paddingBlock:  "0.85rem",
                      borderBottom:  i < MEAL_DAYS.length - 1
                        ? "1px solid rgba(241,240,235,0.08)"
                        : "none",
                      animationDelay: `${400 + i * 100}ms`,
                    }}
                    className={rightIn ? "animate-fade-left" : "opacity-0"}
                  >
                    {/* Gold bullet dot */}
                    <div
                      style={{
                        width:           "6px",
                        height:          "6px",
                        borderRadius:    "50%",
                        backgroundColor: "#D5A310",
                        marginTop:       "6px",
                        flexShrink:      0,
                      }}
                    />
                    <div>
                      {/* Day name */}
                      <p
                        style={{
                          fontFamily:    "var(--font-primary)",
                          fontSize:      "var(--text-sm)",
                          fontWeight:    "var(--weight-semibold)",
                          textTransform: "uppercase",
                          letterSpacing: "var(--tracking-wide)",
                          color:         "#D5A310",
                          marginBottom:  "0.2rem",
                        }}
                      >
                        {item.day}
                      </p>
                      {/* Meal description */}
                      <p
                        style={{
                          fontFamily:  "var(--font-primary)",
                          fontSize:    "var(--text-xs)",
                          fontWeight:  "var(--weight-regular)",
                          lineHeight:  "var(--leading-normal)",
                          color:       "rgba(241,240,235,0.55)",
                          margin:      0,
                        }}
                      >
                        {item.meals}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}