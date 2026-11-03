// El logo de ALCO como un rótulo de luz: letras macizas en blanco cálido con halo, en un canvas.
// Se dibuja una vez al entrar (el contorno se traza y el relleno se enciende) y después se queda
// quieto. Solo responde a la luz: el foco que lo apunta le da su color (stage.ts) y el cursor
// enciende el tramo del contorno más cercano. Sin JavaScript, con «reducir movimiento» o si el
// canvas falla, se ve el SVG estático de AlcoTrace.
import { lightAt, stage, type RGB } from './stage';

const TAU = Math.PI * 2;
const FILL_TOP: RGB = [255, 250, 245]; // #fffaf5
const FILL_BOTTOM: RGB = [240, 233, 255]; // #f0e9ff
const GLOW: RGB = [214, 205, 255]; // #d6cdff
const EDGE = '255, 246, 238'; // #fff6ee
// viewBox del SVG (-70 -70 1909.5 638); el logo ocupa x 40–1729,5 e y 40–458.
const VIEW = { x: -70, y: -70, w: 1909.5 };
// El canvas sobresale un 14 % del ancho del logo por cada lado para que quepa el halo (AlcoTrace).
const PAD = 0.14;
// Entrada: cada letra traza su contorno en 0,9 s, 110 ms después de la anterior, y se enciende.
const DRAW_AT = 120;
const DRAW_MS = 900;
const LETTER_GAP = 110;
const FILL_MS = 500;
const INTRO_MS = DRAW_AT + 3 * LETTER_GAP + DRAW_MS + FILL_MS;
// Contorno → letra: A, L, C, O exterior y O interior.
const LETTER_OF = [0, 1, 2, 3, 3];
// El cursor enciende un tramo del 6 % del contorno, centrado en el punto más cercano, y llega a él con
// un muelle tipo Apple (0,5 s, rebote 0,2: rigidez 158 y amortiguación 20, masa 1).
const LIT = 0.06;
const SPRING_K = 158;
const SPRING_C = 20;
/** A qué distancia del contorno (en anchos del logo) el cursor empieza a encenderlo. */
const REACH = 0.16;

interface Figure {
  n: number;
  /** Puntos del contorno, x e y alternados, en unidades del viewBox. */
  logo: Float32Array;
  /** Índices donde empieza cada contorno, más el final. */
  bounds: number[];
  /** 1 en el primer punto de cada contorno. */
  starts: Uint8Array;
}

export function startLogo(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const trace of document.querySelectorAll<HTMLElement>('.trace')) {
    try {
      new Sign(trace).start();
    } catch (error) {
      console.warn('El logo en canvas no ha arrancado; se queda el SVG.', error);
    }
  }
}

class Sign {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly fig: Figure;
  /** Una forma por letra, en unidades del viewBox, para el relleno. */
  private readonly letters: Path2D[];
  /** Puntos del contorno en px CSS del canvas. */
  private readonly pts: Float32Array;
  private cache: HTMLCanvasElement | null = null;
  private cacheKey = '';
  private dpr = 1;
  private scale = 1;
  private pad = 0;
  private box = 0;
  private k = 1;
  private clock = 0;
  private last = 0;
  private sinceDraw = 0;
  private raf = 0;
  private running = false;
  private onScreen = true;
  private low = false;
  private intervals: number[] = [];
  /** Luz de los focos sobre el logo: color mezclado y cuánta llega (0–1), suavizados. */
  private light: RGB = [255, 255, 255];
  private lightAmt = 0;
  /** Tramo encendido por el cursor: posición (índice con decimales) y velocidad en puntos por segundo. */
  private head = 0;
  private vel = 0;
  private engaged = 0;
  private target = 0;
  private nearestDist = Number.POSITIVE_INFINITY;
  private readonly pointer = { x: 0, y: 0, on: false, moved: false };

  constructor(private readonly trace: HTMLElement) {
    const canvas = trace.querySelector('canvas.beam-canvas');
    const svg = trace.querySelector('svg.persist');
    const ctx = canvas instanceof HTMLCanvasElement ? canvas.getContext('2d') : null;
    if (!(canvas instanceof HTMLCanvasElement) || !(svg instanceof SVGSVGElement) || !ctx) {
      throw new Error('Falta el canvas, el SVG o el contexto 2D');
    }
    this.canvas = canvas;
    this.ctx = ctx;
    const ds = Array.from(svg.querySelectorAll('path'), (p) => p.getAttribute('d') ?? '');
    this.letters = ds.map((d) => new Path2D(d));
    this.fig = sample(svg, ds, innerWidth < 700 ? 1500 : 2400);
    this.pts = new Float32Array(this.fig.n * 2);
  }

