"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { education } from "@/data";

export function Education() {
  return (
    <FadeUp>
      <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Education
        </h2>
        <StaggerContainer className="flex flex-col gap-5 sm:gap-6" staggerDelay={0.1}>
          {education.map((edu, i) => (
            <StaggerItem key={i}>
              <div
                className={`flex flex-col gap-2 ${i < education.length - 1 ? "pb-5 sm:pb-6 border-b border-[var(--color-border)]" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)]">
                      {edu.degree}
                    </h3>
                    <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                      {edu.school}
                    </span>
                  </div>
                  <span className="font-body text-xs text-[var(--color-text-muted)]">
                    {edu.years}
                  </span>
                </div>
                <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
