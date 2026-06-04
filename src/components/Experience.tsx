import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { experience } from "@/data";

export function Experience() {
  return (
    <FadeUp>
      <section id="experience" className="grid gap-6 scroll-mt-24 sm:gap-7 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Experience
          </p>
          <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Teams, internships, and product work.
          </h2>
        </div>

        <StaggerContainer className="flex flex-col gap-5 sm:gap-7" staggerDelay={0.1}>
          {experience.map((job) => (
            <StaggerItem key={`${job.role}-${job.company}`}>
              <article className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-0 last:pb-0 sm:py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[26px] italic leading-tight text-[var(--color-text-primary)] sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="font-body text-sm font-semibold text-[var(--color-text-primary)]">
                      {job.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-body text-xs font-semibold px-2.5 py-1 ${
                        job.typeStyle === "filled"
                          ? "bg-[var(--color-text-primary)] text-white"
                          : job.typeStyle === "outlined"
                            ? "border border-[var(--color-border-strong)] bg-white text-[var(--color-text-primary)]"
                            : "border border-[var(--color-border)] bg-white text-[var(--color-text-muted)]"
                      }`}
                    >
                      {job.type}
                    </span>
                    <span className="font-body text-xs font-medium text-[var(--color-text-muted)]">
                      {job.dates}
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {job.description}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
