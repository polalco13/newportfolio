"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.4,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  className = "",
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { scale }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AvatarPulse({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

export function SkillChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={reduceMotion ? undefined : { x: 3 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
