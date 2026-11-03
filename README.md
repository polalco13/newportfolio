# polalco.com

Landing de una pantalla con un solo trabajo: que quien llegue descargue el portfolio de DJ (ALCO) o el CV de ingeniero. Dirección «Señal»: el logo de ALCO dibujado como una señal de dos canales; el canal L es el DJ y el R, el ingeniero.

## En local

```bash
pnpm install
pnpm preview       # compila con Astro y lo sirve con el Worker en http://127.0.0.1:8790
pnpm preview:lan   # lo mismo, visible en la wifi para probarlo en el móvil
pnpm dev           # solo Astro, con recarga en caliente (sin Worker: los PDFs están en /files/)
pnpm test          # prueba el Worker (idiomas, cabeceras de los PDFs y el contador)
pnpm og            # regenera las imágenes para compartir (necesita Google Chrome)
```

## Cómo está hecha

- `src/` Astro estático. Todo el texto, en `src/content/copy.ts`; el tamaño de cada PDF se lee al compilar.
- `src/scripts/beam.ts` el logo: un rótulo de luz relleno en un canvas, que se enciende al entrar y toma el color del foco que lo apunta. Sin JavaScript o con «reducir movimiento» se ve el SVG de `src/components/AlcoTrace.astro`.
- `src/scripts/haze.ts` el fondo: humo y tres focos con su programa, en un shader WebGL. Sin WebGL quedan las manchas en CSS de `src/components/Haze.astro`.
- `src/scripts/stage.ts` hacia dónde apuntan los focos, compartido entre el fondo y el logo.
- `shared/site.ts` idiomas, documentos y la elección de idioma, compartidos con el Worker y el middleware.
- `worker/index.ts` elige el idioma de /, /alco y /cv con `Accept-Language` (sin redirigir) y sirve y cuenta /alco.pdf y /cv.pdf en Workers Analytics Engine: documento, origen, ref, país e idioma, sin IP ni cookies.
- `src/scripts/peluche.ts` el peluche 3D que vigila desde la O (three.js, se carga después de la entrada). Modelo en `public/models/peluche.glb`.
- `public/files/` los PDFs.

## Rutas

| URL | Qué es |
| --- | --- |
| `/`, `/alco`, `/cv` | La landing: general, centrada en el DJ o centrada en el CV, en el idioma del navegador |
| `/es/…`, `/ca/…`, `/en/…` | Lo mismo con el idioma fijo (el selector lleva aquí) |
| `/alco.pdf`, `/cv.pdf` | Los documentos; `?src=` (ig, li, qr, mail…) y `?ref=` dicen de dónde viene la descarga |
| `/privacidad`, `/ca/privacitat`, `/en/privacy` | Privacidad |

## Publicación

polalco.com se publica en **Vercel** desde `main`: `vercel.json` (Astro estático, URLs sin `.html` y las rutas de los PDFs) y `middleware.ts`, que hace lo mismo que el Worker con /, /alco y /cv. En Vercel no hay contador de descargas.

El Worker de Cloudflare (`worker/`, `wrangler.jsonc`) sigue aquí para `pnpm preview` y por si la web pasa a Cloudflare; entonces habría que volver a explicar el contador en la página de privacidad.
