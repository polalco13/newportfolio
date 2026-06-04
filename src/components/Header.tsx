import { ArrowDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { AvatarPulse, FadeUp } from "./animations";
import { contact, personalInfo } from "@/data";

export function Header() {
  return (
    <header className="grid gap-8 pt-16 sm:min-h-[calc(100vh-5rem)] sm:content-center sm:gap-10 sm:pt-20 lg:grid-cols-[1fr_300px] lg:items-center">
      <div className="order-2 flex flex-col gap-5 sm:gap-6 lg:order-1">
        <FadeUp>
          <div className="flex flex-wrap items-center gap-2 font-body text-[11px] font-medium leading-relaxed text-[var(--color-text-muted)] sm:gap-3 sm:text-xs">
            <span className="inline-flex items-center gap-2 text-[var(--color-accent)]">
              <span className="h-2 w-2 bg-[var(--color-accent)]" />
              {personalInfo.availability}
            </span>
            <span className="hidden h-1 w-1 bg-[var(--color-border-strong)] sm:inline-block" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {personalInfo.location}
            </span>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-3 sm:gap-4">
          <FadeUp delay={0.08}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)] sm:text-sm sm:tracking-[0.16em]">
              {personalInfo.title}
            </p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <h1 className="max-w-3xl font-display text-[42px] italic leading-none text-[var(--color-text-primary)] sm:text-[64px] lg:text-[78px]">
              {personalInfo.name}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="max-w-2xl font-body text-base leading-7 text-[var(--color-text-secondary)] sm:text-xl sm:leading-relaxed">
              {personalInfo.tagline}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.26}>
          <ul className="grid gap-2 border-l border-[var(--color-border)] pl-4 font-body text-[13px] leading-relaxed text-[var(--color-text-secondary)] sm:grid-cols-3 sm:border-l-0 sm:pl-0 sm:text-sm">
            {personalInfo.highlights.map((highlight) => (
              <li key={highlight} className="sm:border-l sm:border-[var(--color-border)] sm:pl-4">
                {highlight}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.32}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[var(--color-text-primary)] px-5 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent)]"
            >
              <Mail size={16} aria-hidden="true" />
              Contact me
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--color-border-strong)] px-5 py-3 font-body text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-text-primary)] hover:bg-[var(--color-bg-soft)]"
            >
              View selected work
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.18} className="order-1 hidden justify-self-center sm:block lg:order-2 lg:justify-self-end">
        <div className="relative aspect-[9/16] w-[150px] sm:w-[220px] lg:w-[250px]">
          <div className="absolute inset-0 border border-[var(--color-border-strong)] bg-white" />
          <div className="absolute -bottom-2 -right-2 h-full w-full bg-[var(--color-accent-light)] sm:-bottom-3 sm:-right-3" />
          <AvatarPulse className="relative h-full w-full overflow-hidden border border-[var(--color-border-strong)] bg-white">
            <video
              className="motion-portrait-video h-full w-full bg-black object-contain"
              aria-label={`${personalInfo.name} animated profile portrait`}
              autoPlay
              loop
              muted
              playsInline
              poster="/profile.jpeg"
              preload="metadata"
            >
              <source src="/alco.mp4" type="video/mp4" />
            </video>
            <Image
              src="/profile.jpeg"
              alt={`${personalInfo.name} profile portrait`}
              fill
              className="motion-portrait-poster hidden object-contain object-[center_24%]"
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 220px, 250px"
              priority
            />
          </AvatarPulse>
        </div>
      </FadeUp>
    </header>
  );
}
