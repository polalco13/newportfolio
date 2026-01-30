"use client";

import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, AnimatedLink } from "./animations";
import { contact } from "@/data";

export function Contact() {
  return (
    <FadeUp>
      <section id="contact" className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Contact
        </h2>
        <StaggerContainer className="flex flex-col gap-3 sm:gap-4" staggerDelay={0.1}>
          <StaggerItem>
            <AnimatedLink
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <Mail size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
              <span className="font-body text-sm text-[var(--color-text-primary)]">
                {contact.email}
              </span>
            </AnimatedLink>
          </StaggerItem>
          <StaggerItem>
            <AnimatedLink
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <Phone size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
              <span className="font-body text-sm text-[var(--color-text-primary)]">
                {contact.phoneDisplay}
              </span>
            </AnimatedLink>
          </StaggerItem>
          <StaggerItem>
            <AnimatedLink
              href={contact.github}
              external
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <Github size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
              <span className="font-body text-sm text-[var(--color-text-primary)]">
                github
                <span className="sr-only"> (opens in new tab)</span>
              </span>
            </AnimatedLink>
          </StaggerItem>
          <StaggerItem>
            <AnimatedLink
              href={contact.linkedin}
              external
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <Linkedin size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
              <span className="font-body text-sm text-[var(--color-text-primary)]">
                linkedin
                <span className="sr-only"> (opens in new tab)</span>
              </span>
            </AnimatedLink>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
