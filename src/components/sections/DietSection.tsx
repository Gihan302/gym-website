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

const MEAL_PLAN = [
  {
    day: "Monday", short: "Mon",
    calories: 2100, protein: 165, carbs: 220, fat: 52,
    meals: [
      { time: "Breakfast", items: "Oatmeal with banana, 3 egg whites, black coffee",              cal: 480 },
      { time: "Lunch",     items: "Grilled chicken breast, brown rice, steamed broccoli",         cal: 720 },
      { time: "Snack",     items: "Protein shake, handful of almonds",                            cal: 320 },
      { time: "Dinner",    items: "Baked salmon, quinoa, mixed greens salad",                     cal: 580 },
    ],
  },
  {
    day: "Tuesday", short: "Tue",
    calories: 2050, protein: 158, carbs: 210, fat: 48,
    meals: [
      { time: "Breakfast", items: "Greek yoghurt with berries, wholegrain toast, green tea",      cal: 420 },
      { time: "Lunch",     items: "Turkey wrap with avocado, sweet potato wedges",                cal: 680 },
      { time: "Snack",     items: "Apple with peanut butter, cottage cheese",                     cal: 310 },
      { time: "Dinner",    items: "Lean beef stir-fry, jasmine rice, bok choy",                   cal: 640 },
    ],
  },
  {
    day: "Wednesday", short: "Wed",
    calories: 1980, protein: 152, carbs: 198, fat: 45,
    meals: [
      { time: "Breakfast", items: "Scrambled eggs (3), wholemeal bread, fresh orange juice",      cal: 460 },
      { time: "Lunch",     items: "Tuna salad with quinoa, cherry tomatoes, olive oil dressing",  cal: 590 },
      { time: "Snack",     items: "Protein bar, handful of walnuts",                              cal: 290 },
      { time: "Dinner",    items: "Grilled chicken thighs, roasted sweet potato, spinach",        cal: 640 },
    ],
  },
  {
    day: "Thursday", short: "Thu",
    calories: 2200, protein: 175, carbs: 235, fat: 55,
    meals: [
      { time: "Breakfast", items: "Protein pancakes with honey, banana, black coffee",            cal: 520 },
      { time: "Lunch",     items: "Chicken rice bowl, mixed vegetables, low-sodium soy sauce",    cal: 740 },
      { time: "Snack",     items: "Whey protein shake, rice cakes with hummus",                   cal: 350 },
      { time: "Dinner",    items: "Grilled white fish, brown rice, broccoli and carrot medley",   cal: 590 },
    ],
  },
  {
    day: "Friday", short: "Fri",
    calories: 2150, protein: 168, carbs: 225, fat: 50,
    meals: [
      { time: "Breakfast", items: "Smoothie bowl: spinach, banana, protein powder, granola",      cal: 490 },
      { time: "Lunch",     items: "Beef stir-fry with brown rice, bell peppers, snap peas",       cal: 720 },
      { time: "Snack",     items: "Cottage cheese with pineapple, green tea",                     cal: 280 },
      { time: "Dinner",    items: "Baked chicken with herb crust, roasted potatoes, green beans", cal: 660 },
    ],
  },
  {
    day: "Saturday", short: "Sat",
    calories: 2300, protein: 180, carbs: 250, fat: 58,
    meals: [
      { time: "Breakfast", items: "Full egg omelette (4 eggs), wholegrain toast, fresh juice",    cal: 560 },
      { time: "Lunch",     items: "Grilled salmon burger, sweet potato fries, coleslaw",          cal: 780 },
      { time: "Snack",     items: "Mixed nuts and dried fruit, protein shake",                    cal: 380 },
      { time: "Dinner",    items: "Lean steak, mashed potato, steamed asparagus",                 cal: 580 },
    ],
  },
  {
    day: "Sunday", short: "Sun",
    calories: 1900, protein: 145, carbs: 190, fat: 42,
    meals: [
      { time: "Breakfast", items: "Avocado toast, poached eggs, fresh fruit, herbal tea",         cal: 450 },
      { time: "Lunch",     items: "Lentil and vegetable soup, wholegrain roll, side salad",       cal: 540 },
      { time: "Snack",     items: "Rice cakes, almond butter, sliced banana",                     cal: 280 },
      { time: "Dinner",    items: "Grilled chicken breast, vegetable curry, basmati rice",        cal: 630 },
    ],
  },
];

