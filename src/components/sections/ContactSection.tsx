"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getAssetPath } from "../../lib/utils";
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
  color:           "var(--text-primary)",
  backgroundColor: "var(--bg-section-dark)", // Use section dark or transparent
  border:          "1px solid var(--border-subtle)",
  borderRadius:    "4px",
  padding:         "0.75rem 1rem",
  outline:         "none",
  transition:      "border-color 0.2s, background-color 0.2s",
  boxSizing:       "border-box",
};

const inputFocusStyle  = "1px solid var(--gold)";
const inputErrorStyle  = "1px solid #e05252";
const inputNormalStyle = "1px solid var(--border-subtle)";

// ─────────────────────────────────────────────
// FormField wrapper
// ─────────────────────────────────────────────
function FieldLabel() {
  return (
    <label
      style={{
        display:       "block",
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-xs)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wider)",
        color:         "var(--text-muted)",
        marginBottom:  "0.4rem",
        transition:    "color 0.3s ease",
      }}
    >
      {/* Label passed as children in component */}
    </label>
  );
}

// Rewriting slightly for cleaner variable usage
function ContactLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display:       "block",
        fontFamily:    "var(--font-primary)",
        fontSize:      "var(--text-xs)",
        fontWeight:    "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wider)",
        color:         "var(--text-muted)",
        marginBottom:  "0.4rem",
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
  // Use semantic tokens from globals.css
  const overlayColor = isDark ? "rgba(4,3,4,0.75)" : "rgba(241,240,235,0.65)";

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
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        paddingBlock: "var(--section-padding)",
        backgroundColor: "var(--bg-page)"
      }}
    >
      {/* ── Background image + overlay ─────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={getAssetPath("/contact/contact-bg.jpg")}
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
          padding:  "0 1.5rem",
          display:  "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap:      "3rem",
          alignItems:"center",
        }}
        className="max-lg:grid-cols-1 max-lg:gap-12"
      >

        {/* ━━━ LEFT: Contact info ━━━━━━━━━━━━━━━━ */}
        <div
          ref={leftRef}
          className={leftIn ? "animate-fade-left" : "opacity-0"}
          style={{
            display: "flex", flexDirection: "column", gap: "1.5rem"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {CONTACT_INFO.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>

                {/* Icon box */}
                <div
                  style={{
                    width:           "2.25rem",
                    height:          "2.25rem",
                    backgroundColor: "var(--gold)",
                    borderRadius:    "4px",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    color:           "var(--black)",
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
                      color:         "var(--text-muted)",
                      marginBottom:  "0.1rem",
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
                      fontSize:      "clamp(0.9rem, 2vw, 1.1rem)",
                      fontWeight:    "var(--weight-semibold)",
                      color:         "var(--text-primary)",
                      textDecoration:"none",
                      transition:    "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")
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
              backgroundColor: "var(--bg-card)",
              backdropFilter:  "blur(12px)",
              border:          "1px solid var(--border-subtle)",
              borderRadius:    "8px",
              padding:         "clamp(1.5rem, 5vw, 2.5rem)",
              boxShadow:       isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)",
              transition:      "background-color 0.3s ease, border-color 0.3s ease",
              opacity:         0.95, // slight transparency for glass effect
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Row 1: Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                  className="max-sm:grid-cols-1">
                  {/* Name */}
                  <div>
                    <ContactLabel>Name</ContactLabel>
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
                        backgroundColor: "rgba(var(--text-primary-rgb), 0.05)", // slightly dynamic
                        border: errors.name ? inputErrorStyle : "1px solid var(--border-subtle)",
                      }}
                      onFocus={(e)  => { if (!errors.name) e.currentTarget.style.border = inputFocusStyle; }}
                      onBlur={(e)   => { e.currentTarget.style.border = errors.name ? inputErrorStyle : "1px solid var(--border-subtle)"; }}
                    />
                    <ErrorMsg msg={errors.name?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <ContactLabel>E mail</ContactLabel>
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
                        backgroundColor: "rgba(var(--text-primary-rgb), 0.05)",
                        border: errors.email ? inputErrorStyle : "1px solid var(--border-subtle)",
                      }}
                      onFocus={(e)  => { if (!errors.email) e.currentTarget.style.border = inputFocusStyle; }}
                      onBlur={(e)   => { e.currentTarget.style.border = errors.email ? inputErrorStyle : "1px solid var(--border-subtle)"; }}
                    />
                    <ErrorMsg msg={errors.email?.message} />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div>
                  <ContactLabel>Subject</ContactLabel>
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
                      backgroundColor: "rgba(var(--text-primary-rgb), 0.05)",
                      border: errors.subject ? inputErrorStyle : "1px solid var(--border-subtle)",
                    }}
                    onFocus={(e)  => { if (!errors.subject) e.currentTarget.style.border = inputFocusStyle; }}
                    onBlur={(e)   => { e.currentTarget.style.border = errors.subject ? inputErrorStyle : "1px solid var(--border-subtle)"; }}
                  />
                  <ErrorMsg msg={errors.subject?.message} />
                </div>

                {/* Row 3: Message textarea */}
                <div>
                  <ContactLabel>Message</ContactLabel>
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
                      backgroundColor: "rgba(var(--text-primary-rgb), 0.05)",
                      resize:          "vertical",
                      minHeight:       "120px",
                      border:          errors.message ? inputErrorStyle : "1px solid var(--border-subtle)",
                    }}
                    onFocus={(e)  => { if (!errors.message) e.currentTarget.style.border = inputFocusStyle; }}
                    onBlur={(e)   => { e.currentTarget.style.border = errors.message ? inputErrorStyle : "1px solid var(--border-subtle)"; }}
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
        backgroundColor:isLoading ? "var(--btn-primary-hover)" : hov ? "var(--btn-primary-hover)" : "var(--btn-primary-bg)",
        color:          "var(--btn-primary-text)",
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