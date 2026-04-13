"use client";

import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { AvatarPulse } from "./animations";
import { personalInfo } from "@/data";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-4 sm:gap-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[var(--color-text-muted)] tracking-wide"
      >
        <span className="inline-block w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
        <span className="text-[var(--color-accent)] font-medium">Available for work</span>
        <span className="text-[var(--color-text-muted)]">·</span>
        <span>{personalInfo.location}</span>
      </motion.div>

      {/* Avatar with accent ring */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-accent)] to-blue-400 rounded-full opacity-75 blur-sm" />
        <AvatarPulse className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden cursor-pointer ring-2 ring-white bg-white">
          <Image
            src="/profile.jpeg"
            alt={`${personalInfo.name} profile picture`}
            fill
            className="object-contain scale-130 mt-4"
            sizes="(max-width: 640px) 100px, 120px"
            priority
          />
        </AvatarPulse>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display italic text-[36px] sm:text-[48px] text-[var(--color-text-primary)] text-center"
      >
        {personalInfo.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-body text-sm sm:text-base text-[var(--color-text-secondary)] text-center max-w-md"
      >
        {personalInfo.tagline}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-3 pt-2"
      >
        <a
          href="#contact"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-body text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Mail size={16} />
          Get in touch
        </a>
        <a
          href="#projects"
          className="flex items-center gap-2 px-5 py-2.5 border border-black text-black font-body text-sm font-medium hover:bg-neutral-100 transition-colors"
        >
          View my work
          <ArrowDown size={16} />
        </a>
      </motion.div>
    </header>
  );
}
