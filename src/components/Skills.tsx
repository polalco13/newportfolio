import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { skills } from "@/data";

const skillGroups = [
  { label: "Languages", values: skills.languages },
  { label: "Frontend", values: skills.frontend },
  { label: "Backend & Infrastructure", values: skills.backend },
  { label: "Working Style", values: skills.methodologies },
];

export function Skills() {
  return (
    <FadeUp>
      <section id="skills" className="flex scroll-mt-24 flex-col gap-6 sm:gap-9">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Stack
          </p>
          <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Tools I can be productive with quickly.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="border border-[var(--color-border)] bg-white p-4 sm:p-5">
              <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {group.label}
              </h3>
              <StaggerContainer className="mt-4 flex flex-wrap gap-2" staggerDelay={0.025}>
                {group.values.map((skill) => (
                  <StaggerItem key={skill}>
                    <span className="inline-block bg-[var(--color-bg-soft)] px-3 py-1.5 font-body text-sm font-medium text-[var(--color-text-primary)]">
                      {skill}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </section>
    </FadeUp>
  );
}
