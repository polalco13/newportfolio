// Las puertas son de cristal: no tienen color propio, se tiñen con los focos que les pasan por encima.
// El humo (haze.ts) llama a lightDoors() en cada fotograma, después de mover los focos (stage.ts).
// Cada puerta recibe --light (color «r g b» en 0–255), --glow (0–1) y --gx (dónde le da más, en %).

import { lightAt, stage } from './stage';

/** Puntos de muestra a lo ancho de cada puerta. */
const SAMPLES = 7;
/** Luz mínima: el reflejo del humo, para que el cristal nunca quede apagado del todo. */
const AMBIENT = 0.18;

let doors: HTMLElement[] | null = null;
/** Dónde está el reflejo de cada puerta (0–1), suavizado para que no salte de punta a punta. */
const spot = new WeakMap<HTMLElement, number>();

export function lightDoors(): void {
  doors ??= [...document.querySelectorAll<HTMLElement>('.btn[data-doc]')];
  if (!doors.length || !stage.lights.length) return;
  const width = innerWidth;
  const height = innerHeight;
  const ambient = [0, 1, 2].map((c) => stage.lights.reduce((sum, l) => sum + l.color[c], 0) / stage.lights.length);

  for (const door of doors) {
    const rect = door.getBoundingClientRect();
    const y = 1 - (rect.top + rect.height * 0.5) / height;
    const rgb = ambient.map((v) => v * AMBIENT);
    let direct = 0;
    let centroid = 0;
    for (let s = 0; s < SAMPLES; s++) {
      const t = s / (SAMPLES - 1);
      const x = (rect.left + rect.width * t) / width;
      let here = 0;
      for (const light of stage.lights) {
        const hit = lightAt(light, x, y, stage.aspect) / SAMPLES;
        here += hit;
        for (let c = 0; c < 3; c++) rgb[c] += light.color[c] * hit;
      }
      direct += here;
      centroid += here * t;
    }
    // Color medio de lo que le llega, llevado a su tono más claro (el brillo lo da --glow). Los tres
    // pastel juntos tiran a blanco, así que se separa del gris para que se note qué foco le da.
    const max = Math.max(...rgb, 1e-3);
    const color = rgb.map((v) => Math.round(Math.max(0, 1 - (1 - v / max) * 2.2) * 255)).join(' ');
    const glow = 1 - Math.exp(-direct * 1.4);
    door.style.setProperty('--light', color);
    door.style.setProperty('--glow', glow.toFixed(3));
    // El reflejo se pone donde cae la luz (su centro de masas); sin luz directa, vuelve al centro.
    const target = direct > 0.01 ? centroid / direct : 0.5;
    const prev = spot.get(door) ?? target;
    const gx = prev + (target - prev) * 0.25;
    spot.set(door, gx);
    door.style.setProperty('--gx', `${(gx * 100).toFixed(1)}%`);
  }
}
