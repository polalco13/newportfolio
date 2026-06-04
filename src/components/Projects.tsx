import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { projects } from "@/data";

export function Projects() {
  return (
    <FadeUp>
      <section id="projects" className="flex scroll-mt-24 flex-col gap-6 sm:gap-9">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Selected work
            </p>
            <h2 className="mt-2 font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              Products and useful interfaces.
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
            A focused set of shipped projects showing product thinking, frontend craft, and full-stack delivery.
          </p>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2"
          staggerDelay={0.08}
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <article
                className={`group flex h-full flex-col overflow-hidden border bg-white transition-colors hover:border-[var(--color-border-strong)] ${
                  project.featured
                    ? "border-[var(--color-border-strong)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-soft)] sm:aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  {project.status && (
                    <span className="absolute left-2.5 top-2.5 bg-white/92 px-2.5 py-1 font-body text-[11px] font-semibold text-[var(--color-text-primary)] shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] sm:left-3 sm:top-3 sm:text-xs">
                      {project.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3.5 p-4 sm:gap-4 sm:p-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.14em]">
                      {project.role}
                    </p>
                    <h3 className="font-display text-[26px] italic leading-tight text-[var(--color-text-primary)] sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>

                  <p className="font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {project.description}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-[var(--color-text-primary)]">
                    {project.impact}
                  </p>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[var(--color-bg-soft)] px-2.5 py-1 font-body text-xs font-medium text-[var(--color-text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live site in a new tab`}
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-[var(--color-border-strong)] px-3 py-2 font-body text-xs font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-text-primary)] hover:text-white sm:flex-none"
                      >
                        Live
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title} source code in a new tab`}
                          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-[var(--color-border)] px-3 py-2 font-body text-xs font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] sm:flex-none"
                        >
                          Code
                          <Github size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
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
