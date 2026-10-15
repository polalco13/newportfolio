export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  domain?: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Client work without a public URL or screenshots. */
  confidential?: {
    headline: string;
    facts: string[];
  };
  problem: string;
  role: string;
  process: string;
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "grade-tracker",
    title: "Grade Tracker",
    category: "Academic planning",
    domain: "gradetracker.es",
    summary: "A clearer picture of your grades. A better plan for what’s next.",
    tags: ["React", "TypeScript", "Node.js"],
    image: "/gt.png",
    imageAlt: "Grade Tracker homepage with course grades and academic planning",
    liveUrl: "https://www.gradetracker.es/",
    problem:
      "Course grades are scattered, and understanding how a result affects an overall average can turn into a spreadsheet exercise.",
    role: "Product engineering and frontend architecture for a university grade calculator and progress tracker.",
    process:
      "Bring course grades, progress, and what-if calculations into a focused interface. Use React and TypeScript for the frontend, with Node.js supporting the product.",
    outcome:
      "A live product that turns individual course results into an understandable academic overview and helps students explore their next steps.",
  },
  {
    slug: "fib-hub",
    title: "FIB Hub",
    category: "Student platform",
    domain: "fib-hub.vercel.app",
    summary:
      "One place for the resources that get students through their degree.",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "/projects/fib-hub-preview.webp",
    imageAlt: "FIB Hub student resource platform homepage",
    liveUrl: "https://fib-hub.vercel.app/",
    problem:
      "Notes, past exams, solutions, and course advice are fragmented, making useful study material harder to find.",
    role: "Full-stack product development of a resource hub for students at FIB.",
    process:
      "Centralize academic resources and professor reviews in a searchable experience, connecting a React interface with Node.js and PostgreSQL.",
    outcome:
      "A student platform that brings study resources and degree support material together in one accessible place.",
  },
  {
    slug: "mon-dj",
    title: "Mon DJ",
    category: "Artist website",
    domain: "mondj-website.vercel.app",
    summary:
      "An artist’s identity, translated into a booking-focused web presence.",
    tags: ["React", "Tailwind CSS", "Motion"],
    image: "/projects/mon-dj-preview.webp",
    imageAlt: "Mon DJ artist portfolio website",
    liveUrl: "https://mondj-website.vercel.app/",
    problem:
      "Potential clients need to understand an artist’s style, explore their work, and find booking information without friction.",
    role: "Frontend development and motion system for a responsive DJ services portfolio.",
    process:
      "Organize the experience around event discovery, media, and booking intent. Build responsive layouts with React and Tailwind CSS, using motion to support navigation and presentation.",
    outcome:
      "A live artist website with clear paths from the profile to mixes and booking details, across desktop and mobile.",
  },
  {
    slug: "bus-schedule",
    title: "Bus Schedule",
    category: "Everyday utility",
    domain: "busos-alco.vercel.app",
    summary: "Less searching. More certainty about the next bus to Barcelona.",
    tags: ["JavaScript", "Local timetable data", "CSS"],
    image: "/projects/bus-schedule-preview.webp",
    imageAlt:
      "Bus Schedule app showing routes and timetables for the Penedès area",
    liveUrl: "https://busos-alco.vercel.app/",
    githubUrl: "https://github.com/polalco13/transport-penedes",
    problem:
      "For the Alt Penedès-Barcelona commute, timetable information needs to be fast to find and easy to read on a phone.",
    role: "Product design and development of a route-focused timetable application.",
    process:
      "Prioritize frequently checked routes and present local timetable data in a mobile-friendly interface, with origin, destination, and travel-day filters.",
    outcome:
      "A live utility that makes commuting information easier to scan, with direct access to route details and publicly available source code.",
  },
  {
    slug: "opsmonitor",
    title: "Opsmonitor",
    category: "Client project · Logistics",
    summary:
      "The foundations of a new logistics web app, built remotely for a US team.",
    tags: ["React", "TypeScript", "Component library", "AI-assisted workflow"],
    confidential: {
      headline: "Core UI and app structure for a logistics workflow platform.",
      facts: ["Remote · California, USA", "Feb – Apr 2026", "Private codebase"],
    },
    problem:
      "A new logistics product needed a solid starting point: an application structure and UI building blocks the team could keep extending without slowing down.",
    role: "Frontend developer working remotely with a California-based team, responsible for application infrastructure and core interface components.",
    process:
      "Build reusable React UI primitives and the application structure for workflow tooling, using AI-assisted development to iterate quickly while keeping the codebase typed and maintainable.",
    outcome:
      "A typed, component-driven foundation for the web application, ready for the team to build new workflow screens on top of.",
  },
];
