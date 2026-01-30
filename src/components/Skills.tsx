"use client";

import { FadeUp, StaggerContainer, StaggerItem, SkillChip } from "./animations";
import { skills } from "@/data";

export function Skills() {
  return (
    <FadeUp>
      <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Skills & Stack
        </h2>
        <div className="flex flex-col gap-5">
          {/* Programming Languages */}
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Programming Languages
            </h3>
            <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
              {skills.languages.map((skill) => (
                <StaggerItem key={skill}>
                  <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-[var(--color-accent)] text-white inline-block">
                    {skill}
                  </SkillChip>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Frontend */}
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Frontend
            </h3>
            <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
              {skills.frontend.map((skill) => (
                <StaggerItem key={skill}>
                  <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-black border border-black inline-block">
                    {skill}
                  </SkillChip>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Backend & Databases */}
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Backend & Databases
            </h3>
            <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
              {skills.backend.map((skill) => (
                <StaggerItem key={skill}>
                  <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-black border border-black inline-block">
                    {skill}
                  </SkillChip>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Methodologies */}
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Methodologies
            </h3>
            <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
              {skills.methodologies.map((skill) => (
                <StaggerItem key={skill}>
                  <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-[var(--color-text-secondary)] border border-[var(--color-text-muted)] inline-block">
                    {skill}
                  </SkillChip>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
