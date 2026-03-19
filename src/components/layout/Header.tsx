"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { NAV_LINKS } from "../../lib/constants";
import { getAssetPath } from "../../lib/utils";

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [isVisible,   setIsVisible]   = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHash,  setActiveHash]  = useState("#home");
  const [mounted,     setMounted]     = useState(false);
  const { theme, setTheme }           = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      setLastScrollY(prev => {
        // Only hide if scrolled down more than 80px
        if (currentScrollY > prev && currentScrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        return currentScrollY;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveHash(href);
    setMobileOpen(false);
  };

  const navLinks    = NAV_LINKS.filter((l) => l.href !== "#contact");
  const contactLink = NAV_LINKS.find((l)   => l.href === "#contact");

  // ─────────────────────────────────────────────────────────
  // Nav text color logic:
  //   - Hero section is ALWAYS black bg → always show cream text
  //   - Once scrolled, header gets solid dark bg → still cream
  //   - In light mode the page bg is cream, so un-scrolled
  //     header (transparent) would make cream text invisible.
  //   - Fix: when scrolled OR always-on-dark-hero → cream
  //          when not scrolled + light mode → use dark text
  // ─────────────────────────────────────────────────────────
  const isDark        = mounted ? theme === "dark" : true;
  // When scrolled: dark bg/cream text in dark mode, cream bg/dark text in light mode.
  // When NOT scrolled: Hero is dark in dark mode (use cream), Hero is light in light mode (use dark).
  const navTextColor  = isDark ? "#F1F0EB" : "#040304";
  const navHoverColor = "#D5A310";

  return (
    <>
      {/* ━━━ HEADER BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          right:         0,
          zIndex:        50,
          transition:    "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
          transform:     isVisible ? "translateY(0)" : "translateY(-100%)",
          background:    scrolled 
            ? (isDark ? "rgba(4,3,4,0.96)" : "rgba(241,240,235,0.96)") 
            : "transparent",
          backdropFilter:scrolled ? "blur(8px)" : "none",
          borderBottom:  scrolled
            ? (isDark ? "1px solid rgba(44,44,44,0.8)" : "1px solid rgba(213,163,16,0.1)")
            : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              height:         "5rem",
            }}
          >

            {/* ── COL 1: Logo ──────────────────────── */}
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <a
                href="#home"
                onClick={(e) => handleNav(e, "#home")}
                aria-label="Fitness Gym — go to top"
                style={{ display: "inline-block", lineHeight: 0, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Image
                  src={getAssetPath("/logo.png")}
                  alt="Fitness Gym Logo"
                  width={200}
                  height={70}
                  priority
                  style={{ 
                    height: "64px", 
                    width: "auto", 
                    objectFit: "contain"
                  }}
                />
              </a>
            </div>

            {/* ── COL 2: Desktop nav ───────────────── */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex"
              style={{
                flex:           1,
                justifyContent: "center",
                alignItems:     "center",
                gap:            "2rem",
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    style={{
                      fontFamily:     "var(--font-primary)",
                      fontSize:       "var(--text-sm)",
                      fontWeight:     "var(--weight-medium)",
                      textTransform:  "uppercase",
                      letterSpacing:  "0.06em",
                      color:          isActive ? "#D5A310" : navTextColor,
                      textDecoration: "none",
                      position:       "relative",
                      transition:     "color 0.2s",
                      whiteSpace:     "nowrap",
                      paddingBottom:  "2px",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = navHoverColor;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = navTextColor;
                    }}
                  >
                    {link.label}
                    {/* Active gold underline */}
                    <span
                      style={{
                        position:        "absolute",
                        bottom:          "-4px",
                        left:            0,
                        height:          "2px",
                        width:           isActive ? "100%" : "0%",
                        backgroundColor: "#D5A310",
                        transition:      "width 0.2s ease",
                      }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── COL 3: Theme toggle + Contact ────── */}
            <div
              style={{
                flex:           1,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "flex-end",
                gap:            "1rem",
              }}
            >
              {/* Theme toggle (desktop) */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="hidden lg:flex"
                  style={{
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "0.4rem",
                    borderRadius:   "50%",
                    background:     "transparent",
                    border:         "none",
                    color:          navTextColor,
                    cursor:         "pointer",
                    transition:     "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "#D5A310")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = navTextColor)
                  }
                >
                  {theme === "dark"
                    ? <SunIcon  style={{ width: "1.25rem", height: "1.25rem" }} />
                    : <MoonIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                  }
                </button>
              )}

              {/* Contact Us pill */}
              {contactLink && (
                <a
                  href={contactLink.href}
                  onClick={(e) => handleNav(e, contactLink.href)}
                  className="hidden lg:inline-flex"
                  style={{
                    fontFamily:     "var(--font-primary)",
                    fontSize:       "var(--text-sm)",
                    fontWeight:     "var(--weight-semibold)",
                    textTransform:  "uppercase",
                    letterSpacing:  "0.06em",
                    color:          "#D5A310",
                    border:         "1.5px solid #D5A310",
                    borderRadius:   "9999px",
                    padding:        "0.45rem 1.4rem",
                    textDecoration: "none",
                    alignItems:     "center",
                    whiteSpace:     "nowrap",
                    transition:     "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "#D5A310";
                    el.style.color      = "#040304";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "transparent";
                    el.style.color      = "#D5A310";
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
                  color:      mobileOpen ? "#F1F0EB" : navTextColor,
                  cursor:     "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#D5A310")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = mobileOpen ? "#F1F0EB" : navTextColor)
                }
              >
                {mobileOpen
                  ? <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                  : <Bars3Icon style={{ width: "1.5rem", height: "1.5rem" }} />
                }
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ━━━ MOBILE MENU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/*
        Mobile menu ALWAYS uses dark bg (#040304) with cream text
        regardless of theme — it's a full-screen overlay.
      */}
      <div
        aria-hidden={!mobileOpen}
        className="lg:hidden"
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
          transition:     "opacity 0.3s ease",
          opacity:        mobileOpen ? 1 : 0,
          pointerEvents:  mobileOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive  = activeHash === link.href;
          const isContact = link.href === "#contact";

          if (isContact) {
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  fontFamily:     "var(--font-primary)",
                  fontSize:       "var(--text-base)",
                  fontWeight:     "var(--weight-bold)",
                  textTransform:  "uppercase",
                  letterSpacing:  "var(--tracking-widest)",
                  color:          "#D5A310",
                  border:         "1.5px solid #D5A310",
                  borderRadius:   "9999px",
                  padding:        "0.6rem 2.5rem",
                  textDecoration: "none",
                  marginTop:      "0.5rem",
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
              onClick={(e) => handleNav(e, link.href)}
              style={{
                fontFamily:     "var(--font-primary)",
                fontSize:       "1.5rem",
                fontWeight:     "var(--weight-bold)",
                textTransform:  "uppercase",
                letterSpacing:  "var(--tracking-widest)",
                color:          isActive ? "#D5A310" : "#F1F0EB",  // always cream in dark overlay
                textDecoration: "none",
                transition:     "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#D5A310")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  isActive ? "#D5A310" : "#F1F0EB")
              }
            >
              {link.label}
            </a>
          );
        })}

        {/* Theme toggle in mobile menu */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            style={{
              marginTop:     "1rem",
              padding:       "0.5rem 1.5rem",
              background:    "transparent",
              border:        "1px solid rgba(241,240,235,0.25)",
              borderRadius:  "9999px",
              color:         "#F1F0EB",
              cursor:        "pointer",
              display:       "flex",
              alignItems:    "center",
              gap:           "0.5rem",
              fontFamily:    "var(--font-primary)",
              fontSize:      "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)",
            }}
          >
            {theme === "dark"
              ? <><SunIcon  style={{ width: "1rem", height: "1rem" }} /> Light Mode</>
              : <><MoonIcon style={{ width: "1rem", height: "1rem" }} /> Dark Mode</>
            }
          </button>
        )}

        <div
          style={{
            position:        "absolute",
            bottom:          "3rem",
            left:            "50%",
            transform:       "translateX(-50%)",
            width:           "4rem",
            height:          "2px",
            backgroundColor: "#D5A310",
          }}
        />
      </div>
    </>
  );
}