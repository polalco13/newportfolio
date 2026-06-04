# Pol Alcoverro Portfolio

Personal portfolio for Pol Alcoverro, built as a focused one-page site for technical recruiters and engineering teams.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`:

```bash
npm.cmd run dev
```

## Verification

```bash
npm.cmd run lint
npm.cmd run build
```

The production route `/` should remain statically prerendered. The generated Open Graph image is served from `/opengraph-image`.

## Content Model

Portfolio content lives in `src/data/index.ts`. The main project shape is:

```ts
{
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
```

No resume PDF is linked until a real `public/resume.pdf` file exists.
