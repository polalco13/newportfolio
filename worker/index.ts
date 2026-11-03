// Worker de polalco.com. Casi todo son assets estáticos de Astro; el Worker solo hace dos cosas:
// 1. Sirve /, /alco y /cv en el idioma del navegador (castellano, catalán o inglés), sin redirigir.
// 2. Sirve /alco.pdf y /cv.pdf y apunta cada descarga en Workers Analytics Engine.
import { DEFAULT_LANG, DOCS, pickLang, type Doc, type DocId } from '../shared/site';

interface Env {
  ASSETS: Fetcher;
  /** Puede faltar en local: entonces la descarga solo se escribe en la consola. */
  DOWNLOADS?: AnalyticsEngineDataset;
}

const BY_PATH = new Map<string, Doc & { id: DocId }>(
  (Object.keys(DOCS) as DocId[]).map((id) => [DOCS[id].path, { id, ...DOCS[id] }]),
);
const NEGOTIATED = new Set(['/', '/alco', '/cv']);
// Robots y vistas previas de enlaces (WhatsApp, Slack, LinkedInBot…) no cuentan como descargas.
const BOTS = /bot|crawler|spider|preview|facebookexternalhit|whatsapp|headless|curl|wget|python/i;

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const doc = BY_PATH.get(url.pathname);
    if (doc) return serveDoc(request, env, url, doc);
    if (NEGOTIATED.has(url.pathname)) return servePage(request, env, url);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function servePage(request: Request, env: Env, url: URL): Promise<Response> {
  const lang = pickLang(request.headers.get('accept-language'));
  const target = lang === DEFAULT_LANG ? url.pathname : `/${lang}${url.pathname === '/' ? '' : url.pathname}`;
  const res = await env.ASSETS.fetch(new Request(new URL(target, url), request));
  const headers = new Headers(res.headers);
  headers.append('Vary', 'Accept-Language');
  headers.set('Content-Language', lang);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

async function serveDoc(request: Request, env: Env, url: URL, doc: Doc & { id: DocId }): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const res = await env.ASSETS.fetch(new Request(new URL(doc.asset, url), request));
  if (!res.ok) return res;

  if (request.method === 'GET' && isFirstRange(request) && !BOTS.test(request.headers.get('user-agent') ?? '')) {
    const point = {
      indexes: [doc.id],
      blobs: [
        doc.id,
        clean(url.searchParams.get('src')) || 'direct',
        clean(url.searchParams.get('ref')),
        (request.cf?.country as string | undefined) ?? 'XX',
        pickLang(request.headers.get('accept-language')),
      ],
      doubles: [1],
    };
    if (env.DOWNLOADS) env.DOWNLOADS.writeDataPoint(point);
    else console.log('descarga', JSON.stringify(point.blobs));
  }

  const headers = new Headers(res.headers);
  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', `inline; filename="${doc.filename}"`);
  headers.set('Cache-Control', 'public, max-age=300, must-revalidate');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

/** Los visores de PDF piden el archivo a trozos; solo cuenta la primera petición. */
function isFirstRange(request: Request): boolean {
  const range = request.headers.get('range');
  return !range || /^bytes=0-/.test(range);
}

/** Origen y ref vienen de la URL: solo letras, números y . _ -, y como mucho 32 caracteres. */
function clean(value: string | null): string {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 32);
}