  start(): void {
    this.resize();
    new ResizeObserver(() => this.resize()).observe(this.trace);
    new IntersectionObserver((entries) => {
      this.onScreen = entries.some((entry) => entry.isIntersecting);
      this.toggle();
    }).observe(this.trace);
    document.addEventListener('visibilitychange', () => this.toggle());
    addEventListener('pointermove', (event) => this.onPointer(event), { passive: true });
    // Con el dedo, el contorno solo se enciende mientras se arrastra sobre el logo.
    addEventListener('pointerup', (event) => {
      if (event.pointerType !== 'mouse') this.pointer.on = false;
    });
    addEventListener('pointercancel', () => {
      this.pointer.on = false;
    });
    document.documentElement.addEventListener('pointerleave', () => {
      this.pointer.on = false;
    });
    this.trace.classList.add('live');
    this.trace.dataset.quality = 'high';
    this.toggle();
  }

  private toggle(): void {
    const run = this.onScreen && !document.hidden;
    if (run && !this.running) {
      this.running = true;
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    } else if (!run && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const dt = Math.min(64, now - this.last);
    this.last = now;
    this.clock += dt;
    this.sinceDraw += dt;
    // Como mucho 60 fps (30 en calidad baja).
    if (this.sinceDraw < (this.low ? 30 : 14)) return;
    const elapsed = this.sinceDraw;
    this.sinceDraw = 0;
    this.watch(elapsed);
    this.update(elapsed / 1000);
    this.draw();
  };

  /** Si después de la entrada los fotogramas tardan más de 24 ms de media, baja a 1x y 30 fps. */
  private watch(interval: number): void {
    if (this.low || this.clock < INTRO_MS + 600) return;
    this.intervals.push(interval);
    if (this.intervals.length < 90) return;
    const average = this.intervals.reduce((a, b) => a + b, 0) / this.intervals.length;
    this.intervals.length = 0;
    if (average > 24) {
      this.low = true;
      this.trace.dataset.quality = 'low';
      this.resize();
    }
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width) return;
    this.dpr = this.low ? 1 : Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    this.box = rect.width / (1 + 2 * PAD);
    this.scale = this.box / VIEW.w;
    this.pad = this.box * PAD;
    this.k = Math.min(1.25, Math.max(0.55, this.box / 900));
    this.cache = null;
    const { n, logo } = this.fig;
    for (let i = 0; i < n; i++) {
      this.pts[2 * i] = (logo[2 * i] - VIEW.x) * this.scale + this.pad;
      this.pts[2 * i + 1] = (logo[2 * i + 1] - VIEW.y) * this.scale + this.pad;
    }
  }

  private onPointer(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    this.pointer.on = true;
    this.pointer.moved = true;
  }

  private update(dt: number): void {
    this.lightUp();
    this.guide(dt);
  }

  /** La luz que le llega al logo: la de cada foco que lo apunta, como la ve el humo (stage.ts). */
  private lightUp(): void {
    const rect = this.trace.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / innerWidth;
    const y = 1 - (rect.top + rect.height / 2) / innerHeight;
    const sum: RGB = [0, 0, 0];
    let amount = 0;
    for (const light of stage.lights) {
      const hit = lightAt(light, x, y, stage.aspect);
      amount += hit;
      for (let c = 0; c < 3; c++) sum[c] += light.color[c] * 255 * hit;
    }
    const target: RGB = amount > 0 ? [sum[0] / amount, sum[1] / amount, sum[2] / amount] : this.light;
    for (let c = 0; c < 3; c++) this.light[c] += (target[c] - this.light[c]) * 0.1;
    this.lightAmt += (Math.min(1, amount) - this.lightAmt) * 0.1;
  }

