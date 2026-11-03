// Middleware de Vercel: hace lo mismo que el Worker de Cloudflare (worker/index.ts) con /, /alco y /cv,
// que se sirven en el idioma del navegador sin redirigir. Los PDF los sirven las rewrites de
// vercel.json; en Vercel no hay contador de descargas.
import { next, rewrite } from '@vercel/functions';
import { DEFAULT_LANG, pickLang } from './shared/site';

export const config = { matcher: ['/', '/alco', '/cv'] };

export default function middleware(request: Request): Response {
  const lang = pickLang(request.headers.get('accept-language'));
  const headers = { Vary: 'Accept-Language', 'Content-Language': lang };
  if (lang === DEFAULT_LANG) return next({ headers });
  const url = new URL(request.url);
  url.pathname = `/${lang}${url.pathname === '/' ? '' : url.pathname}`;
  return rewrite(url, { headers });
}
