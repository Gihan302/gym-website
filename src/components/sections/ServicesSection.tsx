"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { getAssetPath } from "../../lib/utils";

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

// ─── Services data ────────────────────────────────────────────
const SERVICES = [
  {
    id:          "personal-training",
    title:       "Personal Training",
    image:       "/services/personal-training.jpg",
    alt:         "One-on-one personal training session",
    description: "Work directly with a certified personal trainer who designs every session around your body, goals, and pace. Get accountability, expert form correction, and a plan that actually delivers results.",
  },
  {
    id:          "strength-exercises",
    title:       "Strength Exercises",
    image:       "/services/strength.jpg",
    alt:         "Strength training with barbell",
    description: "Build raw power and functional muscle with our structured strength programs. From powerlifting fundamentals to progressive overload systems — our coaches guide you to lift heavier, safer, and smarter.",
  },
  {
    id:          "cardio-training",
    title:       "Cardio Training",
    image:       "/services/cardio.jpg",
    alt:         "Cardio training with battle ropes",
    description: "Burn fat, boost endurance, and elevate your cardiovascular health with high-energy cardio sessions. Battle ropes, HIIT circuits, and steady-state training tailored to your fitness level.",
  },
  {
    id:          "group-classes",
    title:       "Group Classes",
    image:       "/services/group-classes.jpg",
    alt:         "High-energy group fitness class",
    description: "Train alongside a community of motivated members in our high-energy group classes. From spin and HIIT to yoga and Pilates — there's a class for every fitness level, seven days a week.",
  },
  {
    id:          "recovery-wellness",
    title:       "Recovery & Wellness",
    image:       "/services/recovery.jpg",
    alt:         "Recovery and wellness facilities",
    description: "Peak performance requires peak recovery. Our wellness zone features stretching areas, foam rolling stations, and guided mobility sessions to keep you injury-free and performing at your best.",
  },
];

const GAP      = 20;   // px gap between cards
const VISIBLE  = 3;    // cards shown at once

// ─── Arrow ────────────────────────────────────────────────────
function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      style={{
        width: "2.75rem", height: "2.75rem", borderRadius: "50%",
        border: `1.5px solid ${hov ? "#D5A310" : "rgba(213,163,16,0.45)"}`,
        background: hov ? "rgba(213,163,16,0.15)" : "transparent",
        color: "#D5A310", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        transform: hov ? "scale(1.08)" : "scale(1)",
      }}
    >
      {dir === "prev"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: "1rem", height: "1rem" }}><polyline points="15 18 9 12 15 6" /></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: "1rem", height: "1rem" }}><polyline points="9 18 15 12 9 6" /></svg>
      }
    </button>
  );
}

// ─── Service card ─────────────────────────────────────────────
function ServiceCard({
  service,
  cardWidth,
}: {
  service: (typeof SERVICES)[0];
  cardWidth: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:  "relative",
        overflow:  "hidden",
        cursor:    "pointer",
        flexShrink: 0,
        width:     cardWidth,            // exact pixel width set by parent
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3" }}>
        <Image
          src={getAssetPath(service.image)}
          alt={service.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.55s ease",
            transform: hov ? "scale(1.07)" : "scale(1)",
          }}
        />

        {/* Base gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(4,3,4,0.9) 0%, rgba(4,3,4,0.2) 50%, transparent 100%)",
          opacity: hov ? 0 : 1, transition: "opacity 0.35s ease",
        }} />

        {/* Hover description */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(4,3,4,0.88)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "1.75rem",
          opacity: hov ? 1 : 0,
          transform: hov ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          <div style={{ width: "2rem", height: "2px", backgroundColor: "#D5A310", marginBottom: "0.85rem" }} />
          <p style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", color: "#D5A310", marginBottom: "0.65rem" }}>
            {service.title}
          </p>
          <p style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-regular)", lineHeight: "var(--leading-normal)", color: "rgba(241,240,235,0.82)", margin: 0 }}>
            {service.description}
          </p>
        </div>

        {/* Gold left accent */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
          backgroundColor: "#D5A310",
          transform: hov ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom", transition: "transform 0.35s ease",
        }} />
      </div>

      {/* Title bar */}
      <div style={{
        padding: "0.9rem 1rem",
        backgroundColor: hov ? "#D5A310" : "rgba(4,3,4,0.88)",
        transition: "background-color 0.3s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color: hov ? "#040304" : "#F1F0EB",
          margin: 0, textAlign: "center", transition: "color 0.3s ease",
        }}>
          {service.title}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
