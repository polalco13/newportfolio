"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data";

const MOBILE_NAV_ID = "mobile-navigation";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-200 ${
        isScrolled
          ? "border-[var(--color-border)] bg-[var(--color-bg)]/92 shadow-[0_14px_40px_-32px_rgba(15,23,42,0.45)]"
          : "border-transparent bg-[var(--color-bg)]/80"
      }`}
    >
      <div className="mx-auto flex max-w-[1040px] items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <a
          href="#main-content"
          className="font-display text-xl italic text-[var(--color-text-primary)]"
          aria-label="Pol Alcoverro home"
        >
          PA
        </a>

        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-body text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-soft)] sm:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-controls={MOBILE_NAV_ID}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id={MOBILE_NAV_ID}
        className={`sm:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } border-t border-[var(--color-border)] bg-[var(--color-bg)]`}
      >
        <div className="mx-auto flex max-w-[1040px] flex-col px-5 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 font-body text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
