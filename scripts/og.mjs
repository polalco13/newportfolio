// Genera las imágenes para compartir (1200×630) de /, /alco y /cv con Chrome sin interfaz.
// CHROME=/ruta/al/binario si Chrome no está en la ruta de macOS.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const template = new URL('./og.html', import.meta.url).href;
const outDir = new URL('../public/og/', import.meta.url);
mkdirSync(outDir, { recursive: true });

for (const variant of ['home', 'alco', 'cv']) {
  const out = fileURLToPath(new URL(`${variant}.png`, outDir));
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${out}`,
    `${template}?v=${variant}`,
  ], { stdio: 'ignore' });
  console.log(`og/${variant}.png`);
}
