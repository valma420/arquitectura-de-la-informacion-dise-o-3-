import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

/**
 * Flat ESLint config (ESLint 9+).
 * Layers: base JS recommended → TypeScript recommended → Astro recommended.
 */
export default tseslint.config(
  {
    // Files and folders ESLint should never touch.
    // `*.d.ts` is skipped because Astro's generated env types use triple-slash refs.
    ignores: ['dist/', 'node_modules/', '.astro/', 'public/', '**/*.d.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Allow unused args prefixed with `_` (placeholder signatures during scaffolding).
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  }
);
