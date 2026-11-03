// Prueba el Worker sin red: lo empaqueta con wrangler (--dry-run, no publica nada)
// y lo llama con unos assets y un Analytics Engine simulados.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const out = mkdtempSync(join(tmpdir(), 'polalco-worker-'));
execFileSync('pnpm', ['exec', 'wrangler', 'deploy', '--dry-run', '--outdir', out], { stdio: 'ignore' });
const { default: worker } = await import(pathToFileURL(join(out, 'index.js')).href);

const points = [];
const env = {
  ASSETS: { fetch: async (req) => new Response(`asset:${new URL(req.url).pathname}`) },
  DOWNLOADS: { writeDataPoint: (point) => points.push(point) },
};
const call = (path, init) => worker.fetch(new Request(`https://polalco.com${path}`, init), env);
const page = async (path, acceptLanguage) => {
  const res = await call(path, acceptLanguage ? { headers: { 'accept-language': acceptLanguage } } : undefined);
  return [await res.text(), res.headers.get('content-language'), res.headers.get('vary')];
};

// Idioma de /, /alco y /cv según el navegador, sin redirigir.
assert.deepEqual(await page('/'), ['asset:/', 'es', 'Accept-Language']);
assert.deepEqual(await page('/', 'ca,es;q=0.8'), ['asset:/ca', 'ca', 'Accept-Language']);
assert.deepEqual(await page('/', 'en;q=0.5,es;q=0.9'), ['asset:/', 'es', 'Accept-Language']);
assert.deepEqual(await page('/', 'fr-FR,fr;q=0.9'), ['asset:/en', 'en', 'Accept-Language']);
assert.deepEqual(await page('/alco', 'en-GB'), ['asset:/en/alco', 'en', 'Accept-Language']);
assert.deepEqual(await page('/cv', 'ca-ES'), ['asset:/ca/cv', 'ca', 'Accept-Language']);
assert.equal(await (await call('/es/cv')).text(), 'asset:/es/cv', 'las rutas con idioma no se tocan');

// Descargas: cabeceras del PDF y una fila por descarga real.
const res = await call('/alco.pdf?src=IG&ref=Empresa X!', {
  headers: { 'user-agent': 'Mozilla/5.0 (iPhone) Instagram 300', 'accept-language': 'ca' },
});
assert.equal(res.headers.get('content-type'), 'application/pdf');
assert.equal(res.headers.get('content-disposition'), 'inline; filename="ALCO-Portfolio-DJ-2026.pdf"');
assert.equal(await res.text(), 'asset:/files/ALCO-Portfolio-DJ-2026.pdf');
assert.deepEqual(points.at(-1).blobs, ['alco', 'ig', 'empresax', 'XX', 'ca']);

await call('/cv.pdf', { headers: { 'user-agent': 'WhatsApp/2.23.20' } });
await call('/cv.pdf', { headers: { 'user-agent': 'LinkedInBot/1.0' } });
await call('/cv.pdf', { headers: { 'user-agent': 'Mozilla/5.0', range: 'bytes=4096-8191' } });
await call('/cv.pdf', { method: 'HEAD', headers: { 'user-agent': 'Mozilla/5.0' } });
assert.equal(points.length, 1, 'robots, vistas previas, trozos intermedios y HEAD no cuentan');

await call('/cv.pdf', { headers: { 'user-agent': 'Mozilla/5.0 LinkedInApp', range: 'bytes=0-' } });
assert.deepEqual(points.at(-1).blobs, ['cv', 'direct', '', 'XX', 'es']);
assert.equal((await call('/cv.pdf', { method: 'POST' })).status, 405);

console.log('worker: todas las comprobaciones pasan');
