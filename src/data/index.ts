// Navigation
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Projects
export interface Project {
  title: string;
  role: string;
  description: string;
  impact: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
  featured?: boolean;
  status?: string;
}

export const projects: Project[] = [
  {
    title: "Grade Tracker",
    role: "Product engineering, frontend architecture",
    description:
      "A university grade calculator and progress tracker designed to make GPA planning easier to understand.",
    impact:
      "Turns scattered course grades into a clear academic picture with fast what-if calculations and a focused UX.",
    tags: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://www.gradetracker.es/",
    image: "/gt-20260413.png",
    featured: true,
    status: "Live product",
  },
  {
    title: "Mon DJ Portfolio",
    role: "Frontend development, motion system",
    description:
      "A responsive portfolio for DJ services, built around event discovery, media presentation, and booking intent.",
    impact:
      "Gives the artist a polished web presence with clear paths from profile to mixes and booking details.",
    tags: ["React", "Tailwind CSS", "Motion"],
    liveUrl: "https://mondj-website.vercel.app/",
    image: "/mondj.png",
    status: "Client portfolio",
  },
  {
    title: "Bus Schedule",
    role: "Product design, API integration",
    description:
      "A route-focused schedule app for the Alt Penedes - Barcelona commute.",
    impact:
      "Makes frequently checked timetable information easier to scan on mobile, with direct access to route details.",
    tags: ["JavaScript", "API", "CSS3"],
    liveUrl: "https://busos-alco.vercel.app/",
    githubUrl: "https://github.com/polalco13/transport-penedes",
    image: "/busos.png",
    status: "Live utility",
  },
  {
    title: "FIB HUB",
    role: "Full-stack product development",
    description:
      "A student resource hub for FIB with notes, exams, solutions, professor reviews, and degree support material.",
    impact:
      "Centralizes fragmented academic resources into one searchable, student-friendly experience.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://fib-hub.vercel.app/",
    image: "/fibhub.png",
    featured: true,
    status: "Student platform",
  },
];

// Experience
export interface Experience {
  role: string;
  company: string;
  dates: string;
  type: string;
  typeStyle: "filled" | "outlined" | "muted";
  description: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Mafrica (Manresa, Barcelona)",
    dates: "May 2026 - Present",
    type: "On-site",
    typeStyle: "filled",
    description:
      "Maintaining and developing useful internal software for the company, with a focus on practical tools that support day-to-day operations.",
    bullets: [
      "Maintain existing business software and improve reliability for internal users",
      "Develop practical features and workflow improvements aligned with company needs",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Opsmonitor (California, USA)",
    dates: "Feb 2026 - Apr 2026",
    type: "Remote",
    typeStyle: "outlined",
    description:
      "Developed infrastructure and core UI for a new logistics web application, with a focus on maintainable React components and reliable delivery.",
    bullets: [
      "Built reusable React UI primitives and application structure for workflow tooling",
      "Used AI-assisted development workflows to speed up iteration while keeping the codebase typed and maintainable",
    ],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "ESSI - UPC (Barcelona, Spain)",
    dates: "Sep 2025 - Jan 2026",
    type: "Internship",
    typeStyle: "outlined",
    description:
      "Implemented a customized Taiga deployment for software engineering course project tracking, covering backend, frontend, and asynchronous services.",
    bullets: [
      "Customized a Docker-based deployment with service configuration and environment setup",
      "Supported academic project workflows used by software engineering students and instructors",
    ],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "GooApps (Barcelona, Spain)",
    dates: "Mar 2025 - Jul 2025",
    type: "Internship",
    typeStyle: "muted",
    description:
      "Developed and maintained React-based mobile applications and contributed to Angular CRM features in a production team.",
    bullets: [
      "Worked across mobile UI, CRM screens, bug fixes, and production-facing feature improvements",
    ],
  },
];

// Education
export interface Education {
  degree: string;
  school: string;
  years: string;
  description: string;
  thesis?: string;
  grade?: string;
  specialization?: string;
}

export const education: Education[] = [
  {
    degree: "B.S. in Computer Engineering (Software Engineering Major)",
    school: "Universitat Politecnica de Catalunya (UPC) - FIB",
    years: "2021 - 2026",
    description:
      "Software engineering track focused on architecture, agile methods, full-stack development, and project delivery.",
    thesis:
      "Adaptation and Extension of the Taiga Tool for Project Tracking in Software Engineering Courses.",
    grade: "9.3/10 (Excellent)",
    specialization:
      "Advanced software architecture, agile methodologies, and full-stack development.",
  },
];

// Skills
export const skills = {
  languages: ["TypeScript", "JavaScript", "Java", "Python", "C++", "SQL"],
  frontend: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML", "CSS"],
  backend: ["Node.js", "PostgreSQL", "MySQL", "Docker"],
  methodologies: ["Agile", "Scrum", "AI-assisted workflows"],
};

// Tools
export interface Tool {
  name: string;
  icon: "vscode" | "github" | "docker" | "postman" | "git";
}

export const tools: Tool[] = [
  { name: "VS Code", icon: "vscode" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "Postman", icon: "postman" },
  { name: "Git", icon: "git" },
];

// Languages
export interface Language {
  name: string;
  level: string;
}

export const languages: Language[] = [
  { name: "Spanish", level: "Native" },
  { name: "Catalan", level: "Native" },
  { name: "English", level: "Fluent (B2)" },
];

// Contact
export const contact = {
  email: "polalcoverros@gmail.com",
  phone: "+34633951444",
  phoneDisplay: "(+34) 633 951 444",
  github: "https://github.com/polalco13",
  linkedin: "https://www.linkedin.com/in/pol-alcoverro-sabat%C3%A9-6519192a1/",
};

// Personal info
export const personalInfo = {
  name: "Pol Alcoverro",
  initials: "PA",
  title: "Software Engineer | Full-Stack Developer",
  tagline:
    "I build production-minded web and mobile apps with React, Next.js, Angular, and Node.js.",
  location: "Barcelona, Spain",
  timezone: "CET (UTC+1)",
  availability: "Available for frontend and full-stack roles",
  highlights: [
    "FIB-UPC Software Engineering graduate",
    "React, Next.js, Angular, Node.js",
    "Barcelona-based, open to remote teams",
  ],
  about:
    "Recent Software Engineering graduate from FIB-UPC with hands-on experience across frontend, full-stack, and mobile work. I care about clear interfaces, maintainable systems, accessible details, and shipping products that are useful beyond the demo.",
};
