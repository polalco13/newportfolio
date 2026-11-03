// Datos que comparten la web (Astro), el Worker de Cloudflare y el middleware de Vercel: idiomas,
// documentos y la elección de idioma.

export const LANGS = ['es', 'ca', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export type DocId = 'alco' | 'cv';

export interface Doc {
  /** URL corta y fija que se comparte; la sirve y la cuenta el Worker. */
  path: string;
  /** Archivo real dentro de public/. */
  asset: string;
  /** Nombre con el que se guarda al descargarlo. */
  filename: string;
  pages: number;
  /** Canal del osciloscopio: L es ALCO y R es Pol. */
  channel: 'L' | 'R';
}

export const DOCS: Record<DocId, Doc> = {
  alco: {
    path: '/alco.pdf',
    asset: '/files/ALCO-Portfolio-DJ-2026.pdf',
    filename: 'ALCO-Portfolio-DJ-2026.pdf',
    pages: 4,
    channel: 'L',
  },
  cv: {
    path: '/cv.pdf',
    asset: '/files/Pol-Alcoverro-CV.pdf',
    filename: 'Pol-Alcoverro-CV.pdf',
    pages: 1,
    channel: 'R',
  },
};

/** Primer idioma soportado de Accept-Language. Sin cabecera, castellano; con otro idioma, inglés. */
export function pickLang(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const ranked = header
    .split(',')
    .map((part, index) => {
      const [tag = '', ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const weight = q ? Number(q.slice(2)) : 1;
      return { base: tag.split('-')[0], weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((entry) => entry.base && entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  const match = ranked.find((entry) => (LANGS as readonly string[]).includes(entry.base));
  return match ? (match.base as Lang) : 'en';
}