  /** El tramo encendido sigue al cursor cuando está cerca del contorno. */
  private guide(dt: number): void {
    let near = false;
    if (this.pointer.on && this.clock >= INTRO_MS) {
      if (this.pointer.moved) {
        this.findNearest();
        this.pointer.moved = false;
      }
      near = this.nearestDist < REACH * this.box;
    }
    if (near && this.engaged < 0.01) {
      // Aparece donde está el cursor en lugar de llegar desde otro sitio.
      this.head = this.target;
      this.vel = 0;
    }
    this.engaged += ((near ? 1 : 0) - this.engaged) * 0.15;
    if (near) {
      const offset = wrap(this.head - this.target, this.fig.n);
      this.vel += (-SPRING_K * offset - SPRING_C * this.vel) * dt;
      this.head = (((this.head + this.vel * dt) % this.fig.n) + this.fig.n) % this.fig.n;
    }
  }

  private findNearest(): void {
    const { pts, pointer } = this;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.fig.n; i++) {
      const dx = pts[2 * i] - pointer.x;
      const dy = pts[2 * i + 1] - pointer.y;
      const distance = dx * dx + dy * dy;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    this.target = best;
    this.nearestDist = Math.sqrt(bestDistance);
  }

  private draw(): void {
    const { ctx, canvas } = this;
    const intro = this.clock < INTRO_MS;
    // Quieto: se reutiliza el rótulo pintado mientras la luz que le llega no cambie de forma visible.
    const key = `${this.light.map((c) => Math.round(c / 4)).join()}:${Math.round(this.lightAmt * 48)}`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!intro) {
      if (!this.cache || this.cacheKey !== key) {
        this.cache = this.cache ?? document.createElement('canvas');
        this.cache.width = canvas.width;
        this.cache.height = canvas.height;
        const layer = this.cache.getContext('2d');
        if (layer) this.paintSign(layer);
        this.cacheKey = key;
      }
      ctx.drawImage(this.cache, 0, 0);
    } else {
      this.paintSign(ctx);
    }
    if (this.engaged > 0.01) this.paintGlint();
  }

  /** El rótulo: halo, relleno con un degradado suave y un filo de luz. Durante la entrada, por letras. */
  private paintSign(ctx: CanvasRenderingContext2D): void {
    const glow = mixRGB(GLOW, this.light, 0.6 * this.lightAmt).join(', ');
    const top = mixRGB(FILL_TOP, this.light, 0.28 * this.lightAmt);
    const bottom = mixRGB(FILL_BOTTOM, this.light, 0.38 * this.lightAmt);
    const drawn = this.fig.bounds.slice(0, -1).map((_, c) => this.drawn(LETTER_OF[c]));
    const lit = [0, 1, 2, 3].map((letter) => this.lit(letter));

    // Halo: trazos anchos y suaves alrededor de cada letra que ya está encendida.
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const layers: [number, number][] = this.low
      ? [[10, 0.12]]
      : [
          [28, 0.05],
          [12, 0.1],
        ];
    for (const [width, alpha] of layers) {
      ctx.lineWidth = width * this.k;
      this.fig.bounds.slice(0, -1).forEach((start, c) => {
        const a = alpha * lit[LETTER_OF[c]];
        if (a <= 0) return;
        ctx.strokeStyle = `rgba(${glow}, ${a})`;
        ctx.stroke(this.contour(c, 1));
      });
    }

    // Relleno: las letras macizas, con un degradado de arriba abajo como un rótulo retroiluminado.
    ctx.globalCompositeOperation = 'source-over';
    ctx.setTransform(
      this.scale * this.dpr,
      0,
      0,
      this.scale * this.dpr,
      (this.pad - VIEW.x * this.scale) * this.dpr,
      (this.pad - VIEW.y * this.scale) * this.dpr,
    );
    const gradient = ctx.createLinearGradient(0, 40, 0, 458);
    gradient.addColorStop(0, `rgb(${top.join(', ')})`);
    gradient.addColorStop(1, `rgb(${bottom.join(', ')})`);
    ctx.fillStyle = gradient;
    this.letters.forEach((letter, i) => {
      ctx.globalAlpha = 0.95 * lit[i];
      if (lit[i] > 0) ctx.fill(letter);
    });
    ctx.globalAlpha = 1;

    // Filo: el contorno que se traza en la entrada y queda como un borde de luz.
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 1.6 * this.k;
    ctx.strokeStyle = `rgba(${EDGE}, 0.9)`;
    this.fig.bounds.slice(0, -1).forEach((_, c) => {
      if (drawn[c] > 0) ctx.stroke(this.contour(c, drawn[c]));
    });
  }

  /** Cuánto contorno de una letra está trazado (0–1) durante la entrada. */
  private drawn(letter: number): number {
    return ease(clamp01((this.clock - DRAW_AT - letter * LETTER_GAP) / DRAW_MS));
  }

  /** Cuánto se ha encendido el relleno de una letra (0–1): justo después de trazar su contorno. */
  private lit(letter: number): number {
    return ease(clamp01((this.clock - DRAW_AT - letter * LETTER_GAP - DRAW_MS * 0.7) / FILL_MS));
  }

  /** Un contorno como trazado, hasta la fracción `part` (1 = cerrado). */
  private contour(c: number, part: number): Path2D {
    const { pts } = this;
    const start = this.fig.bounds[c];
    const end = this.fig.bounds[c + 1];
    const last = start + Math.max(1, Math.floor((end - start) * part));
    const path = new Path2D();
    path.moveTo(pts[2 * start], pts[2 * start + 1]);
    for (let i = start + 1; i < Math.min(last, end); i++) path.lineTo(pts[2 * i], pts[2 * i + 1]);
    if (part >= 1) path.closePath();
    return path;
  }

  /** El tramo de contorno que enciende el cursor: más brillante en el centro y apagándose a los lados. */
  private paintGlint(): void {
    const { ctx, pts } = this;
    const { n, starts } = this.fig;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'round';
    const length = n * LIT;
    const start = this.head - length / 2;
    const parts = this.low ? 3 : 8;
    const glow = mixRGB(GLOW, this.light, 0.6 * this.lightAmt).join(', ');
    for (let part = 0; part < parts; part++) {
      const from = Math.floor(start + (length * part) / parts);
      const to = Math.floor(start + (length * (part + 1)) / parts);
      const path = new Path2D();
      for (let i = from; i <= to; i++) {
        const j = ((i % n) + n) % n;
        if (i === from || starts[j]) path.moveTo(pts[2 * j], pts[2 * j + 1]);
        else path.lineTo(pts[2 * j], pts[2 * j + 1]);
      }
      const strength = 1 - Math.abs(2 * ((part + 0.5) / parts) - 1);
      ctx.lineWidth = 2.6 * this.k;
      ctx.strokeStyle = `rgba(${EDGE}, ${strength * this.engaged})`;
      ctx.stroke(path);
      ctx.lineWidth = 16 * this.k;
      ctx.strokeStyle = `rgba(${glow}, ${0.28 * strength * this.engaged})`;
      ctx.stroke(path);
    }
  }
}

