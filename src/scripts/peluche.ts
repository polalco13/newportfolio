// El peluche de Pol vive encima del logo: sentado en la O, quieto, vigila el cursor (o las puertas).
// Solo salta si lo tocas, a la C, y al poco vuelve a la O. El movimiento de la página es de los focos;
// el suyo responde a algo. Se carga después de la entrada del logo (AlcoTrace) y no recibe el puntero:
// el canvas va por encima del logo con pointer-events: none.
//
// Todo el estado va en unidades del viewBox del logo, así sigue pegado a las letras a cualquier tamaño.
// El modelo (public/models/peluche.glb) sale de ~/Desktop/pol-alcoverro/avatar-peluche: rig de 13 huesos
// hecho en Blender (scripts/rig_blender.py). Mira a +Z, Y arriba, su izquierda es +X y mide 1,169.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { lightAt, stage } from './stage';

const MODEL = '/models/peluche.glb';
const MODEL_H = 1.169;
// viewBox del logo (AlcoTrace): -70 -70 1909.5 638; las letras van de y 40 a 458.
const VIEW = { x: -70, y: -70, w: 1909.5, h: 638 };
/** Alto del peluche de pie, en unidades del viewBox (un 70 % del alto de las letras). */
const DOLL = 0.7 * 418;
const UNIT = DOLL / MODEL_H; // unidades del modelo → viewBox

interface Spot {
  id: string;
  x: number;
  y: number;
  sit: boolean;
}
// Dónde puede estar: sentado en lo alto de la O (su sitio) y de pie en lo alto de la C (a donde salta
// si lo tocas). L, A y el pie de la L solo se usan para revisar (?peluche=A).
const SPOTS: Spot[] = [
  { id: 'O', x: 1510.5, y: 40, sit: true },
  { id: 'C', x: 1143.5, y: 40, sit: false },
  { id: 'L', x: 620.3, y: 46, sit: false },
  { id: 'A', x: 472, y: 46, sit: false },
  { id: 'pie', x: 858, y: 358, sit: true },
];
const HOME = SPOTS[0];
const AWAY = SPOTS[1];

const BONES = [
  'Hips', 'Spine', 'Chest', 'Neck', 'Head',
  'UpperArm_L', 'LowerArm_L', 'UpperArm_R', 'LowerArm_R',
  'UpperLeg_L', 'LowerLeg_L', 'UpperLeg_R', 'LowerLeg_R',
] as const;
type Bone = (typeof BONES)[number];

/** Giros en grados alrededor de los ejes del mundo en la pose de reposo, más el cuerpo entero. */
interface Pose {
  bones: Record<Bone, [number, number, number]>;
  /** Desplazamiento y squash del cuerpo, en unidades del modelo. */
  y: number;
  squash: number;
}

