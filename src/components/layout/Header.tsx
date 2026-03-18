"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { NAV_LINKS } from "../../lib/constants";
import Button from "../ui/Button";

// ─────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme icon
  useEffect(() => setMounted(true), []);

  // ── Scroll: add solid bg after 20px ──────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Track active section via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Close mobile menu on resize ──────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll when mobile menu open ───
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Main header bar ──────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-[var(--black)]/95 backdrop-blur-sm border-b border-[var(--charcoal)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ─────────────────────────────── */}
            <Link
              href="#home"
              onClick={() => handleNavClick("#home")}
              className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
              aria-label="Fitness Sports Center — go to top"
            >
              <span className="font-primary font-bold text-2xl tracking-tighter text-white">
                FITNESS<span className="text-[#D5A310]">GYM</span>
              </span>
            </Link>

            {/* ── Desktop nav ──────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;
                const isContact = link.href === "#contact";

                if (isContact) {
                  return (
                    <Button
                      key={link.href}
                      href={link.href}
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavClick(link.href)}
                      // Override: Contact Us uses gold border in header (matches Figma)
                      className="!border-[#D5A310] !text-[#D5A310] hover:!bg-[#D5A310] hover:!text-[#040304] !rounded-full !px-6"
                    >
                      {link.label}
                    </Button>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={[
                      "font-primary font-medium uppercase tracking-widest text-sm",
                      "transition-colors duration-200",
                      "relative group",
                      isActive
                        ? "text-[#D5A310]"
                        : "text-[#F1F0EB] hover:text-[#D5A310]",
                    ].join(" ")}
                  >
                    {link.label}
                    {/* Active underline */}
                    <span
                      className={[
                        "absolute -bottom-1 left-0 h-[2px] bg-[#D5A310]",
                        "transition-all duration-200",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── Right side: theme toggle + mobile hamburger ── */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className={[
                    "p-2 rounded-full transition-colors duration-200",
                    "text-[#F1F0EB] hover:text-[#D5A310] hover:bg-[#2C2C2C]",
                  ].join(" ")}
                >
                  {theme === "dark" ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Mobile hamburger — visible only on < lg */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className={[
                  "lg:hidden p-2 rounded transition-colors duration-200",
                  "text-[#F1F0EB] hover:text-[#D5A310]",
                ].join(" ")}
              >
                {mobileOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ───────────────── */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden",
          "bg-[#040304]/98 backdrop-blur-md",
          "flex flex-col items-center justify-center gap-8",
          "transition-all duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = activeHash === link.href;
          const isContact = link.href === "#contact";

          if (isContact) {
            return (
              <Button
                key={link.href}
                href={link.href}
                variant="outline"
                size="md"
                onClick={() => handleNavClick(link.href)}
                className="!border-[#D5A310] !text-[#D5A310] !rounded-full !px-10"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Button>
            );
          }

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={[
                "font-primary font-bold uppercase tracking-widest text-2xl",
                "transition-colors duration-200",
                isActive ? "text-[#D5A310]" : "text-[#F1F0EB] hover:text-[#D5A310]",
              ].join(" ")}
            >
              {link.label}
            </a>
          );
        })}

        {/* Decorative gold line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#D5A310]" />
      </div>
    </>
  );
}