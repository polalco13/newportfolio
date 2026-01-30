"use client";

import { Mail, Linkedin, Phone, ExternalLink, Github, Menu, X } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  AvatarPulse,
  SkillChip,
  AnimatedLink,
  HoverLift,
} from "@/components/animations";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Navigation items
const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Data
const projects = [
  {
    title: "Grade Tracker",
    description: "Best grade calculator for university students. Track your academic progress and calculate your GPA easily.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://github.com/polalcoverro/grade-tracker",
    github: "https://github.com/polalcoverro/grade-tracker",
  },
  {
    title: "DJ Portfolio",
    description: "Dynamic portfolio website for DJ services. Showcasing events, mixes, and booking information.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/polalcoverro/dj-portfolio",
    github: "https://github.com/polalcoverro/dj-portfolio",
  },
  {
    title: "Bus Schedule",
    description: "Best bus schedule app for Alt Penedès - Barcelona route. Real-time updates and trip planning.",
    tags: ["JavaScript", "API", "CSS3"],
    link: "https://github.com/polalcoverro/bus-schedule",
    github: "https://github.com/polalcoverro/bus-schedule",
  },
  {
    title: "Contenido De Calidad",
    description: "Platform for selling digital items. E-commerce solution with secure payments and content delivery.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://github.com/polalcoverro/contenido-de-calidad",
  },
];

const experience = [
  {
    role: "Intern Full-Stack Developer",
    company: "GooApps®",
    dates: "2025",
    type: "Internship",
    typeStyle: "filled",
    description:
      "Developed and maintained mobile applications using React and worked on CRM systems built with Angular.",
    bullets: [
      "Built mobile apps with React Native",
      "Developed CRM features using Angular",
      "Collaborated in Agile/Scrum environment",
    ],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "ESSI - UPC",
    dates: "2025",
    type: "Internship",
    typeStyle: "outlined",
    description:
      "Implemented a fully customized deployment of the Taiga platform using Docker, including backend, frontend, and asynchronous services.",
    bullets: [
      "Deployed Taiga platform with Docker",
      "Configured backend and frontend services",
      "Set up asynchronous task processing",
    ],
  },
  {
    role: "DJ",
    company: "Freelance",
    dates: "2020 — Present",
    type: "Freelance",
    typeStyle: "muted",
    description:
      "Working as a DJ for private and corporate events. Professional reliability and client management.",
    bullets: [
      "Managed private and corporate events",
      "Built strong client relationships",
      "Developed professional reliability skills",
    ],
  },
];

const education = [
  {
    degree: "Computer Engineering",
    school: "Facultat d'Informàtica de Barcelona (FIB-UPC)",
    years: "2021 — 2025",
    description:
      "Comprehensive program covering software development, algorithms, databases, and system architecture. Specialized in full-stack development.",
  },
];

