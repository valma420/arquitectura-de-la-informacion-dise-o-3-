// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import compress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';

/**
 * Astro configuration.
 *
 * NOTE: Update `site` to the final production URL before deploying to Vercel.
 * It is required for a correct sitemap and canonical/OpenGraph URLs.
 */
export default defineConfig({
  site: 'https://example.com',

  // Tailwind CSS v4 is wired through the official Vite plugin (CSS-first config).
  vite: {
    // Cast sidesteps a benign type clash between Astro's bundled Vite and the
    // Vite type declarations resolved for @tailwindcss/vite.
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  integrations: [
    icon({
      // Local SVG icons live in `src/assets/icons` and are referenced by name.
      iconDir: 'src/assets/icons',
    }),
    sitemap(),
    // Asset compression runs last so it processes the final build output.
    compress(),
  ],
});
