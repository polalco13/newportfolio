// Genera las imágenes para compartir (1200×630) con Chrome sin interfaz: la del vestíbulo (og.html) y,
// por idioma, las de /alco y /dev (og-sub.html).
// CHROME=/ruta/al/binario si Chrome no está en la ruta de macOS.
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const template = new URL('./og.html', import.meta.url).href;
const sub = new URL('./og-sub.html', import.meta.url).href;
const outDir = new URL('../public/og/', import.meta.url);
mkdirSync(outDir, { recursive: true });

// [nombre, plantilla, formato]: las que llevan foto o humo salen en JPEG (un PNG pesa ~640 KB y WhatsApp
// descarta las imágenes grandes); las de /dev son tinta plana y en PNG pesan 60 KB.
const shots = [['home', `${template}?v=home`, 'jpg']];
for (const page of ['alco', 'dev']) for (const lang of ['es', 'ca', 'en']) shots.push([`${page}-${lang}`, `${sub}?page=${page}&lang=${lang}`, page === 'alco' ? 'jpg' : 'png']);

for (const [variant, url, format] of shots) {
  const out = fileURLToPath(new URL(`${variant}.png`, outDir));
  execFileSync(chrome, [
    '--headless=new',
    '--allow-file-access-from-files',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${out}`,
    url,
  ], { stdio: 'ignore' });
  if (format === 'jpg') {
    // sips viene con macOS, como el Chrome de la ruta de arriba.
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', out, '--out', out.replace(/\.png$/, '.jpg')], { stdio: 'ignore' });
    rmSync(out);
  }
  console.log(`og/${variant}.${format}`);
}