const skills = {
  languages: ["Java", "Python", "C++", "JavaScript", "TypeScript", "SQL"],
  frontend: ["React.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "PostgreSQL", "MySQL"],
  tools: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
  methodologies: ["Agile", "Scrum"],
};

const tools = [
  { name: "VS Code", icon: "terminal" },
  { name: "GitHub", icon: "code" },
  { name: "Docker", icon: "deployed_code" },
  { name: "Postman", icon: "api" },
  { name: "Git", icon: "account_tree" },
];

const languages = [
  { name: "Spanish", level: "Native" },
  { name: "Catalan", level: "Native" },
  { name: "English", level: "Fluent" },
];

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip Link for accessibility */}
      <a href="#main-content" className="skip-link font-body text-sm">
        Skip to main content
      </a>

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]"
      >
        <div className="max-w-[680px] mx-auto px-5 sm:px-10 py-3 flex items-center justify-between">
          <a href="#" className="font-display italic text-lg text-[var(--color-text-primary)]">
            PA
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 -mr-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main id="main-content" className="min-h-screen bg-[var(--color-bg)] py-12 px-5 sm:py-16 sm:px-10">
        <div className="max-w-[680px] mx-auto flex flex-col gap-12 sm:gap-16">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[var(--color-text-muted)] tracking-wide"
          >
            <span>Barcelona, Spain</span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span>CET (UTC+1)</span>
          </motion.div>

          <AvatarPulse className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-black flex items-center justify-center cursor-pointer">
            <span className="font-body text-[30px] sm:text-[36px] font-medium text-white">
              PA
            </span>
          </AvatarPulse>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display italic text-[36px] sm:text-[48px] text-[var(--color-text-primary)] text-center"
          >
            Pol Alcoverro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-sm sm:text-base text-[var(--color-text-secondary)] text-center"
          >
            Software Engineer · Full-Stack Developer
          </motion.p>
        </header>

        {/* About */}
        <FadeUp>
          <section id="about" className="flex flex-col gap-3 sm:gap-4 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              About
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
              As a dedicated and innovative software engineer recently graduated
              in Computer Engineering from FIB-UPC, I am passionate about developing
              cutting-edge solutions that drive business success and enhance user
              experiences. My expertise lies in full-stack development, where I
              leverage my skills in various programming languages and frameworks.
            </p>
          </section>
        </FadeUp>

        {/* Projects */}
        <FadeUp>
          <section id="projects" className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Selected Projects
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6" staggerDelay={0.1}>
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
                    {/* Image placeholder - geometric pattern */}
                    <div className="aspect-video bg-[var(--color-text-primary)] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <pattern id={`grid-${i}`} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                          <rect width="100" height="100" fill={`url(#grid-${i})`}/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display italic text-4xl sm:text-5xl text-white/20 group-hover:text-white/30 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)] group-hover:text-black">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
                          {project.github && (
                            <Github size={14} className="text-[var(--color-text-muted)]" />
                          )}
                          <ExternalLink size={14} className="text-[var(--color-text-muted)] group-hover:text-black transition-colors" />
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

        {/* Experience */}
        <FadeUp>
          <section id="experience" className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Experience
            </h2>
            <StaggerContainer className="flex flex-col gap-6 sm:gap-8" staggerDelay={0.15}>
              {experience.map((job, i) => (
                <StaggerItem key={i}>
                  <HoverLift
                    className={`flex flex-col gap-3 ${i < experience.length - 1 ? "pb-6 sm:pb-8 border-b border-[var(--color-border)]" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)]">
                          {job.role}
                        </h3>
                        <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                          {job.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-body text-xs font-medium px-2.5 py-1 transition-all ${
                            job.typeStyle === "filled"
                              ? "bg-black text-white"
                              : job.typeStyle === "outlined"
                                ? "bg-white text-black border border-black"
                                : "bg-white text-[var(--color-text-muted)] border border-[var(--color-text-muted)]"
                          }`}
                        >
                          {job.type}
                        </span>
                        <span className="font-body text-xs text-[var(--color-text-muted)]">
                          {job.dates}
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {job.description}
                    </p>
                    <ul className="flex flex-col gap-1.5 pl-4 pt-2">
                      {job.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="font-body text-sm text-[var(--color-text-secondary)]"
                        >
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </FadeUp>

        {/* Education */}
        <FadeUp>
          <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Education
            </h2>
            <StaggerContainer className="flex flex-col gap-5 sm:gap-6" staggerDelay={0.1}>
              {education.map((edu, i) => (
                <StaggerItem key={i}>
                  <div
                    className={`flex flex-col gap-2 ${i < education.length - 1 ? "pb-5 sm:pb-6 border-b border-[var(--color-border)]" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display italic text-lg sm:text-xl text-[var(--color-text-primary)]">
                          {edu.degree}
                        </h3>
                        <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                          {edu.school}
                        </span>
                      </div>
                      <span className="font-body text-xs text-[var(--color-text-muted)]">
                        {edu.years}
                      </span>
                    </div>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </FadeUp>

        {/* Skills & Stack */}
        <FadeUp>
          <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Skills & Stack
            </h2>
            <div className="flex flex-col gap-5">
              {/* Programming Languages */}
              <div className="flex flex-col gap-2">
                <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
                  Programming Languages
                </h3>
                <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
                  {skills.languages.map((skill) => (
                    <StaggerItem key={skill}>
                      <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-black text-white inline-block">
                        {skill}
                      </SkillChip>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Frontend */}
              <div className="flex flex-col gap-2">
                <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
                  Frontend
                </h3>
                <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
                  {skills.frontend.map((skill) => (
                    <StaggerItem key={skill}>
                      <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-black border border-black inline-block">
                        {skill}
                      </SkillChip>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Backend & Databases */}
              <div className="flex flex-col gap-2">
                <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
                  Backend & Databases
                </h3>
                <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
                  {skills.backend.map((skill) => (
                    <StaggerItem key={skill}>
                      <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-black border border-black inline-block">
                        {skill}
                      </SkillChip>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Methodologies */}
              <div className="flex flex-col gap-2">
                <h3 className="font-body text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
                  Methodologies
                </h3>
                <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
                  {skills.methodologies.map((skill) => (
                    <StaggerItem key={skill}>
                      <SkillChip className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 bg-white text-[var(--color-text-secondary)] border border-[var(--color-text-muted)] inline-block">
                        {skill}
                      </SkillChip>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* Tools */}
        <FadeUp>
          <section className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Tools
            </h2>
            <StaggerContainer className="flex flex-wrap gap-5 sm:gap-6" staggerDelay={0.06}>
              {tools.map((tool) => (
                <StaggerItem key={tool.name}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-2 w-16 sm:w-20"
                  >
                    <span
                      className="material-symbols-rounded text-2xl sm:text-3xl text-black"
                      style={{ fontWeight: 300 }}
                      aria-hidden="true"
                    >
                      {tool.icon}
                    </span>
                    <span className="font-body text-xs text-[var(--color-text-secondary)]">
                      {tool.name}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </FadeUp>

        {/* Languages */}
        <FadeUp>
          <section className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Languages
            </h2>
            <StaggerContainer className="flex flex-col gap-2 sm:gap-3" staggerDelay={0.1}>
              {languages.map((lang) => (
                <StaggerItem key={lang.name}>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                      {lang.name}
                    </span>
                    <span className="font-body text-xs text-[var(--color-text-muted)]">
                      {lang.level}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </FadeUp>

        {/* Contact */}
        <FadeUp>
          <section id="contact" className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
            <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Contact
            </h2>
            <StaggerContainer className="flex flex-col gap-3 sm:gap-4" staggerDelay={0.1}>
              <StaggerItem>
                <AnimatedLink
                  href="mailto:polalcoverros@gmail.com"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <Mail size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
                  <span className="font-body text-sm text-[var(--color-text-primary)]">
                    polalcoverros@gmail.com
                  </span>
                </AnimatedLink>
              </StaggerItem>
              <StaggerItem>
                <AnimatedLink
                  href="tel:+34633951444"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <Phone size={18} className="text-[var(--color-text-muted)]" aria-hidden="true" />
                  <span className="font-body text-sm text-[var(--color-text-primary)]">
                    (+34) 633 951 444
                  </span>
                </AnimatedLink>
              </StaggerItem>
              <StaggerItem>
                <AnimatedLink
                  href="https://github.com/polalco13"
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
                  href="https://www.linkedin.com/in/pol-alcoverro-sabat%C3%A9-6519192a1/"
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

        {/* Footer */}
        <footer className="pt-10 sm:pt-12 border-t border-[var(--color-border)]">
          <p className="font-body text-xs text-[var(--color-text-muted)] text-center">
            © {new Date().getFullYear()} Pol Alcoverro · Designed & built in Barcelona
          </p>
        </footer>
      </div>
    </main>
    </>
  );
}
