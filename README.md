# Digital Exhibition

An interactive digital exhibition / museum website built for a Graphic Design course at **Universidad de Buenos Aires**. The site presents a curated collection of objects through an immersive, animation-driven experience — gallery, timeline, exhibition viewer, catalog and program.

> **Status:** Functional visual prototype. The principal routes, editorial content, responsive layouts, navigation, interactive collection, timeline, New Look story and shared motion system are implemented. The remaining work is final Figma alignment and production content QA.

---

## Stack

| Concern           | Tool                                                   |
| ----------------- | ------------------------------------------------------ |
| Framework         | [Astro](https://astro.build) (static, no UI framework) |
| Language          | TypeScript (strict)                                    |
| Styling           | TailwindCSS v4 (CSS-first) + CSS custom properties     |
| Animation         | [GSAP](https://gsap.com) (+ ScrollTrigger)             |
| Smooth scroll     | [Lenis](https://github.com/darkroomengineering/lenis)  |
| Carousels/sliders | [Swiper](https://swiperjs.com)                         |
| Icons             | [astro-icon](https://github.com/natemoo-re/astro-icon) |
| SEO               | `@astrojs/sitemap`, OpenGraph metadata                 |
| Optimization      | `@playform/compress` (asset compression)               |
| Quality           | ESLint (flat config) + Prettier                        |
| Package manager   | **npm**                                                |

> React is intentionally **not** used. Add a UI framework only if a feature genuinely requires it.

---

## Requirements

- Node.js `>= 18.20` (LTS recommended)
- npm `>= 9`

---

## Installation

```bash
npm install
```

Then copy the environment template:

```bash
cp .env.example .env
```

Set `PUBLIC_SITE_URL` in `.env` to your deployment URL. `astro.config.mjs` consumes it for canonical links, OpenGraph URLs and the sitemap.

---

## Development

```bash
npm run dev
```

Starts the dev server at `http://localhost:4321`.

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the local dev server                      |
| `npm run build`        | Type-check (`astro check`) and build to `dist/` |
| `npm run preview`      | Preview the production build locally            |
| `npm run lint`         | Lint all source files                           |
| `npm run lint:fix`     | Lint and auto-fix                               |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Verify formatting without writing               |

---

## Build

```bash
npm run build
```

Outputs a static site to `dist/`, ready to deploy to Vercel (or any static host). The build runs `astro check` first, so type errors fail the build.

---

## Project structure

```text
.
├─ public/                 # Static assets served as-is (favicon, fonts, images, icons)
├─ src/
│  ├─ assets/              # Source assets processed by the build
│  │  ├─ fonts/            # Custom font files (placeholders)
│  │  ├─ images/           # Source images
│  │  └─ icons/            # SVG icons consumed by astro-icon
│  ├─ components/          # Reusable UI, grouped by domain
│  │  ├─ layout/           # Structural pieces (Footer, …)
│  │  ├─ navigation/       # Navbar and menus
│  │  ├─ hero/             # Hero sections
│  │  ├─ gallery/          # Collection grid & cards
│  │  ├─ filters/          # Collection filtering UI
│  │  ├─ timeline/         # Timeline visualisation
│  │  ├─ popup/            # Modal / dialog shells
│  │  ├─ agenda/           # Program / schedule
│  │  ├─ exhibition/       # Object viewer & exhibition UI
│  │  └─ common/           # Cross-cutting (PageTransition, …)
│  ├─ layouts/             # Page shells (BaseLayout, MainLayout)
│  ├─ pages/               # File-based routes
│  ├─ styles/              # global.css, variables.css, animations.css, fonts.css
│  ├─ lib/                 # Third-party integrations (gsap, lenis, animations)
│  ├─ utils/               # Small framework-agnostic helpers
│  ├─ data/                # Static/config data (navigation, site config)
│  └─ types/               # Shared TypeScript types
├─ astro.config.mjs        # Astro + integrations config
├─ eslint.config.mjs       # ESLint flat config
├─ tsconfig.json           # TypeScript config + path aliases
└─ .prettierrc.json        # Prettier config
```

### Path aliases

Configured in `tsconfig.json` for clean imports:

| Alias           | Resolves to        |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@layouts/*`    | `src/layouts/*`    |
| `@styles/*`     | `src/styles/*`     |
| `@lib/*`        | `src/lib/*`        |
| `@utils/*`      | `src/utils/*`      |
| `@data/*`       | `src/data/*`       |
| `@assets/*`     | `src/assets/*`     |

Shared types live in `src/types` and are imported via `@/types/index` (the `@types` prefix is reserved by TypeScript for type-declaration packages, so it is intentionally avoided).

---

## Styling & design tokens

All visual values live as CSS custom properties in `src/styles/variables.css` — colors, spacing, radius, typography, z-index, animation durations and scroll easing. **Always read from these tokens** (`var(--…)`) instead of hard-coding values, so the site can be re-themed from a single file. Selected tokens are also exposed to Tailwind via `@theme` in `global.css`.

- `variables.css` — design tokens (single source of truth)
- `fonts.css` — `@font-face` placeholders (add real font files to `public/fonts/`)
- `animations.css` — CSS keyframes & reduced-motion handling
- `global.css` — entry point: imports the above + Tailwind + base resets

---

## Animation

- **GSAP** is centralised in `src/lib/gsap.ts` (single import point, plugins registered once). Import GSAP from there, never directly.
- Reusable motion helpers live in `src/lib/animations.ts` (API defined; implementations to be filled in).
- **Lenis** smooth scroll is set up in `src/lib/lenis.ts` and synced to GSAP's ticker + ScrollTrigger. It respects `prefers-reduced-motion`.

---

## Coding conventions

- **English everywhere** — folders, files, variables, functions, types, components and comments.
- **Components:** `PascalCase.astro`, grouped by domain under `src/components`.
- **Utilities/helpers:** `camelCase` functions in `camelCase.ts` files.
- **Types:** `PascalCase`, centralised in `src/types`.
- **CSS:** BEM-ish class names scoped inside components; global values via CSS variables.
- **Imports:** use path aliases (`@components/…`) over deep relative paths.
- **Formatting/linting:** Prettier + ESLint run on save (see `.vscode/settings.json`); keep the tree clean before committing.
- **Accessibility:** honour `prefers-reduced-motion`; prefer semantic elements (`<dialog>`, `<time>`, `<nav>`).

---

## Roadmap

- [ ] Define the final design system (replace placeholder tokens & fonts)
- [ ] Implement the Home hero and featured sections
- [ ] Wire the collection content model and data source
- [ ] Build collection filtering (client-side)
- [ ] Implement the interactive object viewer (zoom / 3D / media)
- [ ] Build the scroll-driven timeline
- [ ] Implement GSAP reveal & page-transition animations
- [ ] Add Swiper-based carousels where needed
- [ ] Populate agenda / catalog content
- [ ] SEO polish: real OG images, structured data
- [ ] Deploy to Vercel

---

## License

Academic project — Universidad de Buenos Aires. Not licensed for redistribution.
