"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
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

const PLANS = [
  {
    id:       "starter",
    label:    "Starter Plan",
    price:    "RS. 4,500",
    period:   "/ month",
    tier:     "Beginners",
    tagline:  "Perfect for those just starting their fitness journey.",
    features: [
      "Full gym floor access",
      "Locker room & showers",
      "2 group classes per week",
      "Fitness assessment on joining",
      "Access during staffed hours",
    ],
    cta:      "Get Started",
    featured: false,
  },
  {
    id:       "pro",
    label:    "Pro Plan",
    price:    "RS. 7,500",
    period:   "/ month",
    tier:     "Most Popular",
    tagline:  "Everything you need to train seriously and see real results.",
    features: [
      "Unlimited gym floor access",
      "Unlimited group classes",
      "1 personal training session/month",
      "Nutrition consultation included",
      "Access 6AM – 10PM daily",
      "Guest pass (1 per month)",
    ],
    cta:      "Join Now",
    featured: true,
  },
  {
    id:       "elite",
    label:    "Elite Plan",
    price:    "RS. 12,500",
    period:   "/ month",
    tier:     "Advanced",
    tagline:  "Total transformation with unlimited coaching and priority access.",
    features: [
      "24/7 gym access",
      "Unlimited personal training",
      "Custom meal & workout plan",
      "Monthly body composition scan",
      "Priority class booking",
      "Towel service & locker included",
      "Free guest passes (unlimited)",
    ],
    cta:      "Go Elite",
    featured: false,
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ width: "0.9rem", height: "0.9rem", flexShrink: 0, marginTop: "2px" }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingSection({ id }: { id: string }) {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.05);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark       = mounted ? theme === "dark" : true;
  const overlayColor = isDark ? "rgba(4,3,4,0.80)" : "rgba(241,240,235,0.68)";
  const textColor    = isDark ? "#F1F0EB" : "#040304";

  return (
    <section
      id={id}
      style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-padding)" }}
    >
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={getAssetPath("/pricing/pricing-bg.jpg")}
          alt="" fill
          style={{ objectFit: "cover", objectPosition: "center top", filter: isDark ? "none" : "brightness(1.1) contrast(1.05)" }}
          aria-hidden="true"
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, transition: "background-color 0.4s ease" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 1.25rem" }}>

        {/* Heading */}
        <div
          ref={headRef}
          style={{
            textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            opacity:   headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(28px)",
            transition:"opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p style={{
            display: "inline-block",
            fontFamily: "var(--font-primary)", fontSize: "var(--text-label)",
            fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)", color: textColor,
            paddingBottom: "0.35rem", borderBottom: "2px solid #D5A310",
            marginBottom: "1rem", transition: "color 0.3s ease",
          }}>
            Our Pricing
          </p>
          <h2 style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
            fontWeight: "var(--weight-bold)", textTransform: "uppercase",
            lineHeight: "var(--leading-tight)", color: textColor,
            margin: 0, transition: "color 0.3s ease",
          }}>
            Choose Your{" "}
            <span style={{ color: "#D5A310" }}>Pricing Plan</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: isDark ? "rgba(241,240,235,0.55)" : "rgba(4,3,4,0.6)",
            maxWidth: "420px", margin: "1rem auto 0",
          }}>
            No hidden fees. No lock-in contracts. Cancel any time.
          </p>
        </div>

        {/* ── Responsive card grid ──────────────────────────────
            Mobile  (<640px):  1 column, cards stacked
            Tablet  (640–1023): 1 column still (cards are wide)
            Desktop (≥1024px): 3 columns side by side
        ─────────────────────────────────────────────────────── */}
        <div ref={gridRef}>
          <style>{`
            .pricing-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.25rem;
              align-items: stretch;
            }
            @media (min-width: 1024px) {
              .pricing-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
              }
            }
            /* On mobile, featured card gets gold top border instead of margin tricks */
            @media (max-width: 1023px) {
              .pricing-card-featured {
                margin-top: 0 !important;
                margin-bottom: 0 !important;
              }
            }
          `}</style>

          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                index={i}
                inView={gridIn}
                isDark={isDark}
              />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div style={{
          textAlign: "center", marginTop: "2rem",
          opacity:   gridIn ? 1 : 0,
          transform: gridIn ? "translateY(0)" : "translateY(16px)",
          transition:"opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
          padding: "0 0.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-primary)", fontSize: "0.7rem",
            color: isDark ? "rgba(241,240,235,0.4)" : "rgba(4,3,4,0.45)",
            letterSpacing: "var(--tracking-wide)", textTransform: "uppercase",
            lineHeight: "1.8",
          }}>
            All prices in Sri Lankan Rupees · Annual plans at 15% discount ·{" "}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ color: "#D5A310", textDecoration: "none", borderBottom: "1px solid rgba(213,163,16,0.4)" }}
            >
              Contact us for corporate rates
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