export default function ServicesSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: sectionRef, inView: sectIn } = useInView(0.05);
  const { theme }   = useTheme();
  const [mounted, setMounted] = useState(false);

  // ── Track / viewport refs ──────────────────────────────────
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [isSliding,     setIsSliding]     = useState(false);
  const [enableTrans,   setEnableTrans]   = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => setMounted(true), []);

  const isDark    = mounted ? theme === "dark" : true;
  const textColor = isDark ? "#F1F0EB" : "#040304";
  const overlayBg = isDark ? "rgba(4,3,4,0.75)" : "rgba(241,240,235,0.60)";

  // ── Measure viewport width (updates on resize) ─────────────
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // cardWidth = (viewportWidth - gaps between VISIBLE cards) / VISIBLE
  const cardWidth = viewportWidth > 0
    ? (viewportWidth - GAP * (VISIBLE - 1)) / VISIBLE
    : 0;

  // Step size = one card + one gap
  const stepPx = cardWidth + GAP;

  // ── Infinite clone strategy ────────────────────────────────
  // Render: [clone of last N] [real items] [clone of first N]
  // N = VISIBLE so we always have cards to slide into.
  const cloneHead = SERVICES.slice(-VISIBLE);   // clones prepended
  const cloneTail = SERVICES.slice(0, VISIBLE); // clones appended
  const allCards  = [...cloneHead, ...SERVICES, ...cloneTail];

  // Real items start at position VISIBLE in allCards
  // translateX for "activeIndex 0" = -(VISIBLE * stepPx)
  const getX = (idx: number) => -(VISIBLE + idx) * stepPx;

  const [translateX, setTranslateX] = useState(0);

  // Set initial position once cardWidth is known
  useEffect(() => {
    if (cardWidth > 0) setTranslateX(getX(activeIndex));
  }, [cardWidth]); // eslint-disable-line

  // ── Navigate ───────────────────────────────────────────────
  const navigate = useCallback((dir: "next" | "prev") => {
    if (isSliding || cardWidth === 0) return;
    setIsSliding(true);
    setEnableTrans(true);

    const next = dir === "next"
      ? activeIndex + 1
      : activeIndex - 1;

    setTranslateX(getX(next)); // animate to next (may be clone zone)

    setTimeout(() => {
      // Snap to real equivalent if we slid into clone zone
      const snapped = ((next % SERVICES.length) + SERVICES.length) % SERVICES.length;
      setActiveIndex(snapped);
      setEnableTrans(false);                  // disable transition for snap
      setTranslateX(getX(snapped));           // instant snap — no visible jump
      setIsSliding(false);
    }, 520);
  }, [isSliding, cardWidth, activeIndex, stepPx]); // eslint-disable-line

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);

  // Auto-advance
  useEffect(() => {
    if (!sectIn || cardWidth === 0) return;
    intervalRef.current = setInterval(goNext, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sectIn, goNext, cardWidth]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (cardWidth > 0) intervalRef.current = setInterval(goNext, 4000);
  };

  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleNext = () => { goNext(); resetTimer(); };

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-padding)" }}
    >
      {/* BG image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src={getAssetPath("/services/services-bg.jpg")} alt="" fill
          style={{ objectFit: "cover", objectPosition: "center", filter: isDark ? "none" : "brightness(1.1) contrast(1.05)", transition: "filter 0.4s ease" }}
          aria-hidden="true"
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: overlayBg, transition: "background-color 0.4s ease" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Heading */}
        <div
          ref={headRef}
          style={{ textAlign: "center", marginBottom: "3rem", opacity: headIn ? 1 : 0, transform: headIn ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <p style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)", color: isDark ? "rgba(241,240,235,0.7)" : "rgba(4,3,4,0.6)", marginBottom: "0.5rem" }}>
            What we do
          </p>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-h1)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", lineHeight: "var(--leading-tight)", color: textColor, margin: 0 }}>
            Our <span style={{ color: "#D5A310" }}>Services</span>
          </h2>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wider)", color: "rgba(213,163,16,0.7)", marginRight: "0.25rem" }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
          </span>
          <Arrow dir="prev" onClick={handlePrev} />
          <Arrow dir="next" onClick={handleNext} />
        </div>

        {/* ── Carousel viewport ──────────────────────────────
            overflow:hidden clips the clone cards outside frame.
            The inner track holds all cards (real + clones) in
            a single flex row and translates by exact pixel amounts.
        ─────────────────────────────────────────────────── */}
        <div
          ref={viewportRef}
          style={{ overflow: "hidden", width: "100%" }}
        >
          {cardWidth > 0 && (
            <div
              style={{
                display:    "flex",
                gap:        `${GAP}px`,
                transform:  `translateX(${translateX}px)`,
                transition: enableTrans
                  ? "transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
                willChange: "transform",
              }}
            >
              {allCards.map((service, i) => (
                <ServiceCard
                  key={`${service.id}-${i}`}
                  service={service}
                  cardWidth={cardWidth}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isSliding) return;
                const dir = i > activeIndex ? "next" : "prev";
                setIsSliding(true);
                setEnableTrans(true);
                setTranslateX(getX(i));
                setTimeout(() => {
                  setActiveIndex(i);
                  setEnableTrans(false);
                  setTranslateX(getX(i));
                  setIsSliding(false);
                }, 520);
                resetTimer();
              }}
              aria-label={`Go to service ${i + 1}`}
              style={{
                width: i === activeIndex ? "1.75rem" : "0.5rem",
                height: "0.5rem", borderRadius: "999px",
                backgroundColor: i === activeIndex ? "#D5A310" : "rgba(213,163,16,0.3)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.35s ease, background-color 0.35s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}