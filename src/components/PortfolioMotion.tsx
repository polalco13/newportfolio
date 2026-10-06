"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: all content stays visible without JavaScript. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!preference.matches) {
          animation = element.animate(
            [{ transform: "translateY(28px)", opacity: 0.3 }, { transform: "translateY(0)", opacity: 1 }],
            { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    const onPreferenceChange = () => {
      if (preference.matches) animation?.cancel();
    };
    preference.addEventListener("change", onPreferenceChange);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