const ease = {
  out: (t: number) => 1 - (1 - t) ** 3,
  inOut: (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
};
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

function emptyPose(): Pose {
  const bones = {} as Pose['bones'];
  for (const b of BONES) bones[b] = [0, 0, 0];
  return { bones, y: 0, squash: 0 };
}
function rot(p: Pose, bone: Bone, x: number, y: number, z: number, w = 1): void {
  const e = p.bones[bone];
  e[0] += x * w;
  e[1] += y * w;
  e[2] += z * w;
}

// Brazo izquierdo (+X) sube con +Z y va hacia delante con -Y; el derecho, al revés.
// Pierna hacia delante con -X; cabeza y tronco hacia delante con +X.
// En reposo solo respira: cualquier otro vaivén continuo se suma al de los focos y cansa.
function idle(t: number, p: Pose, k: number, arms: number): void {
  const breath = Math.sin((t * Math.PI * 2) / 3.4);
  rot(p, 'Chest', 1.4 * breath, 0, 0, k);
  rot(p, 'UpperArm_L', 0, 0, -24 * arms + 2 * breath * k);
  rot(p, 'UpperArm_R', 0, 0, 24 * arms - 2 * breath * k);
  p.squash += 0.006 * breath * k;
}

function seated(t: number, p: Pose, k: number, w: number): void {
  // Muslos al frente, espinillas colgando, manos hacia las rodillas. Cada 12,5 s da dos patadas
  // cortas (1,4 s); el resto del tiempo las piernas están quietas.
  const phase = (t + 6) % 12.5;
  const kick = phase < 1.4 ? Math.sin(phase * Math.PI * 2 * 1.4) * Math.sin((Math.PI * phase) / 1.4) : 0;
  rot(p, 'UpperLeg_L', -82, 0, 0, w);
  rot(p, 'UpperLeg_R', -82, 0, 0, w);
  rot(p, 'LowerLeg_L', 80 + 12 * kick * k, 0, 0, w);
  rot(p, 'LowerLeg_R', 80 - 12 * kick * k, 0, 0, w);
  rot(p, 'Spine', 4, 0, 0, w);
  rot(p, 'UpperArm_L', 0, -28, -10, w);
  rot(p, 'UpperArm_R', 0, 28, 10, w);
  p.y -= 0.125 * w;
}

/** Salto de un sitio a otro: anticipación, vuelo en arco bajo girado hacia donde va y aterrizaje. */
interface Hop {
  from: { x: number; y: number };
  to: Spot;
  t0: number;
}
const HOP = { crouch: 0.18, fly: 0.48, land: 0.36 };
const HOP_DUR = HOP.crouch + HOP.fly + HOP.land;
/** Cuánto se queda en la C antes de volver solo a la O. */
const AWAY_S: [number, number] = [3, 5];

/** «Celebra» al pulsar una puerta: brazos arriba dos veces y un botecito. */
const CHEER_DUR = 1.1;

export async function startPeluche(trace: HTMLElement): Promise<void> {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const params = new URLSearchParams(location.search);

  const canvas = document.createElement('canvas');
  canvas.className = 'peluche';
  canvas.setAttribute('aria-hidden', 'true');
  trace.append(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.toneMapping = THREE.NeutralToneMapping;
  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  const key = new THREE.DirectionalLight(0xfff4e8, 1.4);
  key.position.set(0.4, 1, 0.9);
  scene.add(key);
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, 1, 4000);
  camera.position.z = 2000;

  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(MODEL);
  let mesh: THREE.SkinnedMesh | null = null;
  gltf.scene.traverse((o) => {
    if ((o as THREE.SkinnedMesh).isSkinnedMesh) mesh = o as THREE.SkinnedMesh;
  });
  if (!mesh) throw new Error('El GLB del peluche no tiene malla con skin.');
  const doll: THREE.SkinnedMesh = mesh;
  doll.frustumCulled = false;
  gltf.scene.updateMatrixWorld(true);
  tintCrown(doll);

  const rig = new THREE.Group();
  rig.add(gltf.scene);
  scene.add(rig);
  const bones = {} as Record<Bone, { bone: THREE.Bone; rest: THREE.Quaternion; parent: THREE.Quaternion; parentInv: THREE.Quaternion }>;
  for (const name of BONES) {
    const bone = gltf.scene.getObjectByName(name) as THREE.Bone;
    const parent = new THREE.Quaternion();
    bone.parent!.getWorldQuaternion(parent);
    bones[name] = { bone, rest: bone.quaternion.clone(), parent, parentInv: parent.clone().invert() };
  }

  // Sombra de contacto: una mancha suave sobre la letra que ancla al peluche.
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: blobTexture(), transparent: true, depthWrite: false, opacity: 0.32 }),
  );
  scene.add(shadow);

  // --- Encaje con el logo: px CSS del canvas ↔ viewBox ------------------
  let box = { s: 1, left: 0, top: 0, w: 1, h: 1 };
  function layout(): void {
    const r = trace.getBoundingClientRect();
    const s = r.width / VIEW.w;
    const doll = DOLL * s;
    // El canvas sobresale del logo solo por arriba (de pie y el arco de los saltos): todos los
    // sitios quedan dentro del viewBox, y sobresalir por los lados daría scroll lateral en el móvil.
    const left = 0;
    const top = doll * 1.7;
    const w = r.width + 2 * left;
    const h = r.height + top + doll * 0.2;
    Object.assign(canvas.style, { left: `${-left}px`, top: `${-top}px`, width: `${w}px`, height: `${h}px` });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.right = w;
    camera.bottom = -h;
    camera.updateProjectionMatrix();
    box = { s, left, top, w, h };
  }
  const toPx = (vx: number, vy: number) => ({
    x: box.left + (vx - VIEW.x) * box.s,
    y: box.top + (vy - VIEW.y) * box.s,
  });
  new ResizeObserver(layout).observe(trace);
  layout();

  // --- Estado -------------------------------------------------------------
  const clock = new THREE.Clock();
  const fixed = params.get('peluche'); // revisión: ?peluche=C lo deja quieto en ese sitio
  let spot = SPOTS.find((s) => s.id === fixed) ?? HOME;
  const pos = { x: spot.x, y: spot.y };
  let sit = spot.sit ? 1 : 0;
  let sitTarget = sit;
  let hop: Hop | null = null;
  let pendingHop: Spot | null = null;
  let cheer = -10;
  let comeBack = Infinity; // en la O no se mueve solo; en la C vuelve al cabo de unos segundos

  // Aparece ya sentado, con el fundido del canvas (AlcoTrace).
  function go(to: Spot, now: number): void {
    if (hop || to === spot) return;
    if (sit > 0.05) {
      sitTarget = 0; // primero se levanta
      pendingHop = to;
      return;
    }
    hop = { from: { x: pos.x, y: pos.y }, to, t0: now };
  }

  // --- Mirada: cabeza que vigila el puntero (muelle críticamente amortiguado) ---
  // Mira donde está el puntero aunque se quede quieto; sin puntero (al entrar, o si sale de la
  // ventana) mira las puertas, como quien vigila la entrada.
  const pointer = { x: 0, y: 0, on: false };
  addEventListener('pointermove', (e) => Object.assign(pointer, { x: e.clientX, y: e.clientY, on: true }), { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.on = false; });
  addEventListener('pointerdown', (e) => {
    Object.assign(pointer, { x: e.clientX, y: e.clientY, on: true });
    if (hitDoll(e.clientX, e.clientY) && !reduce.matches && !fixed) go(spot === HOME ? AWAY : HOME, clock.elapsedTime);
  }, { passive: true });
  const doors = document.querySelector('.doors');
  for (const door of document.querySelectorAll('.btn[data-door]')) {
    door.addEventListener('click', () => { cheer = clock.elapsedTime; });
  }
  const gaze = { yaw: 0, pitch: 0, vy: 0, vp: 0 };
  const head = new THREE.Vector3();

  function look(dt: number, p: Pose, k: number): void {
    const r = canvas.getBoundingClientRect();
    bones.Head.bone.getWorldPosition(head);
    const hx = r.left + head.x;
    const hy = r.top - head.y;
    let tx = pointer.x;
    let ty = pointer.y;
    if (!pointer.on && doors) {
      const d = doors.getBoundingClientRect();
      tx = d.left + d.width / 2;
      ty = d.top + d.height / 2;
    }
    const yaw = THREE.MathUtils.clamp(((tx - hx) / innerWidth) * 70, -18, 18);
    const pitch = THREE.MathUtils.clamp(((ty - hy) / innerHeight) * 45, -10, 16);
    // Muelle más lento que el del cursor del logo: llega en ~1 s, sin rebote.
    const w0 = 4.5;
    gaze.vy += (w0 * w0 * (yaw - gaze.yaw) - 2 * w0 * gaze.vy) * dt;
    gaze.yaw += gaze.vy * dt;
    gaze.vp += (w0 * w0 * (pitch - gaze.pitch) - 2 * w0 * gaze.vp) * dt;
    gaze.pitch += gaze.vp * dt;
    rot(p, 'Neck', gaze.pitch * 0.35, gaze.yaw * 0.35, 0, k);
    rot(p, 'Head', gaze.pitch * 0.65, gaze.yaw * 0.55, 0, k);
  }

  const ray = new THREE.Raycaster();
  function hitDoll(cx: number, cy: number): boolean {
    const r = canvas.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return false;
    ray.setFromCamera(new THREE.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    return ray.intersectObject(doll, false).length > 0;
  }

  // --- Aplicar ------------------------------------------------------------
  const euler = new THREE.Euler();
  const q = new THREE.Quaternion();
  const local = new THREE.Quaternion();
  const D2R = Math.PI / 180;
  const tint = new THREE.Color();
  const warm = new THREE.Color(0xfff4e8);

  function apply(p: Pose, yawBody: number, lift: number): void {
    for (const name of BONES) {
      const { bone, rest, parent, parentInv } = bones[name];
      const [x, y, z] = p.bones[name];
      q.setFromEuler(euler.set(x * D2R, y * D2R, z * D2R, 'YXZ'));
      local.copy(parentInv).multiply(q).multiply(parent); // giro en ejes del mundo → espacio del padre
      bone.quaternion.multiplyQuaternions(local, rest);
    }
    const sy = 1 + p.squash;
    const sxz = 1 / Math.sqrt(sy); // conserva el volumen
    const unit = UNIT * box.s;
    const at = toPx(pos.x, pos.y);
    rig.position.set(at.x, -at.y + p.y * unit, 0);
    rig.scale.set(unit * sxz, unit * sy, unit * sxz);
    rig.rotation.y = yawBody;

    // La sombra se queda en la letra y se encoge con la altura del salto.
    const ground = toPx(hop ? hop.to.x : pos.x, hop ? Math.max(pos.y, hop.to.y) : pos.y);
    const size = DOLL * box.s * (0.42 + 0.12 * sit) * (1 - 0.6 * lift);
    shadow.position.set(ground.x, -ground.y - DOLL * box.s * 0.01, -400);
    shadow.scale.set(size, size * 0.22, 1);
    (shadow.material as THREE.MeshBasicMaterial).opacity = 0.3 * (1 - lift);
  }

  // El foco que apunta al peluche le da su color, igual que al logo (stage.ts lo escribe el humo).
  function light(): void {
    const r = canvas.getBoundingClientRect();
    const at = toPx(pos.x, pos.y - DOLL * 0.5);
    const x = (r.left + at.x) / innerWidth;
    const y = 1 - (r.top + at.y) / innerHeight;
    tint.copy(warm).multiplyScalar(0.55);
    let sum = 0;
    for (const l of stage.lights) {
      const a = lightAt(l, x, y, stage.aspect);
      tint.r += l.color[0] * a;
      tint.g += l.color[1] * a;
      tint.b += l.color[2] * a;
      sum += a;
    }
    key.color.copy(tint);
    key.intensity = 1.1 + 1.3 * Math.min(sum, 1.5);
  }

  // --- Bucle --------------------------------------------------------------
  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    toggle();
  }).observe(trace);
  document.addEventListener('visibilitychange', toggle);
  function toggle(): void {
    renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
  }

  const debugHop = params.get('peluche-salto'); // revisión: ?peluche-salto=O,C,0.5 congela un salto
  if (debugHop) {
    const [a, b, t] = debugHop.split(',');
    const from = SPOTS.find((s) => s.id === a) ?? HOME;
    Object.assign(pos, { x: from.x, y: from.y });
    spot = from;
    sit = 0;
    sitTarget = 0;
    hop = { from: { x: from.x, y: from.y }, to: SPOTS.find((s) => s.id === b) ?? HOME, t0: -Number(t) };
  }

  function frame(): void {
    const dt = Math.min(clock.getDelta(), 1 / 20);
    const now = debugHop ? 0 : clock.elapsedTime;
    const k = reduce.matches ? 0.35 : 1;
    const p = emptyPose();
    let yawBody = 0;
    let lift = 0;

    // Sentarse y levantarse: 0,4 s aprox.
    sit += (sitTarget - sit) * (1 - Math.exp(-dt * 9));
    if (pendingHop && sit < 0.05) {
      hop = { from: { x: pos.x, y: pos.y }, to: pendingHop, t0: now };
      pendingHop = null;
    }

    if (hop) {
      const t = now - hop.t0;
      const dx = hop.to.x - hop.from.x;
      const dir = Math.sign(dx);
      if (t < HOP.crouch) {
        const a = ease.inOut(t / HOP.crouch);
        p.squash -= 0.1 * a;
        rot(p, 'UpperArm_L', 0, 0, -14 * a);
        rot(p, 'UpperArm_R', 0, 0, 14 * a);
        rot(p, 'Spine', 6 * a, 0, 0);
        yawBody = dir * 0.5 * a;
      } else if (t < HOP.crouch + HOP.fly) {
        const u = (t - HOP.crouch) / HOP.fly;
        const arc = Math.sin(Math.PI * u);
        const h = DOLL * 0.28 + Math.abs(dx) * 0.05;
        pos.x = hop.from.x + dx * ease.inOut(u);
        pos.y = hop.from.y + (hop.to.y - hop.from.y) * u - 4 * h * u * (1 - u);
        lift = arc;
        yawBody = dir * (0.5 + 0.2 * arc);
        p.squash += 0.08 * Math.abs(1 - 2 * u) - 0.02;
        rot(p, 'UpperArm_L', 0, 0, 40 * arc);
        rot(p, 'UpperArm_R', 0, 0, -40 * arc);
        rot(p, 'UpperLeg_L', -16 * arc, 0, 0);
        rot(p, 'UpperLeg_R', -16 * arc, 0, 0);
      } else if (t < HOP_DUR) {
        const v = (t - (HOP_DUR - HOP.land)) / HOP.land;
        pos.x = hop.to.x;
        pos.y = hop.to.y;
        p.squash -= 0.13 * Math.exp(-5 * v) * Math.cos(11 * v);
        rot(p, 'Head', 6 * Math.exp(-4 * v) * Math.cos(9 * v), 0, 0);
        yawBody = dir * 0.5 * (1 - ease.out(v));
      } else if (!debugHop) {
        spot = hop.to;
        Object.assign(pos, { x: spot.x, y: spot.y });
        sitTarget = spot.sit ? 1 : 0;
        hop = null;
        comeBack = spot === HOME ? Infinity : now + rand(...AWAY_S);
      }
    } else if (!fixed && now > comeBack) {
      comeBack = Infinity;
      go(HOME, now);
    }

    const c = now - cheer;
    if (c < CHEER_DUR) {
      const up = Math.sin(Math.PI * clamp01(c / CHEER_DUR));
      const wave = Math.abs(Math.sin(c * Math.PI * 2 * 1.8));
      rot(p, 'UpperArm_L', 0, 0, (70 + 15 * wave) * up, k);
      rot(p, 'UpperArm_R', 0, 0, -(70 + 15 * wave) * up, k);
      rot(p, 'Head', -8 * up, 0, 0, k);
      p.y += 0.04 * wave * up * (1 - sit) * k;
    }

    const armsBusy = Math.max(hop ? 0.7 : 0, c < CHEER_DUR ? 0.7 * Math.sin(Math.PI * clamp01(c / CHEER_DUR)) : 0);
    idle(now, p, k, 1 - armsBusy);
    seated(now, p, k, ease.inOut(clamp01(sit)));
    look(dt, p, k);
    apply(p, yawBody, lift);
    light();
    renderer.render(scene, camera);
    if (!canvas.classList.contains('on')) requestAnimationFrame(() => canvas.classList.add('on'));
  }
  toggle();
}

