// Middleware de Vercel: hace lo mismo que el Worker de Cloudflare (worker/index.ts) con /, /alco y /dev,
// que se sirven en el idioma del navegador sin redirigir. Los PDF los sirven las rewrites de
// vercel.json, igual que la redirección de /cv a /dev; en Vercel no hay contador de descargas.
import { next, rewrite } from '@vercel/functions';
import { DEFAULT_LANG, pickLang } from './shared/site';

// Vercel lee el matcher sin ejecutar el archivo: tiene que ser literal (es NEGOTIATED de shared/site.ts).
export const config = { matcher: ['/', '/alco', '/dev'] };

export default function middleware(request: Request): Response {
  const lang = pickLang(request.headers.get('accept-language'));
  const headers = { Vary: 'Accept-Language', 'Content-Language': lang };
  if (lang === DEFAULT_LANG) return next({ headers });
  const url = new URL(request.url);
  url.pathname = `/${lang}${url.pathname === '/' ? '' : url.pathname}`;
  return rewrite(url, { headers });
}
