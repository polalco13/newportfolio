"use client";

import { FadeUp, StaggerContainer, StaggerItem, HoverLift } from "./animations";
import { experience } from "@/data";

export function Experience() {
  return (
    <FadeUp>
      <section
        id="experience"
        className="flex flex-col gap-6 sm:gap-8 scroll-mt-20"
      >
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Experience
        </h2>
        <StaggerContainer className="flex flex-col gap-6 sm:gap-8" staggerDelay={0.15}>
          {experience.map((job, i) => (
            <StaggerItem key={i}>
              <HoverLift
                className={`flex flex-col gap-3 ${i < experience.length - 1 ? "pb-6 sm:pb-8 border-b border-[var(--color-border)]" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)]">
                      {job.role}
                    </h3>
                    <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                      {job.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-body text-xs font-medium px-2.5 py-1 transition-all ${
                        job.typeStyle === "filled"
                          ? "bg-black text-white"
                          : job.typeStyle === "outlined"
                            ? "bg-white text-black border border-black"
                            : "bg-white text-[var(--color-text-muted)] border border-[var(--color-text-muted)]"
                      }`}
                    >
                      {job.type}
                    </span>
                    <span className="font-body text-xs text-[var(--color-text-muted)]">
                      {job.dates}
                    </span>
                  </div>
                </div>
                <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {job.description}
                </p>
                <ul className="flex flex-col gap-1.5 pl-4 pt-2">
                  {job.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="font-body text-sm text-[var(--color-text-secondary)]"
                    >
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