/** Mancha radial para la sombra de contacto. */
function blobTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(20, 16, 28, 1)');
  grad.addColorStop(1, 'rgba(20, 16, 28, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// Hunyuan pintó la coronilla y la nuca casi color piel (no las veía en las fotos): dentro del
// casquete de pelo, los píxeles claros pasan a castaño conservando el detalle de la textura.
function tintCrown(mesh: THREE.SkinnedMesh): void {
  const pos = mesh.geometry.attributes.position;
  const zone = new Float32Array(pos.count);
  const v = new THREE.Vector3();
  const s = THREE.MathUtils.smoothstep;
  for (let i = 0; i < pos.count; i++) {
    // Con el GLB cuantizado la escala va en las matrices de bind: hay que pasar por el skinning.
    mesh.getVertexPosition(i, v).applyMatrix4(mesh.matrixWorld);
    const head = s(v.y, 0.64, 0.68);
    const face = s(v.z, 0.0, 0.06) * (1 - s(v.y, 0.95, 0.99));
    const ears = s(Math.abs(v.x), 0.22, 0.25) * (1 - s(v.y, 0.89, 0.93));
    zone[i] = head * (1 - face) * (1 - ears);
  }
  mesh.geometry.setAttribute('hairZone', new THREE.BufferAttribute(zone, 1));
  const material = mesh.material as THREE.MeshStandardMaterial;
  material.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float hairZone;\nvarying float vHairZone;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvHairZone = hairZone;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vHairZone;')
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        float lum = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        vec3 hair = vec3(0.12, 0.062, 0.032) * (0.55 + 1.6 * lum);
        diffuseColor.rgb = mix(diffuseColor.rgb, hair, vHairZone * smoothstep(0.12, 0.3, lum));`,
      );
  };
  material.needsUpdate = true;
}
