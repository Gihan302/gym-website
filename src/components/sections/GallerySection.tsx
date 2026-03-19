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

// ─── All gallery images ───────────────────────────────────────
const GALLERY_IMAGES = [
  { src: "/gallery/gym-1.jpg", alt: "Kettlebells rack" },
  { src: "/gallery/gym-2.jpg", alt: "Weight plates and barbell" },
  { src: "/gallery/gym-3.jpg", alt: "Dumbbell rack" },
  { src: "/gallery/gym-4.jpg", alt: "Rowing machines" },
  { src: "/gallery/gym-5.jpg", alt: "Gym floor with equipment" },
  { src: "/gallery/gym-6.jpg", alt: "Colorful weight plates" },
  { src: "/gallery/gym-7.jpg", alt: "Dumbbell close-up" },
];

// ─── LIGHTBOX ─────────────────────────────────────────────────
function Lightbox({
  images, startIndex, onClose,
}: {
  images: typeof GALLERY_IMAGES;
  startIndex: number;
  onClose: () => void;
}) {
  const [current,  setCurrent]  = useState(startIndex);
  const [prev,     setPrev]     = useState<number | null>(null);
  const [sliding,  setSliding]  = useState(false);
  const [dir,      setDir]      = useState<"next" | "prev">("next");
  const touchX = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const navigate = useCallback((d: "next" | "prev") => {
    if (sliding) return;
    setDir(d);
    setSliding(true);
    setPrev(current);
    const next = d === "next"
      ? (current + 1) % images.length
      : (current - 1 + images.length) % images.length;
    setCurrent(next);
    setTimeout(() => { setPrev(null); setSliding(false); }, 420);
  }, [sliding, current, images.length]);

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev, onClose]);

  const enterX = dir === "next" ? "70px" : "-70px";
  const exitX  = dir === "next" ? "-70px" : "70px";

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, backgroundColor: "rgba(4,3,4,0.97)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(90vw, 1100px)", height: "min(82vh, 680px)", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Image display grid */}
        <div style={{ display: "grid", width: "100%", height: "100%" }}>
          {/* Current — enters */}
          <div style={{ gridArea: "1/1", position: "relative", width: "100%", height: "100%", opacity: sliding ? 0 : 1, transform: sliding ? `translateX(${enterX})` : "translateX(0)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
            <Image src={getAssetPath(images[current].src)} alt={images[current].alt} fill style={{ objectFit: "contain" }} sizes="90vw" priority />
          </div>
          {/* Previous — exits */}
          {prev !== null && (
            <div style={{ gridArea: "1/1", position: "relative", width: "100%", height: "100%", opacity: 0, transform: `translateX(${exitX})`, transition: "opacity 0.4s ease, transform 0.4s ease", pointerEvents: "none" }}>
              <Image src={getAssetPath(images[prev].src)} alt={images[prev].alt} fill style={{ objectFit: "contain" }} sizes="90vw" />
            </div>
          )}
        </div>

        {/* Arrows */}
        <LbArrow dir="prev" onClick={goPrev} />
        <LbArrow dir="next" onClick={goNext} />

        {/* Counter */}
        <p style={{ position: "absolute", bottom: "-2.2rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-widest)", color: "rgba(241,240,235,0.45)", whiteSpace: "nowrap" }}>
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>

        {/* Thumbnail strip */}
        <div style={{ position: "absolute", bottom: "-5.25rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => { if (i !== current) navigate(i > current ? "next" : "prev"); setTimeout(() => setCurrent(i), 0); }}
              style={{ width: i === current ? "3.2rem" : "2.25rem", height: i === current ? "2.2rem" : "1.5rem", padding: 0, border: `2px solid ${i === current ? "#D5A310" : "transparent"}`, borderRadius: "2px", overflow: "hidden", cursor: "pointer", flexShrink: 0, opacity: i === current ? 1 : 0.5, position: "relative", transition: "width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s" }}>
              <Image src={getAssetPath(img.src)} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="52px" />
            </button>
          ))}
        </div>
      </div>

      {/* Close */}
      <LbClose onClose={onClose} />
    </div>
  );
}

function LbArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "absolute", top: "50%", [dir === "prev" ? "left" : "right"]: "-3.75rem", transform: `translateY(-50%) scale(${h ? 1.08 : 1})`, width: "2.75rem", height: "2.75rem", borderRadius: "50%", border: `1.5px solid ${h ? "#D5A310" : "rgba(241,240,235,0.2)"}`, background: h ? "rgba(213,163,16,0.15)" : "rgba(4,3,4,0.5)", color: h ? "#D5A310" : "#F1F0EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", zIndex: 10 }}>
      {dir === "prev"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "1rem", height: "1rem" }}><polyline points="15 18 9 12 15 6" /></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "1rem", height: "1rem" }}><polyline points="9 18 15 12 9 6" /></svg>
      }
    </button>
  );
}

function LbClose({ onClose }: { onClose: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClose} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} aria-label="Close"
      style={{ position: "fixed", top: "1.25rem", right: "1.25rem", width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: `1.5px solid ${h ? "#D5A310" : "rgba(241,240,235,0.25)"}`, background: h ? "rgba(213,163,16,0.15)" : "rgba(4,3,4,0.6)", color: h ? "#D5A310" : "#F1F0EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", zIndex: 1001 }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "1.1rem", height: "1.1rem" }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    </button>
  );
}

