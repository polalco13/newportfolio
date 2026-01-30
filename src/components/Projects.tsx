"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { projects } from "@/data";

export function Projects() {
  return (
    <FadeUp>
      <section
        id="projects"
        className="flex flex-col gap-6 sm:gap-8 scroll-mt-20"
      >
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Selected Projects
        </h2>
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
          staggerDelay={0.1}
        >
          {projects.map((project, i) => (
            <StaggerItem key={i}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group block bg-white border border-[var(--color-border)] overflow-hidden hover:border-black transition-colors"
                aria-label={`${project.title} - Opens in new tab`}
              >
                {/* Project image or placeholder */}
                <div className="aspect-video bg-neutral-100 relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      {/* Stylized placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-700" />
                      <div className="absolute inset-0 opacity-20">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <pattern
                            id={`dots-${i}`}
                            width="8"
                            height="8"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle cx="1" cy="1" r="1" fill="white" />
                          </pattern>
                          <rect
                            width="100"
                            height="100"
                            fill={`url(#dots-${i})`}
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display italic text-5xl sm:text-6xl text-white/10 group-hover:text-white/20 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)] group-hover:text-black">
                      {project.title}
                    </h3>
                    <div
                      className="flex items-center gap-2 shrink-0"
                      aria-hidden="true"
                    >
                      {project.github && (
                        <Github
                          size={14}
                          className="text-[var(--color-text-muted)]"
                        />
                      )}
                      <ExternalLink
                        size={14}
                        className="text-[var(--color-text-muted)] group-hover:text-black transition-colors"
                      />
                    </div>
                  </div>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs text-[var(--color-text-secondary)] bg-neutral-100 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
