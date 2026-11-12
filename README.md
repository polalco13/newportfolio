# polalco.com

Portafolio de Pol Alcoverro. La portada «Señal» es el vestíbulo: el logo de ALCO dibujado como una señal de dos canales y dos puertas, el canal L (ALCO, el DJ) y el R (Pol, el ingeniero), que llevan a cada subweb. Plan por fases: `docs/plan-portafolio.md`.

## En local

```bash
pnpm install
pnpm preview       # compila con Astro y lo sirve con el Worker en http://127.0.0.1:8790
pnpm preview:lan   # lo mismo, visible en la wifi para probarlo en el móvil
pnpm dev           # solo Astro, con recarga en caliente (sin Worker: los PDFs están en /files/)
pnpm test          # prueba el Worker (idiomas, redirecciones, cabeceras de los PDFs y el contador)
pnpm og            # regenera las imágenes para compartir: vestíbulo y, por idioma, /alco y /dev (necesita Google Chrome)
```

## Cómo está hecha

- `src/` Astro estático. Los textos de la interfaz, en `src/content/copy.ts`; el tamaño de cada PDF se lee al compilar.
- `src/data/` el contenido de las subwebs (servicios, marcas, fotos, proyectos, experiencia, stack, laboratorio) en YAML con esquema (`src/content.config.ts`). Cómo añadir cada cosa: `src/data/README.md`.
- `src/components/AlcoPage.astro` (de noche) y `DevPage.astro` (de día) las dos subwebs: la misma página con otra luz, dentro de `src/layouts/Channel.astro`. Comparten cada pieza de `src/components/sub/`: la barra con el conmutador DJ | Ingeniero y la hora de Barcelona (`TopBar`), la portada (`Hero`), las carpetas (`FolderStack`) y su hoja (`FolderSheet`), «Cómo trabajo» (`Intro`), la franja de nombres que pasa (`Marquee`), las fotos con etiqueta (`TaggedTiles`), la fila que se arrastra (`DragRow`), el formulario que prepara el correo (`Visit`) y el dorso de la tarjeta con la marca a todo lo ancho (`BackCard`).
- `src/scripts/subweb.ts` el comportamiento común (entradas, barra que se esconde, reloj, rótulos que llenan su ancho, arrastre, formulario) y `src/scripts/folders.ts` las carpetas. `src/styles/subweb.css` los tokens y el paso entre páginas (transiciones de vista entre el vestíbulo, /alco y /dev).
- `src/scripts/beam.ts` el logo: un rótulo de luz relleno en un canvas, que se enciende al entrar y toma el color del foco que lo apunta. Sin JavaScript o con «reducir movimiento» se ve el SVG de `src/components/AlcoTrace.astro`.
- `src/scripts/haze.ts` el fondo: humo y tres focos con su programa, en un shader WebGL. Sin WebGL quedan las manchas en CSS de `src/components/Haze.astro`.
- `src/scripts/stage.ts` hacia dónde apuntan los focos, compartido entre el fondo y el logo.
- `shared/site.ts` idiomas, páginas, redirecciones, documentos y la elección de idioma, compartidos con el Worker y el middleware.
- `worker/index.ts` elige el idioma de /, /alco y /dev con `Accept-Language` (sin redirigir), redirige /cv a /dev y sirve y cuenta /alco.pdf y /cv.pdf en Workers Analytics Engine: documento, origen, ref, país e idioma, sin IP ni cookies.
- `src/scripts/peluche.ts` el peluche 3D que vigila desde la O (three.js, se carga después de la entrada). Modelo en `public/models/peluche.glb`.
- `public/files/` los PDFs.

## Rutas

| URL | Qué es |
| --- | --- |
| `/` | El vestíbulo con las dos puertas, en el idioma del navegador |
| `/alco` | Subweb de ALCO: servicios, marcas, fotos, pedir fecha y el PDF |
| `/dev` | Subweb de Pol ingeniero: carpetas por tipo de trabajo con sus proyectos, experiencia, stack, laboratorio, escribirle y el CV |
| `/cv`, `/xx/cv` | Redirigen (301) a `/dev` y `/xx/dev` |
| `/es/…`, `/ca/…`, `/en/…` | Lo mismo con el idioma fijo (el selector lleva aquí) |
| `/alco.pdf`, `/cv.pdf` | Los documentos; `?src=` (ig, li, qr, mail…) y `?ref=` dicen de dónde viene la descarga |
| `/privacidad`, `/ca/privacitat`, `/en/privacy` | Privacidad |
| `/sitemap.xml` | Mapa del sitio con las alternativas de idioma (`src/pages/sitemap.xml.ts`); `robots.txt` lo enlaza |

## Publicación

polalco.com se publica en **Vercel** desde `main`: `vercel.json` (Astro estático, URLs sin `.html`, las rutas de los PDFs y la redirección de /cv) y `middleware.ts`, que hace lo mismo que el Worker con /, /alco y /dev. En Vercel no hay contador de descargas. `vercel.json` pone también la caché larga de `/_astro/` (archivos con huella) y las cabeceras de seguridad.

El Worker de Cloudflare (`worker/`, `wrangler.jsonc`) sigue aquí para `pnpm preview` y por si la web pasa a Cloudflare; entonces habría que volver a explicar el contador en la página de privacidad.
