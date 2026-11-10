// Contenido de las subwebs, en archivos del repo con esquema: si falta un campo o un idioma, la
// compilación falla en lugar de publicar algo roto. Cómo añadir cada cosa: src/data/README.md.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Texto en los tres idiomas de la web; ninguno puede faltar. */
const t = z.object({ es: z.string().min(1), ca: z.string().min(1), en: z.string().min(1) });
/** Año y mes, «2026-10». */
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

// ALCO (canal L)

/** Un instante de un evento: hora (si la tiene), qué pasa y la foto que lo acompaña. */
const moment = z.object({
  h: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  name: t,
  meta: t,
  text: t,
  /** Id de una foto de gallery.yaml. */
  photo: z.string(),
});

/**
 * Una carpeta por tipo de evento: src/data/alco/services/<id>.yaml. La portada de /alco las apila con
 * pestaña; la que tiene `front: true` sale abierta. `real: false` marca los momentos de ejemplo.
 */
const services = defineCollection({
  loader: glob({ base: './src/data/alco/services', pattern: '*.yaml' }),
  schema: z.object({
    order: z.number(),
    color: z.enum(['peach', 'lavender', 'mint', 'sky', 'rose']),
    real: z.boolean(),
    front: z.boolean().default(false),
    /** Id de una foto de gallery.yaml para la carpeta abierta. */
    photo: z.string(),
    title: t,
    line: t,
    cta: t,
    source: t,
    sourceNote: t,
    moments: z.array(moment).min(1),
    /** Qué incluye; vacío hasta que Pol lo confirme. */
    includes: z.array(t).default([]),
  }),
});

/** «Cómo preparo tu fecha»: un paso por elemento; `gap` es el aire sobre la foto. */
const steps = defineCollection({
  loader: file('./src/data/alco/steps.yaml'),
  schema: z.object({ order: z.number(), photo: z.string(), gap: z.number(), title: t, text: t }),
});

/** Marcas y eventos. Solo salen en la web los que tienen `show: true` (permiso de Pol). */
const brands = defineCollection({
  loader: file('./src/data/alco/brands.yaml'),
  schema: z.object({
    name: z.string(),
    event: t,
    year: z.number().int().optional(),
    show: z.boolean().default(false),
  }),
});

/** Fotos de la galería; los archivos están en src/data/alco/gallery/. */
const gallery = defineCollection({
  loader: file('./src/data/alco/gallery.yaml'),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      image: image(),
      alt: t,
      /** Local donde se hizo, si se sabe; con `label`, la foto sale en «Dónde he pinchado». */
      place: z.union([z.string(), t]).optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      label: t.optional(),
      mood: z.enum(['cabina', 'pista', 'sala', 'jardin', 'dia']),
      credit: z.string().optional(),
    }),
});

// Pol ingeniero (canal R)

/** Nombre propio (igual en los tres idiomas) o texto traducido. */
const label = z.union([z.string().min(1), t]);

/**
 * Una carpeta por tipo de problema: src/data/dev/areas/<id>.yaml. La portada de /dev las apila con
 * pestaña, igual que los tipos de evento de /alco; dentro, sus proyectos. Un proyecto lleva captura
 * (`image`, en ../shots/) o, si no se puede enseñar, una ficha de texto (`card`).
 */
const areas = defineCollection({
  loader: glob({ base: './src/data/dev/areas', pattern: '*.yaml' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      color: z.enum(['peach', 'lavender', 'mint', 'sky', 'rose']),
      front: z.boolean().default(false),
      title: t,
      line: t,
      source: t,
      sourceNote: t,
      items: z
        .array(
          z
            .object({
              name: label,
              meta: label,
              summary: t,
              role: t,
              stack: z.array(z.string()).min(1),
              url: z.url().optional(),
              source: z.url().optional(),
              image: image().optional(),
              card: z.object({ big: label, small: t }).optional(),
            })
            .refine((it) => it.image || it.card, { message: 'Cada proyecto lleva `image` o `card`.' }),
        )
        .min(1),
    }),
});

/** «Cómo llevo un proyecto»: un paso por elemento; `gap` es el aire sobre la captura. */
const devSteps = defineCollection({
  loader: file('./src/data/dev/steps.yaml'),
  schema: ({ image }) => z.object({ order: z.number(), image: image(), gap: z.number(), title: t, text: t }),
});

/** Un puesto o estudio por archivo: src/data/dev/experience/<id>.yaml. Sin `end`, sigue hoy. */
const experience = defineCollection({
  loader: glob({ base: './src/data/dev/experience', pattern: '*.yaml' }),
  schema: z.object({
    kind: z.enum(['work', 'education']),
    role: t,
    org: z.string(),
    place: t,
    start: month,
    end: month.optional(),
    summary: t,
    stack: z.array(z.string()).default([]),
  }),
});

/** Tecnologías agrupadas por contexto. */
const stack = defineCollection({
  loader: file('./src/data/dev/stack.yaml'),
  schema: z.object({ order: z.number(), label: t, items: z.array(z.string()).min(1) }),
});

/** Experimentos vivos del laboratorio: src/data/dev/lab/<id>.yaml */
const lab = defineCollection({
  loader: glob({ base: './src/data/dev/lab', pattern: '*.yaml' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: t,
      line: t,
      stack: z.array(z.string()).min(1),
      year: z.number().int(),
      /** Captura del experimento, en ../shots/. */
      image: image(),
      alt: t,
    }),
});

export const collections = { services, steps, brands, gallery, areas, devSteps, experience, stack, lab };
