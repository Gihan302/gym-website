"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { NAV_LINKS } from "../../lib/constants";

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const [mounted, setMounted]       = useState(false);
  const { theme, setTheme }         = useTheme();

  useEffect(() => setMounted(true), []);

  // Solid bg after 20px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHash(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close mobile on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setActiveHash(href);
    setMobileOpen(false);
  };

  // Separate contact from the rest
  const navLinks    = NAV_LINKS.filter((l) => l.href !== "#contact");
  const contactLink = NAV_LINKS.find((l) => l.href === "#contact");

  return (
    <>
      {/* ━━━ MAIN HEADER BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          right:      0,
          zIndex:     50,
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled ? "rgba(4,3,4,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(44,44,44,0.8)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin:   "0 auto",
            padding:  "0 2rem",
          }}
        >
          {/*
            THREE-COLUMN layout:
            [Logo]   [Nav links — centered]   [Theme toggle + Contact btn]

            Each column is `flex: 1` so the nav is always perfectly centred
            regardless of logo or button width.
          */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              height:         "5rem",          // 80px header height
            }}
          >

            {/* ── COL 1: Logo (left) ─────────────────── */}
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <a
                href="#home"
                onClick={() => handleNav("#home")}
                aria-label="Fitness Gym — go to top"
                style={{ display: "inline-block", lineHeight: 0, opacity: 1, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Image
                  src="/logo.png"
                  alt="Fitness Gym Logo"
                  width={200}
                  height={70}
                  priority
                  style={{ height: "64px", width: "auto", objectFit: "contain" }}
                />
              </a>
            </div>

            {/* ── COL 2: Desktop nav (center) ──────────── */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex"
              style={{
                flex:           1,
                justifyContent: "center",    // ← perfectly centred
                alignItems:     "center",
                gap:            "2.5rem",    // matches Figma spacing
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNav(link.href)}
                    style={{
                      fontFamily:    "var(--font-primary)",
                      fontSize:      "var(--text-sm)",
                      fontWeight:    "var(--weight-medium)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-wider)",
                      color:         isActive ? "var(--gold)" : "var(--cream)",
                      textDecoration: "none",
                      position:      "relative",
                      transition:    "color 0.2s",
                      paddingBottom: "2px",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)";
                    }}
                  >
                    {link.label}
                    {/* Gold underline — visible when active */}
                    <span
                      style={{
                        position:        "absolute",
                        bottom:          "-4px",
                        left:            0,
                        height:          "2px",
                        width:           isActive ? "100%" : "0%",
                        backgroundColor: "var(--gold)",
                        transition:      "width 0.2s ease",
                      }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── COL 3: Theme toggle + Contact btn (right) ── */}
            <div
              style={{
                flex:           1,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "flex-end",   // ← pushes to right edge
                gap:            "1rem",
              }}
            >
              {/* Theme toggle — only on desktop */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="hidden lg:flex"
                  style={{
                    alignItems:      "center",
                    justifyContent:  "center",
                    padding:         "0.4rem",
                    borderRadius:    "50%",
                    background:      "transparent",
                    border:          "none",
                    color:           "var(--cream)",
                    cursor:          "pointer",
                    transition:      "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--cream)")
                  }
                >
                  {theme === "dark"
                    ? <SunIcon  style={{ width: "1.25rem", height: "1.25rem" }} />
                    : <MoonIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                  }
                </button>
              )}

              {/* CONTACT US button — gold pill outline (desktop) */}
              {contactLink && (
                <a
                  href={contactLink.href}
                  onClick={() => handleNav(contactLink.href)}
                  className="hidden lg:inline-flex"
                  style={{
                    fontFamily:    "var(--font-primary)",
                    fontSize:      "var(--text-sm)",
                    fontWeight:    "var(--weight-semibold)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wider)",
                    color:         "var(--gold)",
                    border:        "1.5px solid var(--gold)",
                    borderRadius:  "9999px",       // pill
                    padding:       "0.45rem 1.4rem",
                    textDecoration:"none",
                    alignItems:    "center",
                    transition:    "background 0.2s, color 0.2s",
                    whiteSpace:    "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--gold)";
                    el.style.color      = "var(--black)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "transparent";
                    el.style.color      = "var(--gold)";
                  }}
                >
                  {contactLink.label}
                </a>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="lg:hidden"
                style={{
                  padding:    "0.4rem",
                  background: "transparent",
                  border:     "none",
                  color:      "var(--cream)",
                  cursor:     "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "var(--cream)")
                }
              >
                {mobileOpen
                  ? <XMarkIcon  style={{ width: "1.5rem", height: "1.5rem" }} />
                  : <Bars3Icon  style={{ width: "1.5rem", height: "1.5rem" }} />
                }
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ━━━ MOBILE FULL-SCREEN MENU ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         40,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "2rem",
          background:     "rgba(4,3,4,0.98)",
          backdropFilter: "blur(12px)",
          transition:     "opacity 0.3s ease, pointer-events 0.3s",
          opacity:        mobileOpen ? 1 : 0,
          pointerEvents:  mobileOpen ? "auto" : "none",
        }}
        className="lg:hidden"
      >
        {NAV_LINKS.map((link) => {
          const isActive  = activeHash === link.href;
          const isContact = link.href === "#contact";

          if (isContact) {
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily:    "var(--font-primary)",
                  fontSize:      "var(--text-base)",
                  fontWeight:    "var(--weight-bold)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-widest)",
                  color:         "var(--gold)",
                  border:        "1.5px solid var(--gold)",
                  borderRadius:  "9999px",
                  padding:       "0.6rem 2.5rem",
                  textDecoration:"none",
                  marginTop:     "0.5rem",
                }}
              >
                {link.label}
              </a>
            );
          }

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily:    "var(--font-primary)",
                fontSize:      "1.5rem",
                fontWeight:    "var(--weight-bold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                color:         isActive ? "var(--gold)" : "var(--cream)",
                textDecoration:"none",
                transition:    "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  isActive ? "var(--gold)" : "var(--cream)")
              }
            >
              {link.label}
            </a>
          );
        })}

        {/* Theme toggle inside mobile menu */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            style={{
              marginTop:   "1rem",
              padding:     "0.5rem 1.5rem",
              background:  "transparent",
              border:      "1px solid rgba(241,240,235,0.2)",
              borderRadius:"9999px",
              color:       "var(--cream)",
              cursor:      "pointer",
              display:     "flex",
              alignItems:  "center",
              gap:         "0.5rem",
              fontFamily:  "var(--font-primary)",
              fontSize:    "var(--text-xs)",
              textTransform:"uppercase",
              letterSpacing:"var(--tracking-wider)",
            }}
          >
            {theme === "dark"
              ? <><SunIcon  style={{ width: "1rem", height: "1rem" }} /> Light Mode</>
              : <><MoonIcon style={{ width: "1rem", height: "1rem" }} /> Dark Mode</>
            }
          </button>
        )}

        {/* Decorative gold line */}
        <div
          style={{
            position:        "absolute",
            bottom:          "3rem",
            left:            "50%",
            transform:       "translateX(-50%)",
            width:           "4rem",
            height:          "2px",
            backgroundColor: "var(--gold)",
          }}
        />
      </div>
    </>
  );
}