// ─── All injected keyframes ───────────────────────────────────
const DIET_STYLES = `
  @keyframes dietFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes mealRowSlide {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── Light beam that orbits the meal card ── */
  @keyframes beamOrbit {
    0%   { transform: rotate(0deg)   translateX(160px) rotate(0deg);   opacity: 0.7; }
    25%  { opacity: 1; }
    50%  { transform: rotate(180deg) translateX(160px) rotate(-180deg); opacity: 0.7; }
    75%  { opacity: 1; }
    100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); opacity: 0.7; }
  }

  /* ── Pulsing corner glow ── */
  @keyframes cornerGlow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1;   }
  }

  /* ── Border sweep ── */
  @keyframes borderSweep {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }

  .diet-fade-in  { animation: dietFadeIn   0.35s ease forwards; }
  .diet-fade-out { opacity: 0; transform: translateY(-6px); transition: opacity 0.2s ease, transform 0.2s ease; }
  .meal-row-in   { animation: mealRowSlide 0.35s ease both; }
  .diet-tab-scroll { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
  .diet-tab-scroll::-webkit-scrollbar { display: none; }

  /* Light beam orbiting dot */
  .beam-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D5A310;
    box-shadow: 0 0 8px 3px rgba(213,163,16,0.6), 0 0 20px 6px rgba(213,163,16,0.25);
    top: 50%;
    left: 50%;
    margin-top: -3px;
    margin-left: -3px;
    animation: beamOrbit 3s linear infinite;
    pointer-events: none;
  }
  .beam-dot:nth-child(2) {
    animation-delay: -1.5s;
    width: 4px;
    height: 4px;
    background: rgba(213,163,16,0.7);
    box-shadow: 0 0 6px 2px rgba(213,163,16,0.4);
    animation-duration: 3s;
  }

  /* Corner accent pulses */
  .card-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    pointer-events: none;
    animation: cornerGlow 2s ease-in-out infinite;
  }
  .card-corner-tl { top: -1px; left: -1px; border-top: 2px solid #D5A310; border-left: 2px solid #D5A310; animation-delay: 0s; }
  .card-corner-tr { top: -1px; right: -1px; border-top: 2px solid #D5A310; border-right: 2px solid #D5A310; animation-delay: 0.5s; }
  .card-corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid #D5A310; border-left: 2px solid #D5A310; animation-delay: 1s; }
  .card-corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid #D5A310; border-right: 2px solid #D5A310; animation-delay: 1.5s; }

  /* Animated border gradient around card */
  .card-glow-border {
    position: absolute;
    inset: -1.5px;
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(213,163,16,0) 20%,
      rgba(213,163,16,0.6) 50%,
      rgba(213,163,16,0) 80%,
      transparent 100%
    );
    background-size: 200% 200%;
    animation: borderSweep 2.5s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
`;

