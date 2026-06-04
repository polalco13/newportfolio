import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { contact, personalInfo } from "@/data";

const contactLinks = [
  {
    label: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: contact.phoneDisplay,
    href: `tel:${contact.phone}`,
    icon: Phone,
    external: false,
  },
  {
    label: "GitHub",
    href: contact.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    icon: Linkedin,
    external: true,
  },
];

export function Contact() {
  return (
    <FadeUp>
      <section
        id="contact"
        className="grid gap-6 border-t border-[var(--color-border-strong)] pt-8 scroll-mt-24 sm:gap-7 sm:pt-10 lg:grid-cols-[1fr_360px] lg:gap-12"
      >
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Contact
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-[34px] italic leading-tight text-[var(--color-text-primary)] sm:text-5xl">
            Interested in frontend or full-stack roles.
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            {personalInfo.availability}. I am especially interested in teams that care about product quality,
            maintainable interfaces, and shipping useful software.
          </p>
        </div>

        <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.06}>
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.href}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.external ? `${item.label} - opens in a new tab` : item.label}
                  className="flex min-h-14 items-center justify-between gap-3 border border-[var(--color-border)] bg-white p-3.5 font-body text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-strong)] sm:p-4"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon size={18} className="shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="min-w-0 truncate">{item.label}</span>
                  </span>
                  {item.external && <span className="text-xs text-[var(--color-text-muted)]">New tab</span>}
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
