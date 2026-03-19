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

// ─── Gallery image data ───────────────────────────────────────
// Row 1: 3 images — left small, center wide, right small
// Row 2: 4 images — equal width
const ROW1 = [
  { src: "/gallery/gym-1.jpg", alt: "Kettlebells rack" },
  { src: "/gallery/gym-2.jpg", alt: "Weight plates and barbell" },
  { src: "/gallery/gym-3.jpg", alt: "Dumbbell rack" },
];
const ROW2 = [
  { src: "/gallery/gym-4.jpg", alt: "Rowing machines" },
  { src: "/gallery/gym-5.jpg", alt: "Gym floor with equipment" },
  { src: "/gallery/gym-6.jpg", alt: "Colorful weight plates" },
  { src: "/gallery/gym-7.jpg", alt: "Dumbbell close-up" },
];

// ─────────────────────────────────────────────────────────────
export default function GallerySection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.05);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;
  const overlayColor = isDark ? "rgba(4,3,4,0.75)" : "rgba(241,240,235,0.65)";
  const textColor = isDark ? "#F1F0EB" : "#040304";

  return (
    <section
      id={id}
      style={{
        position:     "relative",
        overflow:     "hidden",
        paddingBlock: "var(--section-padding)",
      }}
    >
      {/* ── Background gym image ─────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/gallery/gallery-bg.jpg"
          alt=""
          fill
          style={{ 
            objectFit: "cover", 
            objectPosition: "center",
            filter: isDark ? "none" : "brightness(1.1) contrast(1.05)",
          }}
          aria-hidden="true"
        />
        {/* Theme-aware overlay */}
        <div
          style={{
            position:        "absolute",
            inset:           0,
            backgroundColor: overlayColor,
            transition:      "background-color 0.4s ease",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex:   1,
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
            textAlign:  "center",
            marginBottom:"3rem",
          }}
        >
          {/* "Gallery" label with gold underline */}
          <p
            style={{
              display:       "inline-block",
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-label)",
              fontWeight:    "var(--weight-semibold)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)",
              color:         textColor,
              paddingBottom: "0.35rem",
              borderBottom:  "2px solid #D5A310",
              marginBottom:  "1rem",
              transition:    "color 0.3s ease",
            }}
          >
            Gallery
          </p>

          {/* "TAKE A LOOK AT OUR GYM!" */}
          <h2
            style={{
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-h1)",
              fontWeight:    "var(--weight-bold)",
              textTransform: "uppercase",
              lineHeight:    "var(--leading-tight)",
              color:         textColor,
              margin:        0,
              transition:    "color 0.3s ease",
            }}
          >
            Take A Look{" "}
            <span style={{ color: "#D5A310" }}>At Our Gym!</span>
          </h2>
        </div>

        {/* ── Image grid ───────────────────────── */}
        <div
          ref={gridRef}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {/* Row 1 — 3 cols: left narrow | center wide | right narrow */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap:                 "0.5rem",
            }}
            className="max-sm:grid-cols-1"
          >
            {ROW1.map((img, i) => (
              <GalleryImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                inView={gridIn}
                delay={i * 80}
                aspectRatio="3/2"
              />
            ))}
          </div>

          {/* Row 2 — 4 equal cols */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:                 "0.5rem",
            }}
            className="max-sm:grid-cols-2"
          >
            {ROW2.map((img, i) => (
              <GalleryImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                inView={gridIn}
                delay={(ROW1.length + i) * 80}
                aspectRatio="1/1"
              />
            ))}
          </div>
        </div>

        {/* ── VIEW MORE button ─────────────────── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "2.5rem",
            opacity:        gridIn ? 1 : 0,
            transform:      gridIn ? "translateY(0)" : "translateY(16px)",
            transition:     "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          }}
        >
          <ViewMoreBtn isDark={isDark} />
        </div>

      </div>
    </section>
  );
}

// ─── Single gallery image with hover overlay ─────────────────
function GalleryImage({
  src, alt, inView, delay, aspectRatio,
}: {
  src: string;
  alt: string;
  inView: boolean;
  delay: number;
  aspectRatio: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={inView ? "animate-scale-in" : "opacity-0"}
      style={{
        position:   "relative",
        overflow:   "hidden",
        aspectRatio,
        cursor:     "pointer",
        animationDelay: `${delay}ms`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 25vw"
        style={{
          objectFit:  "cover",
          transition: "transform 0.5s ease",
          transform:  hov ? "scale(1.07)" : "scale(1)",
        }}
      />
      {/* Gold overlay tint on hover */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          backgroundColor: "#D5A310",
          opacity:         hov ? 0.18 : 0,
          transition:      "opacity 0.3s ease",
        }}
      />
      {/* Gold border on hover */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          border:     `2px solid #D5A310`,
          opacity:    hov ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

// ─── VIEW MORE button ─────────────────────────────────────────
function ViewMoreBtn({ isDark }: { isDark: boolean }) {
  const [hov, setHov] = useState(false);
  const btnColor = isDark ? "#F1F0EB" : "#040304";
  
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
        padding:       "0.8rem 3rem",
        background:    hov ? (isDark ? "rgba(241,240,235,0.1)" : "rgba(4,3,4,0.05)") : "transparent",
        color:         btnColor,
        border:        `1.5px solid ${btnColor}`,
        cursor:        "pointer",
        transition:    "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
        ...(hov && {
          borderColor: "#D5A310",
          color:       "#D5A310",
        }),
      }}
    >
      View More
    </button>
  );
}