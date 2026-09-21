# Pol Alcoverro — Portfolio

A new editorial portfolio for recruiters, engineering teams, and collaborators. Built with Next.js App Router, React, TypeScript, and Lucide icons. Content is rendered on the server; only navigation and the clipboard interaction require client JavaScript.

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

## Editing the portfolio

- `src/app/page.tsx`: page sections and semantic markup.
- `src/app/globals.css`: design tokens, layouts, responsive rules, and reduced-motion support.
- `src/components/PortfolioControls.tsx`: mobile navigation, current-section indicator, and email copy interaction.
- `src/data/index.ts`: personal details, experience, education, skills, and links.
- `src/data/case-studies.ts`: project descriptions, roles, approaches, outcomes, screenshots, and destinations.
- `public/projects/`: optimized screenshots of the live projects. Grade Tracker uses supplied brand artwork because its live site blocks automated screenshots.
- `public/Pol-Alcoverro-CV.pdf`: existing supplied CV. This document predates the newest roles shown on the site and should be replaced with an updated CV when available.

Project outcomes are qualitative; no unverified usage or business metrics have been added. Project screenshots were captured on 21 September 2026. The Bus Schedule description reflects its current implementation using local timetable data.

## Deployment

Deploy using a Next.js-compatible host. The homepage, robots.txt, and sitemap.xml are statically generated. Next.js optimizes and serves the images. The existing Open Graph image route is retained.

The canonical URL, robots sitemap URL, sitemap entry, and Person structured data currently use `https://polalcoverro.com`. Update them if the production domain changes.

## Accessibility

Includes a skip link, semantic sections and headings, visible keyboard focus, native keyboard-accessible project disclosures, an Escape-dismissable mobile navigation, a clipboard status announcement, reduced-motion styles, and responsive layouts down to 320px.
