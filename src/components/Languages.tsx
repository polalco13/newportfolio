"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { languages } from "@/data";

export function Languages() {
  return (
    <FadeUp>
      <section className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Languages
        </h2>
        <StaggerContainer className="flex flex-col gap-2 sm:gap-3" staggerDelay={0.1}>
          {languages.map((lang) => (
            <StaggerItem key={lang.name}>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                  {lang.name}
                </span>
                <span className="font-body text-xs text-[var(--color-text-muted)]">
                  {lang.level}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
