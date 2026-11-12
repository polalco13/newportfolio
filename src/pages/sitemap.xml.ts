// Mapa del sitio: cada página en sus tres idiomas, con las alternativas (hreflang) y la ruta sin idioma
// como x-default. Las rutas salen de shared/site.ts y de los textos, así no se queda atrás.
import type { APIRoute } from 'astro';
import { COPY } from '../content/copy';
import { LANGS, SUBWEBS, pagePath, type PageId } from '../../shared/site';

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site ?? 'https://www.polalco.com').href;
  const pages: PageId[] = ['home', ...SUBWEBS];
  const groups = [
    ...pages.map((page) => ({
      urls: LANGS.map((l) => ({ lang: l as string, href: pagePath(page, l) })),
      fallback: pagePath(page),
    })),
    { urls: LANGS.map((l) => ({ lang: l as string, href: COPY[l].privacyPath })), fallback: undefined },
  ];
  const entries = groups.flatMap(({ urls, fallback }) => {
    const links = [...urls, ...(fallback ? [{ lang: 'x-default', href: fallback }] : [])]
      .map((u) => `    <xhtml:link rel="alternate" hreflang="${u.lang}" href="${abs(u.href)}"/>`)
      .join('\n');
    return urls.map((u) => `  <url>\n    <loc>${abs(u.href)}</loc>\n${links}\n  </url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
