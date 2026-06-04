import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { languages } from "@/data";

export function Languages() {
  return (
    <FadeUp>
      <section className="grid gap-5 scroll-mt-24 sm:grid-cols-[220px_1fr] sm:items-start">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Languages
          </p>
          <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Communication
          </h2>
        </div>

        <StaggerContainer className="grid gap-3 sm:grid-cols-3" staggerDelay={0.06}>
          {languages.map((lang) => (
            <StaggerItem key={lang.name}>
              <div className="border border-[var(--color-border)] bg-white p-3.5 sm:p-4">
                <span className="font-body text-sm font-semibold text-[var(--color-text-primary)]">
                  {lang.name}
                </span>
                <p className="mt-1 font-body text-xs font-medium text-[var(--color-text-muted)]">
                  {lang.level}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