// ─────────────────────────────────────────────────────────────
export default function DietSection({ id }: { id: string }) {
  const { ref: sectionRef, inView }        = useInView(0.05);
  const { ref: leftRef,   inView: leftIn } = useInView(0.1);
  const { ref: rightRef,  inView: rightIn} = useInView(0.1);

  const [activeDay, setActiveDay] = useState(0);
  const [animating, setAnimating] = useState(false);

  const plan = MEAL_PLAN[activeDay];

  const selectDay = (i: number) => {
    if (i === activeDay || animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveDay(i); setAnimating(false); }, 200);
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
      <style>{DIET_STYLES}</style>

      {/* ━━━ STICKY "FITNESS" WATERMARK ━━━━━━━━━━━━━━━━━━━━━━━
          position: sticky keeps it fixed within the section
          while the user scrolls through the content.
          top: 50% centres it vertically in the viewport.
          translate(-50%, -50%) centres the text itself.
          pointer-events: none + z-index: 0 keeps it behind content.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        aria-hidden="true"
        style={{
          // Sticky: stays in viewport while section is visible
          position:    "sticky",
          top:         "30%",
          left:        "75%",
          // Pull out of flow height so it doesn't push content
          height:      0,
          overflow:    "visible",
          zIndex:      0,
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontFamily:    "var(--font-primary)",
          // Larger than before — clamp from 5rem up to 14rem
          fontSize:      "clamp(5rem, 16vw, 14rem)",
          fontWeight:    "var(--weight-bold)",
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight:    1,
          color:         "transparent",
          // Increased opacity: was 0.12, now 0.28
          WebkitTextStroke: "2px rgba(213,163,16,0.28)",
          userSelect:    "none",
          whiteSpace:    "nowrap",
          // Centre horizontally in the section
          position:      "absolute",
          left:          "25%",
          bottom:        "50",
          transform:     "translateX(-50%) translateY(-50%)",
        }}>
          FITNESS
        </div>
      </div>

      {/* Main content — sits above the watermark */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 1.25rem" }}>

        {/* ── Heading ───────────────────────────── */}
        <div
          className={inView ? "animate-fade-up" : "opacity-0"}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <p style={{
            display: "inline-block",
            fontFamily: "var(--font-primary)", fontSize: "var(--text-label)",
            fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)", color: "var(--text-primary)",
            paddingBottom: "0.35rem", borderBottom: "2px solid var(--gold)",
            marginBottom: "1.25rem",
          }}>
            Diet
          </p>
          <h2 style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
            fontWeight: "var(--weight-bold)", textTransform: "uppercase",
            lineHeight: "var(--leading-tight)", color: "var(--text-primary)", margin: 0,
          }}>
            Get Your{" "}
            <span style={{ color: "var(--gold)" }}>Own Diet Plan!</span>
          </h2>
        </div>

        {/* ── Two-column grid ───────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
          className="max-lg:grid-cols-1"
        >

          {/* ━━━ LEFT ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div
            ref={leftRef}
            className={leftIn ? "animate-fade-left" : "opacity-0"}
            style={{ position: "relative", paddingTop: "5rem" }}
          >
            <p style={{
              fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)", color: "var(--gold)",
              marginBottom: "0.75rem",
            }}>
              Nutrition at FitnessPlus
            </p>

            <h3 style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: "var(--weight-bold)", textTransform: "uppercase",
              lineHeight: "var(--leading-snug)", color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}>
              Achieve your fitness goals faster with a custom-tailored diet
              and workout plan designed just for you. Our experts will analyze
              your needs and lifestyle to build the perfect plan.
            </h3>

            <ContactBtn />
          </div>

          {/* ━━━ RIGHT — Meal card with light beam ━ */}
          <div
            ref={rightRef}
            className={rightIn ? "animate-fade-right" : "opacity-0"}
            style={{ animationDelay: "200ms" }}
          >
            {/*
              Outer wrapper:
              - position: relative so beam dots + corner accents are positioned inside
              - overflow: visible so the orbiting dots can go outside the card rect
              - padding: small gap so the glow border doesn't overlap content
            */}
            <div style={{ position: "relative", padding: "6px" }}>

              {/* ── Animated border sweep ───────────── */}
              <div className="card-glow-border" />

              {/* ── Orbiting beam dots ──────────────── */}
              {/*
                These sit in the centre of the wrapper and
                use CSS animation to orbit outward via translateX.
                The wrapper is position:relative so 50%/50% = card centre.
              */}
              <div
                style={{
                  position:       "absolute",
                  top:            "50%",
                  left:           "50%",
                  width:          0,
                  height:         0,
                  pointerEvents:  "none",
                  zIndex:         10,
                }}
              >
                <div className="beam-dot" />
                <div className="beam-dot" />
              </div>

              {/* ── Pulsing corner accents ──────────── */}
              <div className="card-corner card-corner-tl" />
              <div className="card-corner card-corner-tr" />
              <div className="card-corner card-corner-bl" />
              <div className="card-corner card-corner-br" />

              {/* ── Actual card ─────────────────────── */}
              <div style={{
                backgroundColor: "var(--black)",
                overflow:        "hidden",
                position:        "relative",
                zIndex:          1,
              }}>

                {/* Gold dome header */}
                <div style={{
                  backgroundColor: "var(--gold)",
                  padding: "1.5rem 2rem 2.5rem",
                  clipPath: "ellipse(55% 100% at 50% 0%)",
                  textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "var(--font-primary)", fontSize: "var(--text-h3)",
                    fontWeight: "var(--weight-bold)", textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)", color: "var(--black)",
                    marginBottom: "0.25rem",
                  }}>
                    Weekly Meal Plan
                  </p>
                  <p style={{
                    fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
                    color: "rgba(4,3,4,0.65)",
                  }}>
                    For inquiries +94 115 462 011
                  </p>
                </div>

                {/* Day tabs */}
                <div
                  className="diet-tab-scroll"
                  style={{ display: "flex", backgroundColor: "var(--brown)", padding: "0 1rem" }}
                >
                  {MEAL_PLAN.map((d, i) => (
                    <DayTab
                      key={d.day}
                      label={d.short}
                      active={i === activeDay}
                      onClick={() => selectDay(i)}
                    />
                  ))}
                </div>

                {/* Content */}
                <div
                  className={animating ? "diet-fade-out" : "diet-fade-in"}
                  style={{ padding: "1.25rem 1.5rem 1.75rem" }}
                >
                  {/* Macro bar */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1px 1fr 1px 1fr 1px 1fr",
                    backgroundColor: "var(--brown)",
                    padding: "0.75rem 0.5rem",
                    marginBottom: "1.25rem",
                  }}>
                    <MacroItem label="Calories" value={`${plan.calories}`} />
                    <div style={{ backgroundColor: "rgba(241,240,235,0.08)", height: "2rem", alignSelf: "center" }} />
                    <MacroItem label="Protein"  value={`${plan.protein}g`} />
                    <div style={{ backgroundColor: "rgba(241,240,235,0.08)", height: "2rem", alignSelf: "center" }} />
                    <MacroItem label="Carbs"    value={`${plan.carbs}g`} />
                    <div style={{ backgroundColor: "rgba(241,240,235,0.08)", height: "2rem", alignSelf: "center" }} />
                    <MacroItem label="Fat"      value={`${plan.fat}g`} />
                  </div>

                  {/* Meal rows */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {plan.meals.map((meal, i) => (
                      <div
                        key={meal.time}
                        className="meal-row-in"
                        style={{
                          display: "flex", gap: "0.85rem", alignItems: "flex-start",
                          paddingBlock: "0.8rem",
                          borderBottom: i < plan.meals.length - 1
                            ? "1px solid rgba(241,240,235,0.07)"
                            : "none",
                          animationDelay: `${i * 60}ms`,
                        }}
                      >
                        <div style={{
                          width: "7px", height: "7px", borderRadius: "50%",
                          backgroundColor: "var(--gold)", marginTop: "5px", flexShrink: 0,
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.5rem", marginBottom: "0.2rem", flexWrap: "wrap",
                          }}>
                            <p style={{
                              fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
                              fontWeight: "var(--weight-bold)", textTransform: "uppercase",
                              letterSpacing: "var(--tracking-wide)", color: "var(--gold)",
                              margin: 0, flexShrink: 0,
                            }}>
                              {meal.time}
                            </p>
                            <span style={{
                              fontFamily: "var(--font-primary)", fontSize: "0.62rem",
                              fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
                              letterSpacing: "var(--tracking-wide)",
                              color: "rgba(213,163,16,0.7)",
                              backgroundColor: "rgba(213,163,16,0.1)",
                              padding: "0.1rem 0.5rem", borderRadius: "2px", whiteSpace: "nowrap",
                            }}>
                              {meal.cal} cal
                            </span>
                          </div>
                          <p style={{
                            fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
                            lineHeight: "var(--leading-normal)",
                            color: "rgba(241,240,235,0.55)", margin: 0,
                          }}>
                            {meal.items}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function DayTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, minWidth: "2.5rem",
        padding: "0.6rem 0.4rem",
        background: "transparent", border: "none",
        borderBottom: `2px solid ${active ? "var(--gold)" : "transparent"}`,
        fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: active ? "var(--gold)" : hov ? "rgba(241,240,235,0.75)" : "rgba(241,240,235,0.4)",
        cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
        textAlign: "center", whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function MacroItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: "center", padding: "0.25rem" }}>
      <p style={{
        fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-bold)", color: "var(--gold)",
        marginBottom: "0.1rem", lineHeight: 1,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: "var(--font-primary)", fontSize: "0.6rem",
        fontWeight: "var(--weight-medium)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "rgba(241,240,235,0.4)",
      }}>
        {label}
      </p>
    </div>
  );
}

function ContactBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      style={{
        fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-bold)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-widest)",
        padding: "0.85rem 2.5rem",
        background: hov ? "rgba(213,163,16,0.08)" : "transparent",
        color: hov ? "var(--gold)" : "var(--text-primary)",
        border: `1.5px solid ${hov ? "var(--gold)" : "var(--text-primary)"}`,
        cursor: "pointer",
        transition: "color 0.2s, border-color 0.2s, background 0.2s",
        marginTop: "2rem",
        display: "inline-block",
        width: "100%", maxWidth: "280px",
        textAlign: "center",
      }}
    >
      Get My Diet Plan
    </button>
  );
}