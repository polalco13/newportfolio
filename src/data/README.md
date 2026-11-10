# Contenido de las subwebs

Todo lo que sale en /alco y /dev está aquí, en YAML. Los esquemas están en `src/content.config.ts`:
si falta un campo o un idioma (`es`, `ca`, `en`), `pnpm build` falla y dice qué archivo y qué campo.
Los textos de la interfaz (títulos de sección, botones) están en `src/content/copy.ts`.

## ALCO (`alco/`)

La portada de /alco son cinco carpetas, una por tipo de evento; cada una se abre en sus momentos.

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Un tipo de evento (una carpeta) | `services/<id>.yaml` | `order`, `color` (`peach`, `lavender`, `mint`, `sky` o `rose`), `real` (`false` si los momentos son de ejemplo: sale la marca «Ejemplo»), `front: true` en la que sale abierta, `photo` (id de una foto de `gallery.yaml`), `title`, `line`, `cta`, `source` y `sourceNote` (de qué evento salen los momentos). |
| Un momento | `moments` dentro de su carpeta | `h` (hora, `'20:00'`, opcional), `name`, `meta` (una nota corta), `text` y `photo` (id de `gallery.yaml`). |
| Un paso de «Cómo preparo tu fecha» | `steps.yaml` | `id`, `order`, `title`, `text`, `photo` y `gap` (aire sobre la foto, en px; varíalo para que las fotos suban y bajen). |
| Una marca o evento | `brands.yaml` | Añade un elemento con `id`. Solo sale si tiene `show: true`. |
| Una foto | `gallery/` + `gallery.yaml` | Copia la foto (JPG de unos 1800 px) a `gallery/` y añade un elemento con `id`, `order`, `image`, `mood`, `alt` en los tres idiomas y `credit` si hay que citar al fotógrafo. Con `place` (el local, o un texto en los tres idiomas), `date` (`'2026-09-25'`) y `label`, sale en «Dónde he pinchado»; procura que sean 8, 12 o 16 para que no quede una foto sola en la última fila. |

Los textos fijos de la página (titular, botones, «Cómo trabajo» y sus cuatro datos, el formulario y el pie) están en `src/content/copy.ts`, bloque `alco`.

## Pol ingeniero (`dev/`)

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Un tipo de trabajo (una carpeta) | `areas/<id>.yaml` | `order`, `color` (`peach`, `lavender`, `mint`, `sky` o `rose`), `front: true` en la que sale abierta, `title`, `line`, `source` y `sourceNote` (de dónde salen los proyectos). |
| Un proyecto | `items` dentro de su carpeta | `name` y `meta` (un nombre propio tal cual, o un texto en los tres idiomas), `summary`, `role`, `stack`, `url` y `source` si los hay, y una captura (`image: ../shots/<archivo>.jpg`) o, si no se puede enseñar, una ficha de texto (`card` con `big` y `small`). |
| Una captura | `shots/` | JPG de unos 1440 px de ancho. Las usan los proyectos, los pasos y el laboratorio. |
| Un paso de «Cómo llevo un proyecto» | `steps.yaml` | `id`, `order`, `title`, `text`, `image` (`./shots/…`) y `gap` (aire sobre la captura, en px). |
| Un puesto o estudio | `experience/<id>.yaml` | `kind` (`work` o `education`), `role`, `org`, `place`, `start` (`2026-10`), `end` (sin `end`, «hoy»), `summary`, `stack`. Se ordenan solos por fecha. |
| Tecnologías | `stack.yaml` | Grupos con `order`, `label` e `items`. |
| Un experimento | `lab/<id>.yaml` | `order`, `year`, `name`, `line`, `stack`, `image` (`../shots/…`, vertical 4:5) y `alt`. Son tres columnas: procura que sean 3 o 6. |

Los textos fijos de la página (titular, «Cómo trabajo» y sus cuatro datos, el formulario y el pie) están en `src/content/copy.ts`, bloque `dev`. Un título de formación con coma («Grado en…, especialidad en…») se parte solo: lo segundo baja a la línea de la universidad.

## Cuidado con el YAML

- Un texto con coma dentro de `{ es: …, ca: … }` parte el mapa: escríbelo en varias líneas
  (`es: Cardona, presencial`).
- Un texto que empieza por comilla, `#`, `:`, `[` o `{` va entre comillas.
- `TODO(pol)` en un comentario marca lo que falta confirmar; no sale en la web.
