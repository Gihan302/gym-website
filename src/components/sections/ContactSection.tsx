"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface ContactFormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// ─────────────────────────────────────────────
// useInView
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Contact info data
// ─────────────────────────────────────────────
const CONTACT_INFO = [
  {
    id:    "email",
    label: "E mail",
    value: "info@fitness.com",
    href:  "mailto:info@fitness.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
        style={{ width: "1.25rem", height: "1.25rem" }} aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    id:    "phone",
    label: "Phone",
    value: "+94 115462011",
    href:  "tel:+94115462011",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
        style={{ width: "1.25rem", height: "1.25rem" }} aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    id:    "location",
    label: "Location",
    value: "Pita Kotte, Sri Lanka",
    href:  "https://maps.google.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
        style={{ width: "1.25rem", height: "1.25rem" }} aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────
// Reusable form field styles
// ─────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width:           "100%",
  fontFamily:      "var(--font-primary)",
  fontSize:        "var(--text-sm)",
  fontWeight:      "var(--weight-regular)",
  color:           "#F1F0EB",
  backgroundColor: "rgba(241,240,235,0.08)",
  border:          "1px solid rgba(241,240,235,0.15)",
  borderRadius:    "4px",
  padding:         "0.75rem 1rem",
  outline:         "none",
  transition:      "border-color 0.2s, background-color 0.2s",
  boxSizing:       "border-box",
};

const inputFocusStyle  = "1px solid #D5A310";
const inputErrorStyle  = "1px solid rgba(220,50,50,0.7)";
const inputNormalStyle = "1px solid rgba(241,240,235,0.15)";

// ─────────────────────────────────────────────
// FormField wrapper
// ─────────────────────────────────────────────
function FieldLabel({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <label
      style={{
        display:       "block",
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-xs)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wider)",
        color:         isDark ? "rgba(241,240,235,0.6)" : "rgba(4,3,4,0.6)",
        marginBottom:  "0.4rem",
        transition:    "color 0.3s ease",
      }}
    >
      {children}
    </label>
  );
}

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p style={{ fontFamily: "var(--font-primary)", fontSize: "0.7rem", color: "#e05252", marginTop: "0.3rem" }}>
      {msg}
    </p>
  );
}

