// Navigation
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Projects
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Grade Tracker",
    description:
      "Best grade calculator for university students. Track your academic progress and calculate your GPA easily.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://www.gradetracker.es/",
    image: "/gt-20260413.png",
  },
  {
    title: "Mon DJ Portfolio",
    description:
      "Dynamic portfolio website for DJ services. Showcasing events, mixes, and booking information.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://mondj-website.vercel.app/",
    image: "/mondj.png",
  },
  {
    title: "Bus Schedule",
    description:
      "Best bus schedule app for Alt Penedès - Barcelona route. Real-time updates and trip planning.",
    tags: ["JavaScript", "API", "CSS3"],
    link: "https://busos-alco.vercel.app/",
    github: "https://github.com/polalco13/transport-penedes",
    image: "/busos.png",
  },
  {
    title: "FIB HUB",
    description:
      "Your resource hub for FIB. Everything you need to complete your degree: notes, exams, solutions, professor reviews, and much more.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://fib-hub.vercel.app/",
    image: "/fibhub.png",
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
    role: "Frontend Developer",
    company: "Opsmonitor (California, USA)",
    dates: "Feb 2026 — Apr 2026",
    type: "Remote",
    typeStyle: "filled",
    description:
      "Developed the infrastructure and core components for a new web application to optimize processes in a U.S.-based logistics company, building a scalable and maintainable frontend using React.",
    bullets: [
      "Built a scalable React frontend architecture and reusable core components",
      "Used AI tools and agentic systems to improve efficiency and automate workflows",
    ],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "ESSI - UPC (Barcelona, Spain)",
    dates: "Sep 2025 — Jan 2026",
    type: "Internship",
    typeStyle: "outlined",
    description:
      "Implemented a fully customized deployment of the Taiga platform using Docker, including backend, frontend, and asynchronous services.",
    bullets: [
      "Implemented and customized a full Docker-based deployment of Taiga",
      "Configured backend, frontend, and async services for software engineering course project tracking",
    ],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "GooApps (Barcelona, Spain)",
    dates: "Mar 2025 — Jul 2025",
    type: "Internship",
    typeStyle: "muted",
    description:
      "Developed and maintained mobile applications using React and contributed to CRM systems built with Angular.",
    bullets: [
      "Contributed to React-based mobile apps and Angular CRM features",
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
    school: "Universitat Politècnica de Catalunya (UPC) - FIB",
    years: "2021 — 2026",
    description: "",
    thesis:
      "Adaptation and Extension of the Taiga Tool for Project Tracking in Software Engineering Courses.",
    grade: "9.3/10 (Excellent)",
    specialization:
      "Advanced software architecture, agile methodologies, and full-stack development.",
  },
];

// Skills
export const skills = {
  languages: ["Java", "Python", "C++", "JavaScript", "TypeScript", "SQL"],
  frontend: ["React.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "PostgreSQL", "MySQL"],
  methodologies: ["Agile", "Scrum"],
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
  title: "Software Engineer · Full-Stack Developer",
  tagline:
    "I build web and mobile apps that people actually want to use. Fresh CS grad from FIB-UPC, based in Barcelona.",
  location: "Barcelona, Spain",
  timezone: "CET (UTC+1)",
  about:
    "Recent Software Engineering graduate from FIB-UPC with hands-on experience in frontend and full-stack development. Skilled in building scalable web applications with React, Next.js, Firebase, and Docker, as well as integrating AI-powered features and automation workflows. Passionate about creating high-performance, accessible, and user-centered digital products.",
};
