import { GraduationCap } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { education } from "@/data";

export function Education() {
  return (
    <FadeUp>
      <section id="education" className="grid gap-6 scroll-mt-24 sm:gap-7 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Education
          </p>
          <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Software engineering foundation.
          </h2>
        </div>

        <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
          {education.map((edu) => (
            <StaggerItem key={`${edu.degree}-${edu.school}`}>
              <article className="border border-[var(--color-border)] bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <GraduationCap
                      size={22}
                      className="mt-1 shrink-0 text-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-[24px] italic leading-tight text-[var(--color-text-primary)] sm:text-2xl">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 font-body text-sm font-semibold text-[var(--color-text-primary)]">
                        {edu.school}
                      </p>
                    </div>
                  </div>
                  <span className="font-body text-xs font-medium text-[var(--color-text-muted)]">
                    {edu.years}
                  </span>
                </div>

                <p className="mt-4 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {edu.description}
                </p>

                <div className="mt-5 grid gap-3 border-t border-[var(--color-border)] pt-5">
                  {edu.thesis && (
                    <p className="font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        Bachelor&apos;s Thesis:
                      </span>{" "}
                      {edu.thesis}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {edu.grade && (
                      <span className="border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2.5 py-1 font-body text-xs font-semibold text-[var(--color-text-primary)]">
                        Grade: {edu.grade}
                      </span>
                    )}
                    {edu.specialization && (
                      <span className="border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2.5 py-1 font-body text-xs font-semibold text-[var(--color-text-primary)]">
                        {edu.specialization}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
