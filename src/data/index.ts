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
    link: "https://www.gradetracker.es/"
  },
  {
    title: "DJ Portfolio",
    description:
      "Dynamic portfolio website for DJ services. Showcasing events, mixes, and booking information.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://dj-alco.vercel.app/",
  },
  {
    title: "Bus Schedule",
    description:
      "Best bus schedule app for Alt Penedès - Barcelona route. Real-time updates and trip planning.",
    tags: ["JavaScript", "API", "CSS3"],
    link: "https://busos-alco.vercel.app/",
    github: "https://github.com/polalco13/transport-penedes",
  },
  {
    title: "Contenido De Calidad",
    description:
      "Platform for selling digital items. E-commerce solution with secure payments and content delivery.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://github.com/polalcoverro/contenido-de-calidad",
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

// Education
export interface Education {
  degree: string;
  school: string;
  years: string;
  description: string;
}

export const education: Education[] = [
  {
    degree: "Computer Engineering",
    school: "Facultat d'Informàtica de Barcelona (FIB-UPC)",
    years: "2021 — 2025",
    description:
      "Comprehensive program covering software development, algorithms, databases, and system architecture. Specialized in full-stack development.",
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
  { name: "English", level: "Fluent" },
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
    "I recently graduated in Computer Engineering from FIB-UPC and I'm looking for my first full-time role. During my internships at GooApps and ESSI-UPC, I shipped React Native apps, built Angular CRMs, and deployed containerized platforms with Docker. When I'm not coding, I DJ at private events — it taught me how to read a room and deliver under pressure. I care about clean code, good UX, and building things that solve real problems.",
};
