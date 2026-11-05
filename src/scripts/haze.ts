// Fondo de «Señal»: humo de club iluminado por tres focos móviles, en WebGL.
// El humo es fBm con domain warping (Inigo Quilez). Los focos siguen un programa, como en una sala:
// cada 8 s pasan a otra figura (abanico, cruce, los tres al logo, barrido en paralelo). Su luz solo
// se ve donde hay humo y deja un charco de color donde llega, así que el color del fondo va donde
// apuntan. Al señalar una puerta, los tres se giran hacia el logo con el color de esa puerta.
// Se pinta a menos resolución y a 30 fps cuando nada se mueve deprisa (el degradado de Stripe, hecho
// parecido, gasta mucha batería si no se limita). Sin WebGL queda el fondo CSS; con «reducir
// movimiento», un fotograma quieto.
import { lightDoors } from './doors';
import { stage, type RGB } from './stage';

const VERT = 'attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }';

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uStir;
uniform float uReveal;
uniform vec3 uGround;
uniform vec3 uAngle;
uniform vec3 uL0;
uniform vec3 uL1;
uniform vec3 uL2;
uniform vec3 uAmbient;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p;
    a *= 0.5;
  }
  return v;
}
vec3 lin(vec3 c) { return c * c; }

// Un foco: el cono se abre con la distancia, solo se ve donde hay humo y deja un charco de luz
// donde llega. Mismo cálculo que lightAt() en stage.ts, para que el logo se ilumine igual.
vec3 beam(vec2 uv, vec2 origin, float angle, vec3 color, float aspect, float density) {
  vec2 d = (uv - origin) * vec2(aspect, 1.0);
  vec2 dir = vec2(sin(angle), -cos(angle));
  float along = dot(d, dir);
  float across = abs(d.x * dir.y - d.y * dir.x);
  float width = 0.025 + along * 0.11;
  float cone = (1.0 - smoothstep(width * 0.6, width * 1.6, across)) * step(0.0, along);
  vec2 pool = d - dir * 0.95;
  float puddle = exp(-dot(pool, pool) / 0.06);
  return lin(color) * (cone * exp(-along * 0.8) * (0.25 + 0.75 * density) * 0.62
                       + puddle * (0.3 + 0.7 * density) * 0.26);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float t = uTime;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.7;

  // El puntero remueve el humo: un remolino que se apaga con la distancia.
  vec2 d = p - vec2(uPointer.x * aspect, uPointer.y) * 1.7;
  float near = exp(-dot(d, d) * 3.0) * uStir;
  p += near * vec2(-d.y, d.x) * 1.4;

  // Humo: fBm con domain warping en dos pasos, que sube despacio.
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.04)), fbm(p + vec2(5.2, 1.3) - t * 0.03));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.025), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.02));
  float density = smoothstep(0.28, 0.92, fbm(p + 2.6 * r + vec2(0.0, -t * 0.03)));

  float on = smoothstep(0.25, 1.0, uReveal);
  vec3 col = lin(uGround);
  col += vec3(0.85, 0.83, 0.95) * density * 0.02;
  col += (beam(uv, vec2(0.16, 1.04), uAngle.x, uL0, aspect, density)
        + beam(uv, vec2(0.5, 1.08), uAngle.y, uL1, aspect, density)
        + beam(uv, vec2(0.84, 1.04), uAngle.z, uL2, aspect, density)) * on;
  // Luz rebotada: el humo de toda la sala toma un poco del color de los focos.
  col += lin(uAmbient) * (0.02 + 0.045 * density) * on;
  // Entrada: el humo empieza denso y claro y se asienta.
  col += vec3(0.8, 0.76, 0.9) * density * (1.0 - uReveal) * 0.22;
  // Zona más tranquila detrás del nombre, las puertas y los nombres de debajo, para que se lean.
  vec2 c = (uv - vec2(0.5, 0.3)) * vec2(aspect * 0.62, 1.35);
  col *= 1.0 - 0.55 * exp(-dot(c, c) * 2.0);
  vec2 v = uv - 0.5;
  col *= 1.0 - 0.72 * dot(v, v);
  col = sqrt(max(col, 0.0));
  // Grano: rompe las franjas de los degradados suaves.
  col += (hash(gl_FragCoord.xy + fract(t * 7.3) * 113.0) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

const GROUND: RGB = [0.078, 0.067, 0.11]; // #14111c
/** Los tres focos: izquierda lavanda, centro menta, derecha melocotón. */
const ORIGINS: [number, number][] = [
  [0.16, 1.04],
  [0.5, 1.08],
  [0.84, 1.04],
];
const COLORS: RGB[] = [
  [0.788, 0.714, 1], // lavanda #c9b6ff
  [0.663, 0.925, 0.816], // menta #a9ecd0
  [1, 0.769, 0.639], // melocotón #ffc4a3
];
/** El color de cada puerta: melocotón para el DJ, lavanda para el CV. */
const DOOR: Record<string, RGB> = { alco: [1, 0.769, 0.639], cv: [0.788, 0.714, 1] };
/** Píxeles de humo como máximo; el resto lo escala el navegador. */
const MAX_PIXELS = 420_000;
const REVEAL_MS = 2600;
// Programa de luces: cada figura dura 8 s y los focos tardan 2,4 s en pasar a la siguiente.
const LOOK_MS = 8000;
const MOVE_MS = 2400;

export function startHaze(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.haze');
  if (!canvas) return;
  try {
    new Haze(canvas).start();
  } catch (error) {
    console.warn('Sin humo en WebGL; queda el fondo CSS.', error);
  }
}

class Haze {
  private readonly gl: WebGLRenderingContext;
  private readonly u: Record<string, WebGLUniformLocation | null> = {};
  private readonly reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private clock = 0;
  private last = 0;
  private sinceDraw = 0;
  private raf = 0;
  private running = false;
  private stir = 0;
  private stirTarget = 0;
  private lastMove = -1e9;
  private readonly pointer = { x: 0.5, y: 0.5, px: Number.NaN, py: Number.NaN };
  /** Ángulos que apuntan al centro del logo, uno por foco. */
  private toLogo = [0, 0, 0];
  /** 0: los focos siguen su programa; 1: apuntan al logo con el color de la puerta señalada. */
  private focus = 0;
  private focusTarget = 0;
  private tint: RGB = [1, 1, 1];
  private angles = [0, 0, 0];

  constructor(private readonly canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    if (!gl) throw new Error('WebGL no disponible');
    this.gl = gl;
    const program = gl.createProgram();
    if (!program) throw new Error('No se pudo crear el programa');
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link');
    gl.useProgram(program);
    // Un triángulo que cubre toda la pantalla.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    for (const name of ['uRes', 'uTime', 'uPointer', 'uStir', 'uReveal', 'uGround', 'uAngle', 'uL0', 'uL1', 'uL2', 'uAmbient']) {
      this.u[name] = gl.getUniformLocation(program, name);
    }
    gl.uniform3fv(this.u.uGround, GROUND);
  }

  start(): void {
    this.resize();
    addEventListener('resize', () => {
      this.resize();
      if (this.reduce) this.frame(14000, 1);
    });
    this.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      this.stop();
      this.canvas.classList.remove('on');
    });
    if (this.reduce) {
      // Un único fotograma quieto, ya asentado.
      this.frame(14000, 1);
      this.canvas.classList.add('on');
      return;
    }
    addEventListener('pointermove', (event) => this.onPointer(event), { passive: true });
    for (const button of document.querySelectorAll<HTMLElement>('.btn[data-doc]')) {
      const color = DOOR[button.dataset.doc ?? ''];
      if (!color) continue;
      const on = () => {
        this.tint = color;
        this.focusTarget = 1;
      };
      const off = () => {
        this.focusTarget = 0;
      };
      button.addEventListener('pointerenter', on);
      button.addEventListener('pointerleave', off);
      button.addEventListener('focus', on);
      button.addEventListener('blur', off);
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? this.stop() : this.go()));
    this.go();
    this.canvas.classList.add('on');
  }

  private go(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const dt = Math.min(64, now - this.last);
    this.last = now;
    this.clock += dt;
    this.sinceDraw += dt;
    // 30 fps de base; 60 mientras los focos cambian de figura, el puntero remueve el humo o entra la página.
    const phase = this.clock % LOOK_MS;
    const busy =
      phase > LOOK_MS - MOVE_MS || this.stir > 0.02 || Math.abs(this.focus - this.focusTarget) > 0.01 || this.clock < REVEAL_MS;
    if (this.sinceDraw < (busy ? 14 : 30)) return;
    this.sinceDraw = 0;
    if (this.clock - this.lastMove > 160) this.stirTarget *= 0.9;
    this.stir += (this.stirTarget - this.stir) * 0.12;
    this.focus += (this.focusTarget - this.focus) * 0.07;
    this.frame(this.clock, ease(Math.min(1, this.clock / REVEAL_MS)));
  };

  /** Una figura del programa: el ángulo de cada foco. */
  private look(index: number, time: number): number[] {
    switch (index % 4) {
      case 0: // abanico: se abren hacia los lados
        return [-0.32, 0, 0.32];
      case 1: // cruce: izquierda y derecha se cruzan en el centro
        return [0.55, 0, -0.55];
      case 2: // los tres al logo
        return this.toLogo;
      default: {
        // barrido: los tres en paralelo, de lado a lado
        const sweep = 0.42 * Math.sin(time * 0.0006);
        return [sweep, sweep, sweep];
      }
    }
  }

  private frame(time: number, reveal: number): void {
    // Programa: mantiene cada figura y, en los últimos 2,4 s, va hacia la siguiente.
    const index = Math.floor(time / LOOK_MS);
    const move = ease(Math.max(0, (time % LOOK_MS) - (LOOK_MS - MOVE_MS)) / MOVE_MS);
    const from = this.look(index, time);
    const to = this.look(index + 1, time);
    const colors: RGB[] = [];
    for (let i = 0; i < 3; i++) {
      const program = from[i] + (to[i] - from[i]) * move + 0.04 * Math.sin(time * 0.0007 + i * 2.1);
      this.angles[i] = program + (this.toLogo[i] - program) * this.focus;
      // Al juntarse los tres sobre el logo se atenúan un poco, para no deslumbrar el texto.
      const dim = 1 - 0.3 * this.focus;
      colors.push(mix(COLORS[i], this.tint, this.focus * 0.8).map((v) => v * dim) as RGB);
    }
    const ambient: RGB = [0, 1, 2].map((c) => (colors[0][c] + colors[1][c] + colors[2][c]) / 3) as RGB;
    stage.aspect = this.canvas.width / this.canvas.height;
    stage.lights = ORIGINS.map(([x, y], i) => ({ x, y, angle: this.angles[i], color: colors[i] }));
    this.render(time, reveal, colors, ambient);
    lightDoors();
  }

  private onPointer(event: PointerEvent): void {
    const { pointer } = this;
    if (!Number.isNaN(pointer.px)) {
      const speed = Math.hypot(event.clientX - pointer.px, event.clientY - pointer.py);
      this.stirTarget = Math.min(1, this.stirTarget + speed / 160);
      this.lastMove = this.clock;
    }
    pointer.px = event.clientX;
    pointer.py = event.clientY;
    pointer.x = event.clientX / innerWidth;
    pointer.y = 1 - event.clientY / innerHeight;
  }

  private resize(): void {
    const width = this.canvas.clientWidth || innerWidth;
    const height = this.canvas.clientHeight || innerHeight;
    const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (width * height)));
    this.canvas.width = Math.max(1, Math.round(width * scale));
    this.canvas.height = Math.max(1, Math.round(height * scale));
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    // Hacia dónde tiene que girar cada foco para dar en el centro del logo.
    const logo = document.querySelector('.trace')?.getBoundingClientRect();
    if (logo) {
      const aspect = width / height;
      const cx = (logo.left + logo.width / 2) / width;
      const cy = 1 - (logo.top + logo.height / 2) / height;
      this.toLogo = ORIGINS.map(([x, y]) => Math.atan2((cx - x) * aspect, y - cy));
    }
  }

  private render(timeMs: number, reveal: number, colors: RGB[], ambient: RGB): void {
    const { gl, u } = this;
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(u.uTime, timeMs / 1000);
    gl.uniform2f(u.uPointer, this.pointer.x, this.pointer.y);
    gl.uniform1f(u.uStir, this.stir);
    gl.uniform1f(u.uReveal, reveal);
    gl.uniform3f(u.uAngle, this.angles[0], this.angles[1], this.angles[2]);
    gl.uniform3fv(u.uL0, colors[0]);
    gl.uniform3fv(u.uL1, colors[1]);
    gl.uniform3fv(u.uL2, colors[2]);
    gl.uniform3fv(u.uAmbient, ambient);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('No se pudo crear el shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
  return shader;
}

function mix(a: RGB, b: RGB, k: number): RGB {
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
