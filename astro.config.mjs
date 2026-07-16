// @ts-check
import { defineConfig } from 'astro/config';
import { cwd, env as processEnv } from 'node:process';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const mode = processEnv.NODE_ENV ?? 'development';
const env = loadEnv(mode, cwd(), '');
const site = processEnv.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL ?? 'https://example.com';

/**
 * Astro configuration.
 *
 * `PUBLIC_SITE_URL` supplies the canonical production origin. The fallback keeps
 * local builds working, but production should always define the environment value.
 */
export default defineConfig({
  site,

  // Tailwind CSS v4 is wired through the official Vite plugin (CSS-first config).
  vite: {
    // Cast sidesteps a benign type clash between Astro's bundled Vite and the
    // Vite type declarations resolved for @tailwindcss/vite.
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  integrations: [
    sitemap(),
    // Asset compression runs last so it processes the final build output.
    compress(),
  ],
});