/** Reparte `total` puntos entre los contornos del logo, en proporción a su longitud. */
function sample(host: SVGSVGElement, ds: string[], total: number): Figure {
  const subpaths = ds.flatMap((d) => d.split(/(?=M)/).map((part) => part.trim()).filter(Boolean));
  const paths = subpaths.map((d) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('visibility', 'hidden');
    host.appendChild(path);
    return path;
  });
  const lengths = paths.map((path) => path.getTotalLength());
  const sum = lengths.reduce((a, b) => a + b, 0);
  const counts = lengths.map((length) => Math.max(12, Math.round((total * length) / sum)));
  const n = counts.reduce((a, b) => a + b, 0);
  const logo = new Float32Array(n * 2);
  const starts = new Uint8Array(n);
  const bounds = [0];
  let k = 0;
  paths.forEach((path, j) => {
    starts[k] = 1;
    for (let i = 0; i < counts[j]; i++, k++) {
      const point = path.getPointAtLength((lengths[j] * i) / counts[j]);
      logo[2 * k] = point.x;
      logo[2 * k + 1] = point.y;
    }
    bounds.push(k);
    path.remove();
  });
  return { n, logo, bounds, starts };
}

/** Diferencia entre dos posiciones del contorno por el camino más corto (el contorno es circular). */
function wrap(delta: number, n: number): number {
  return ((((delta + n / 2) % n) + n) % n) - n / 2;
}

function mixRGB(a: RGB, b: RGB, k: number): RGB {
  return [Math.round(a[0] + (b[0] - a[0]) * k), Math.round(a[1] + (b[1] - a[1]) * k), Math.round(a[2] + (b[2] - a[2]) * k)];
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
