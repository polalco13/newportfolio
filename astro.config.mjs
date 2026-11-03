// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://polalco.com',
  // URLs sin barra final (/alco, /en/cv): cada página sale como un .html propio.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