// ─────────────────────────────────────────────
// Submit states
// ─────────────────────────────────────────────
type SubmitState = "idle" | "submitting" | "success" | "error";

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ContactSection({ id }: { id: string }) {
  const { theme }       = useTheme();
  const [mounted, setMounted]   = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const { ref: leftRef,  inView: leftIn  } = useInView(0.1);
  const { ref: rightRef, inView: rightIn } = useInView(0.1);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;
  const overlayColor = isDark ? "rgba(4,3,4,0.75)" : "rgba(241,240,235,0.65)";
  const textColor = isDark ? "#F1F0EB" : "#040304";
  const mutedTextColor = isDark ? "rgba(241,240,235,0.5)" : "rgba(4,3,4,0.6)";
  const cardBg = isDark ? "rgba(4,3,4,0.65)" : "rgba(255,255,255,0.9)";
  const inputBg = isDark ? "rgba(241,240,235,0.08)" : "rgba(4,3,4,0.04)";
  const inputBorder = isDark ? "rgba(241,240,235,0.15)" : "rgba(4,3,4,0.12)";

  // ── react-hook-form setup ──────────────────
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("submitting");
    try {
      await new Promise((res) => setTimeout(res, 1400));
      console.log("Form submitted:", data);
      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 5000);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  };

  return (
    <section
      id={id}
      style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-padding)" }}
    >
      {/* ── Background image + overlay ─────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/contact/contact-bg.jpg"
          alt=""
          fill
          style={{ 
            objectFit: "cover", 
            objectPosition: "center",
            filter: isDark ? "none" : "brightness(1.1) contrast(1.05)",
          }}
          aria-hidden="true"
        />
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
          display:  "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap:      "5rem",
          alignItems:"center",
        }}
        className="max-lg:grid-cols-1 max-lg:gap-10"
      >

        {/* ━━━ LEFT: Contact info ━━━━━━━━━━━━━━━━ */}
        <div
          ref={leftRef}
          className={leftIn ? "animate-fade-left" : "opacity-0"}
          style={{
            display: "flex", flexDirection: "column", gap: "2rem"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {CONTACT_INFO.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>

                {/* Icon box */}
                <div
                  style={{
                    width:           "2.5rem",
                    height:          "2.5rem",
                    backgroundColor: "#D5A310",
                    borderRadius:    "4px",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    color:           "#040304",
                    flexShrink:      0,
                    marginTop:       "2px",
                  }}
                >
                  {item.icon}
                </div>

                {/* Label + value */}
                <div>
                  <p
                    style={{
                      fontFamily:    "var(--font-primary)",
                      fontSize:      "var(--text-xs)",
                      fontWeight:    "var(--weight-semibold)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-wider)",
                      color:         mutedTextColor,
                      marginBottom:  "0.2rem",
                      transition:    "color 0.3s ease",
                    }}
                  >
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    target={item.id === "location" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:    "var(--font-primary)",
                      fontSize:      "var(--text-base)",
                      fontWeight:    "var(--weight-semibold)",
                      color:         textColor,
                      textDecoration:"none",
                      transition:    "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#D5A310")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = textColor)
                    }
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ RIGHT: Contact form card ━━━━━━━━━━ */}
        <div
          ref={rightRef}
          className={rightIn ? "animate-fade-right" : "opacity-0"}
          style={{
            animationDelay: "200ms",
          }}
        >
          <div
            style={{
              backgroundColor: cardBg,
              backdropFilter:  "blur(12px)",
              border:          `1px solid ${isDark ? "rgba(241,240,235,0.1)" : "rgba(4,3,4,0.08)"}`,
              borderRadius:    "8px",
              padding:         "2.5rem",
              boxShadow:       isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)",
              transition:      "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Row 1: Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                  className="max-sm:grid-cols-1">
                  {/* Name */}
                  <div>
                    <FieldLabel isDark={isDark}>Name</FieldLabel>
                    <input
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      {...register("name", {
                        required:  "Name is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                        maxLength: { value: 60, message: "Max 60 characters" },
                      })}
                      style={{
                        ...inputBase,
                        color:           textColor,
                        backgroundColor: inputBg,
                        border: errors.name ? inputErrorStyle : inputBorder,
                      }}
                      onFocus={(e)  => { if (!errors.name) e.currentTarget.style.border = inputFocusStyle; }}
                      onBlur={(e)   => { e.currentTarget.style.border = errors.name ? inputErrorStyle : inputBorder; }}
                    />
                    <ErrorMsg msg={errors.name?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel isDark={isDark}>E mail</FieldLabel>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern:  {
                          value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      style={{
                        ...inputBase,
                        color:           textColor,
                        backgroundColor: inputBg,
                        border: errors.email ? inputErrorStyle : inputBorder,
                      }}
                      onFocus={(e)  => { if (!errors.email) e.currentTarget.style.border = inputFocusStyle; }}
                      onBlur={(e)   => { e.currentTarget.style.border = errors.email ? inputErrorStyle : inputBorder; }}
                    />
                    <ErrorMsg msg={errors.email?.message} />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div>
                  <FieldLabel isDark={isDark}>Subject</FieldLabel>
                  <input
                    type="text"
                    placeholder="What is this about?"
                    {...register("subject", {
                      required:  "Subject is required",
                      minLength: { value: 3,  message: "At least 3 characters" },
                      maxLength: { value: 100, message: "Max 100 characters" },
                    })}
                    style={{
                      ...inputBase,
                      color:           textColor,
                      backgroundColor: inputBg,
                      border: errors.subject ? inputErrorStyle : inputBorder,
                    }}
                    onFocus={(e)  => { if (!errors.subject) e.currentTarget.style.border = inputFocusStyle; }}
                    onBlur={(e)   => { e.currentTarget.style.border = errors.subject ? inputErrorStyle : inputBorder; }}
                  />
                  <ErrorMsg msg={errors.subject?.message} />
                </div>

                {/* Row 3: Message textarea */}
                <div>
                  <FieldLabel isDark={isDark}>Message</FieldLabel>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your fitness goals..."
                    {...register("message", {
                      required:  "Message is required",
                      minLength: { value: 10,   message: "At least 10 characters" },
                      maxLength: { value: 1000, message: "Max 1000 characters" },
                    })}
                    style={{
                      ...inputBase,
                      color:           textColor,
                      backgroundColor: inputBg,
                      resize:          "vertical",
                      minHeight:       "120px",
                      border:          errors.message ? inputErrorStyle : inputBorder,
                    }}
                    onFocus={(e)  => { if (!errors.message) e.currentTarget.style.border = inputFocusStyle; }}
                    onBlur={(e)   => { e.currentTarget.style.border = errors.message ? inputErrorStyle : inputBorder; }}
                  />
                  <ErrorMsg msg={errors.message?.message} />
                </div>

                {/* Submit button */}
                <div>
                  <SubmitButton state={submitState} isSubmitting={isSubmitting} />
                </div>

                {/* Success / Error feedback */}
                {submitState === "success" && (
                  <p style={{
                    fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
                    color: "#4caf80", textAlign: "center", padding: "0.5rem",
                    border: "1px solid rgba(76,175,128,0.3)", borderRadius: "4px",
                  }}>
                    Message sent! We'll get back to you soon.
                  </p>
                )}
                {submitState === "error" && (
                  <p style={{
                    fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)",
                    color: "#e05252", textAlign: "center", padding: "0.5rem",
                    border: "1px solid rgba(220,82,82,0.3)", borderRadius: "4px",
                  }}>
                    Something went wrong. Please try again.
                  </p>
                )}

              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Submit button with loading state
// ─────────────────────────────────────────────
function SubmitButton({ state, isSubmitting }: { state: SubmitState; isSubmitting: boolean }) {
  const [hov, setHov] = useState(false);
  const isLoading = isSubmitting || state === "submitting";

  return (
    <button
      type="submit"
      disabled={isLoading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:          "100%",
        fontFamily:     "var(--font-primary)",
        fontSize:       "var(--text-sm)",
        fontWeight:     "var(--weight-bold)",
        textTransform:  "uppercase",
        letterSpacing:  "var(--tracking-widest)",
        padding:        "0.9rem 2rem",
        backgroundColor:isLoading ? "#8a6a0a" : hov ? "#b8880d" : "#D5A310",
        color:          "#040304",
        border:         "none",
        cursor:         isLoading ? "not-allowed" : "pointer",
        transition:     "background-color 0.2s",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "0.5rem",
        opacity:        isLoading ? 0.8 : 1,
      }}
    >
      {isLoading ? (
        <>
          <Spinner /> Sending...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  );
}

// ─── Spinner ──────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      style={{
        width: "1rem", height: "1rem",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}