// Tamaño real de cada PDF, leído al compilar: el botón nunca enseña un tamaño viejo.
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { DOCS, type DocId, type Lang } from '../../shared/site';

const LOCALE: Record<Lang, string> = { es: 'es-ES', ca: 'ca-ES', en: 'en-GB' };

export function docSize(id: DocId, lang: Lang): string {
  const bytes = statSync(join(process.cwd(), 'public', DOCS[id].asset)).size;
  const nf = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 1 });
  return bytes >= 1e6 ? `${nf.format(bytes / 1e6)} MB` : `${nf.format(Math.round(bytes / 1e3))} KB`;
}
