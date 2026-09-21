"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-container container">
        <a
          href="#"
          className="wordmark"
        aria-label="pa. — Pol Alcoverro, home"
          onClick={() => setOpen(false)}
        >
          pa<span>.</span>
        </a>
        <nav
          ref={navigation}
          aria-label="Main navigation"
          className={`main-nav${open ? " is-open" : ""}`}
          id="main-navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-contact"
            onClick={() => setOpen(false)}
          >
            Contact me <ArrowUpRight size={16} />
          </a>
        </nav>
        <a className="nav-contact" href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 3500);
    return () => window.clearTimeout(timeout);
  }, [status]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="copy-control">
      <button
        className="copy-button"
        onClick={copy}
        aria-label={status === "copied" ? "Email copied" : "Copy email address"}
        title="Copy email address"
      >
        {status === "copied" ? <Check size={18} /> : <Copy size={18} />}
      </button>
      <span className="copy-status" role="status">
        {status === "copied"
          ? "Copied!"
          : status === "error"
            ? "Select the email to copy it."
            : ""}
      </span>
    </div>
  );
}