function PricingCard({
  plan, index, inView, isDark,
}: {
  plan: (typeof PLANS)[0];
  index: number;
  inView: boolean;
  isDark: boolean;
}) {
  const [hov,    setHov]    = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const cardBg     = isDark ? "rgba(4,3,4,0.75)" : "rgba(255,255,255,0.88)";
  const featuredBg = isDark ? "rgba(4,3,4,0.90)" : "rgba(255,255,255,0.96)";
  const cardText   = isDark ? "#F1F0EB" : "#040304";
  const mutedText  = isDark ? "rgba(241,240,235,0.6)" : "rgba(4,3,4,0.6)";
  const divider    = isDark ? "rgba(241,240,235,0.1)" : "rgba(4,3,4,0.1)";
  const checkColor = plan.featured ? "#D5A310" : (isDark ? "rgba(241,240,235,0.7)" : "rgba(4,3,4,0.5)");

  return (
    <div
      className={plan.featured ? "pricing-card-featured" : ""}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:        "relative",
        backgroundColor: plan.featured ? featuredBg : (hov ? "rgba(213,163,16,0.08)" : cardBg),
        border:          `1px solid ${hov || plan.featured ? "#D5A310" : (isDark ? "rgba(241,240,235,0.1)" : "rgba(4,3,4,0.12)")}`,
        backdropFilter:  "blur(10px)",
        display:         "flex",
        flexDirection:   "column",
        // Desktop: middle card sits higher
        marginTop:       plan.featured ? 0 : "0.75rem",
        marginBottom:    plan.featured ? 0 : "0.75rem",
        // Entrance animation
        opacity:         inView ? 1 : 0,
        transform:       inView ? "translateY(0)" : "translateY(48px)",
        transition: [
          `opacity 0.6s ease ${index * 130}ms`,
          `transform 0.6s cubic-bezier(0.34,1.4,0.64,1) ${index * 130}ms`,
          "background-color 0.3s ease",
          "border-color 0.3s ease",
        ].join(", "),
      }}
    >
      {/* Featured gold header bar */}
      {plan.featured && (
        <div style={{
          backgroundColor: "#D5A310",
          padding: "0.55rem 1.5rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-bold)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)", color: "#040304", margin: 0,
          }}>
            ★ Most Popular
          </p>
        </div>
      )}

      {/* Card body */}
      <div style={{
        padding: "1.75rem 1.5rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Plan label */}
        <p style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-semibold)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-widest)", color: "#D5A310",
          marginBottom: "0.75rem",
        }}>
          {plan.label}
        </p>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
          <p style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: "var(--weight-bold)",
            color: cardText, lineHeight: 1, margin: 0,
          }}>
            {plan.price}
          </p>
          <span style={{
            fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
            color: mutedText, fontWeight: "var(--weight-medium)",
          }}>
            {plan.period}
          </span>
        </div>

        {/* Tier */}
        <p style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-bold)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)", color: "#D5A310",
          marginBottom: "0.5rem",
        }}>
          {plan.tier}
        </p>

        {/* Tagline */}
        <p style={{
          fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
          lineHeight: "var(--leading-normal)", color: mutedText,
          marginBottom: "1.25rem", fontStyle: "italic",
        }}>
          {plan.tagline}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: divider, marginBottom: "1.25rem" }} />

        {/* Features */}
        <ul style={{
          listStyle: "none", padding: 0, margin: "0 0 1.75rem",
          display: "flex", flexDirection: "column", gap: "0.6rem",
          flex: 1,
        }}>
          {plan.features.map((feat, fi) => (
            <li key={fi} style={{
              display: "flex", alignItems: "flex-start", gap: "0.55rem",
              opacity:   inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 0.4s ease ${index * 130 + 280 + fi * 55}ms, transform 0.4s ease ${index * 130 + 280 + fi * 55}ms`,
            }}>
              <CheckIcon color={checkColor} />
              <span style={{
                fontFamily: "var(--font-primary)", fontSize: "var(--text-xs)",
                lineHeight: "var(--leading-normal)", color: mutedText,
              }}>
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            display:       "block",
            textAlign:     "center",
            fontFamily:    "var(--font-primary)",
            fontSize:      "var(--text-sm)",
            fontWeight:    "var(--weight-bold)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            padding:       "0.85rem 1.5rem",
            textDecoration:"none",
            cursor:        "pointer",
            transition:    "background 0.25s, color 0.25s, border-color 0.25s, transform 0.15s",
            transform:     btnHov ? "translateY(-2px)" : "translateY(0)",
            ...(plan.featured
              ? {
                  backgroundColor: btnHov ? "#b8880d" : "#D5A310",
                  color:           "#040304",
                  border:          "1.5px solid transparent",
                }
              : {
                  backgroundColor: btnHov ? "rgba(213,163,16,0.1)" : "transparent",
                  color:           btnHov ? "#D5A310" : cardText,
                  border:          `1.5px solid ${btnHov ? "#D5A310" : (isDark ? "rgba(241,240,235,0.3)" : "rgba(4,3,4,0.3)")}`,
                }
            ),
          }}
        >
          {plan.cta}
        </a>

      </div>
    </div>
  );
}