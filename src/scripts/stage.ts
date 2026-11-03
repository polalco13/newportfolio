// Estado compartido entre el humo (haze.ts) y el logo (beam.ts): hacia dónde apuntan los focos.
// El humo lo escribe en cada fotograma; el logo lo lee para iluminarse con el foco que lo apunta.

export type RGB = [number, number, number];

export interface Light {
  /** Origen del foco, en coordenadas 0–1 de la pantalla (y hacia arriba; por encima del borde). */
  x: number;
  y: number;
  /** Ángulo del haz respecto a la vertical: 0 hacia abajo, positivo hacia la derecha. */
  angle: number;
  /** Color en 0–1. */
  color: RGB;
}

export const stage: { lights: Light[]; aspect: number } = { lights: [], aspect: 1 };

/** Cuánto ilumina un foco el punto (x, y) de la pantalla: 1 en el eje del haz, 0 fuera del cono. */
export function lightAt(light: Light, x: number, y: number, aspect: number): number {
  const dx = (x - light.x) * aspect;
  const dy = y - light.y;
  const along = dx * Math.sin(light.angle) - dy * Math.cos(light.angle);
  if (along <= 0) return 0;
  const across = Math.abs(dx * -Math.cos(light.angle) - dy * Math.sin(light.angle));
  const width = 0.025 + along * 0.11;
  return 1 - smoothstep(width * 0.6, width * 1.6, across);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
