import { FadeUp } from "./animations";
import { personalInfo } from "@/data";

export function About() {
  return (
    <FadeUp>
      <section id="about" className="grid gap-5 scroll-mt-24 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            About
          </p>
          <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Practical product engineering.
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <p className="font-body text-[15px] leading-7 text-[var(--color-text-secondary)] sm:text-lg sm:leading-relaxed">
            {personalInfo.about}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {personalInfo.highlights.map((highlight) => (
              <div
                key={highlight}
                className="border border-[var(--color-border)] bg-white p-3.5 sm:p-4"
              >
                <p className="font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