// ─── AUTO-SLIDESHOW ───────────────────────────────────────────
// Runs inside the section when the section is in view.
// Shows 1 large featured image that auto-advances every 3s,
// with the rest shown as a thumbnail strip below.
function GallerySlideshow({
  images,
  inView,
  onImageClick,
}: {
  images: typeof GALLERY_IMAGES;
  inView: boolean;
  onImageClick: (i: number) => void;
}) {
  const [active,   setActive]   = useState(0);
  const [prevIdx,  setPrevIdx]  = useState<number | null>(null);
  const [sliding,  setSliding]  = useState(false);
  const [dir,      setDir]      = useState<"next" | "prev">("next");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((d: "next" | "prev", target?: number) => {
    if (sliding) return;
    const next = target !== undefined
      ? target
      : d === "next"
        ? (active + 1) % images.length
        : (active - 1 + images.length) % images.length;
    if (next === active) return;
    setDir(d);
    setSliding(true);
    setPrevIdx(active);
    setActive(next);
    setTimeout(() => { setPrevIdx(null); setSliding(false); }, 500);
  }, [sliding, active, images.length]);

  const goNext = useCallback(() => navigate("next"), [navigate]);

  // Auto-advance when in view
  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(goNext, 3200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView, goNext]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 3200);
  };

  const enterX = dir === "next" ? "80px" : "-80px";
  const exitX  = dir === "next" ? "-80px" : "80px";

  return (
    <div>
      {/* ── Main featured image ──────────────────── */}
      <div
        style={{
          position:     "relative",
          width:        "100%",
          aspectRatio:  "16/7",
          overflow:     "hidden",
          cursor:       "zoom-in",
          marginBottom: "0.5rem",
          opacity:      inView ? 1 : 0,
          transform:    inView ? "translateY(0)" : "translateY(24px)",
          transition:   "opacity 0.7s ease, transform 0.7s ease",
        }}
        onClick={() => onImageClick(active)}
      >
        {/* Grid so current and prev overlap */}
        <div style={{ display: "grid", width: "100%", height: "100%" }}>
          {/* Current */}
          <div style={{ gridArea: "1/1", position: "relative", width: "100%", height: "100%", opacity: sliding ? 0 : 1, transform: sliding ? `translateX(${enterX})` : "translateX(0)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <Image src={getAssetPath(images[active].src)} alt={images[active].alt} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" priority />
            {/* Gold corner accent */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "4rem", backgroundColor: "#D5A310" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "4rem", height: "4px", backgroundColor: "#D5A310" }} />
            {/* Click to expand hint */}
            <div style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.4rem", backgroundColor: "rgba(4,3,4,0.6)", padding: "0.35rem 0.75rem", backdropFilter: "blur(4px)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D5A310" strokeWidth={2} style={{ width: "0.9rem", height: "0.9rem" }}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.65rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", color: "#F1F0EB" }}>Click to expand</span>
            </div>
          </div>
          {/* Prev — exits */}
          {prevIdx !== null && (
            <div style={{ gridArea: "1/1", position: "relative", width: "100%", height: "100%", opacity: 0, transform: `translateX(${exitX})`, transition: "opacity 0.5s ease, transform 0.5s ease", pointerEvents: "none" }}>
              <Image src={getAssetPath(images[prevIdx].src)} alt={images[prevIdx].alt} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", backgroundColor: "rgba(213,163,16,0.2)" }}>
          <div
            key={active}
            style={{ height: "100%", backgroundColor: "#D5A310", width: "100%", transformOrigin: "left", animation: "galleryProgress 3.2s linear forwards" }}
          />
        </div>

        {/* Nav arrows on main image */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate("prev"); resetTimer(); }}
          style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid rgba(241,240,235,0.3)", background: "rgba(4,3,4,0.55)", color: "#F1F0EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#D5A310"; (e.currentTarget as HTMLButtonElement).style.color = "#D5A310"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(241,240,235,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#F1F0EB"; }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "0.9rem", height: "0.9rem" }}><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate("next"); resetTimer(); }}
          style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid rgba(241,240,235,0.3)", background: "rgba(4,3,4,0.55)", color: "#F1F0EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#D5A310"; (e.currentTarget as HTMLButtonElement).style.color = "#D5A310"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(241,240,235,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#F1F0EB"; }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "0.9rem", height: "0.9rem" }}><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* ── Thumbnail strip ────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
          gap: "0.5rem",
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { navigate(i > active ? "next" : "prev", i); resetTimer(); }}
            style={{
              position:    "relative",
              aspectRatio: "1/1",
              padding:     0,
              border:      `2px solid ${i === active ? "#D5A310" : "transparent"}`,
              overflow:    "hidden",
              cursor:      "pointer",
              transition:  "border-color 0.3s ease, opacity 0.3s ease",
              opacity:     i === active ? 1 : 0.55,
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLButtonElement).style.opacity = "0.55"; }}
          >
            <Image src={getAssetPath(img.src)} alt={img.alt} fill style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: i === active ? "scale(1.05)" : "scale(1)" }} sizes="14vw" />
            {/* Active gold tint */}
            {i === active && (
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(213,163,16,0.12)" }} />
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes galleryProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
export default function GallerySection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: bodyRef, inView: bodyIn } = useInView(0.05);
  const { theme }   = useTheme();
  const [mounted,   setMounted]   = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const isDark       = mounted ? theme === "dark" : true;
  const overlayColor = isDark ? "rgba(4,3,4,0.78)" : "rgba(241,240,235,0.68)";
  const textColor    = isDark ? "#F1F0EB" : "#040304";

  return (
    <>
      <section
        id={id}
        style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-padding)" }}
      >
        {/* BG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={getAssetPath("/gallery/gallery-bg.jpg")} alt="" fill style={{ objectFit: "cover", objectPosition: "center", filter: isDark ? "none" : "brightness(1.1) contrast(1.05)" }} aria-hidden="true" />
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, transition: "background-color 0.4s ease" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Heading */}
          <div
            ref={headRef}
            style={{ textAlign: "center", marginBottom: "3rem", opacity: headIn ? 1 : 0, transform: headIn ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <p style={{ display: "inline-block", fontFamily: "var(--font-primary)", fontSize: "var(--text-label)", fontWeight: "var(--weight-semibold)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: textColor, paddingBottom: "0.35rem", borderBottom: "2px solid #D5A310", marginBottom: "1rem", transition: "color 0.3s ease" }}>
              Gallery
            </p>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-h1)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", lineHeight: "var(--leading-tight)", color: textColor, margin: 0, transition: "color 0.3s ease" }}>
              Take A Look <span style={{ color: "#D5A310" }}>At Our Gym!</span>
            </h2>
          </div>

          {/* Slideshow */}
          <div ref={bodyRef}>
            <GallerySlideshow
              images={GALLERY_IMAGES}
              inView={bodyIn}
              onImageClick={(i) => setLightboxIndex(i)}
            />
          </div>

          {/* CTA — replaced "View More" with "Book a Tour" */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem", opacity: bodyIn ? 1 : 0, transform: bodyIn ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s" }}>
            <BookTourBtn />
          </div>

        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

function BookTourBtn() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "0.6rem",
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-sm)",
        fontWeight:    "var(--weight-bold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-widest)",
        padding:       "0.85rem 2.5rem",
        background:    hov ? "#D5A310" : "transparent",
        color:         hov ? "#040304" : "#F1F0EB",
        border:        `1.5px solid ${hov ? "#D5A310" : "rgba(241,240,235,0.6)"}`,
        textDecoration:"none",
        cursor:        "pointer",
        transition:    "background 0.25s, color 0.25s, border-color 0.25s",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "1.1rem", height: "1.1rem" }}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Contact for more info
    </a>
  );
}