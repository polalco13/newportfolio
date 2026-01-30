"use client";

import { FadeUp } from "./animations";
import { personalInfo } from "@/data";

export function About() {
  return (
    <FadeUp>
      <section id="about" className="flex flex-col gap-3 sm:gap-4 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          About
        </h2>
        <p className="font-body text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          {personalInfo.about}
        </p>
      </section>
    </FadeUp>
  );
}
