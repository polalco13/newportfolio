"use client";

import { AnimatePresence, motion } from "motion/react";
import { Code2, Palette, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "developer" | "designer";

const MODES: {
  id: Mode;
  label: string;
  title: string;
  description: string;
  highlights: string[];
}[] = [
  {
    id: "developer",
    label: "Developer Mode",
    title: "Build status and architecture in progress",
    description:
      "Core sections are live while we keep shipping performance and interaction updates.",
    highlights: [
      "Refining section transitions and motion timing",
      "Improving responsive behavior on smaller screens",
      "Adding observability hooks before final release",
    ],
  },
  {
    id: "designer",
    label: "Designer Mode",
    title: "Visual polish pass currently active",
    description:
      "Typography rhythm, spacing harmony, and card hierarchy are being tuned page by page.",
    highlights: [
      "Balancing contrast across cards and text blocks",
      "Fine-tuning spacing system for mobile and desktop",
      "Crafting stronger visual focus around key sections",
    ],
  },
];

export function WipModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMode, setActiveMode] = useState<Mode>("developer");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const mode = MODES.find((item) => item.id === activeMode) ?? MODES[0];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label="Close notice"
              className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="wip-modal-title"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl overflow-hidden border border-neutral-200 bg-white shadow-[0_22px_90px_-34px_rgba(0,0,0,0.55)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.2),_transparent_68%)]" />

              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 transition-colors hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
                aria-label="Close popup"
              >
                <X size={16} />
              </button>

              <div className="relative px-5 pb-5 pt-8 sm:px-7 sm:pb-7">
                <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-[var(--color-accent)] uppercase">
                  <Sparkles size={14} />
                  Live notice
                </div>

                <h2
                  id="wip-modal-title"
                  className="font-display text-[34px] leading-[1.05] text-[var(--color-text-primary)]"
                >
                  Working on this page now
                </h2>

                <p className="mt-3 max-w-md text-sm text-[var(--color-text-secondary)] sm:text-[15px]">
                  You can close this window at any moment and explore the app while updates keep coming.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1">
                  {MODES.map((item) => {
                    const isActive = activeMode === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveMode(item.id)}
                        aria-pressed={isActive}
                        className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                          isActive
                            ? "bg-white text-[var(--color-text-primary)] shadow-sm"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-gradient-to-br from-white via-white to-neutral-50 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-secondary)]">
                    {mode.id === "developer" ? <Code2 size={15} /> : <Palette size={15} />}
                    {mode.id === "developer" ? "Developer status" : "Designer status"}
                  </div>

                  <p className="text-sm font-medium text-[var(--color-text-primary)] sm:text-[15px]">
                    {mode.title}
                  </p>

                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{mode.description}</p>

                  <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
                    {mode.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    Close notice
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-colors"
                  >
                    Continue to app
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-[var(--color-text-primary)] shadow-[0_12px_30px_-20px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 sm:text-sm"
        >
          <Sparkles size={14} className="text-[var(--color-accent)]" />
          WIP status
        </button>
      )}
    </>
  );
}
