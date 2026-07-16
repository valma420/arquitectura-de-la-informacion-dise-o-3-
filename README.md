# Palais Galliera - Digital Exhibition

Interactive fashion-museum experience created for **Diseño 3**, a Graphic Design
course at **Universidad de Buenos Aires**. It translates an evolving Figma design
into a production-oriented, semi-functional website. It is inspired by the
Palais Galliera, but it is not the museum's official website or live program.

> **Status:** Functional static prototype. The principal routes, collection,
> object views, editorial stories, timeline, agenda, desktop layouts,
> navigation and shared motion layer are implemented. The target is a polished
> deployed prototype, not a production-grade museum information system.

## Project goal

The front-end experience is the deliverable. Visual fidelity to the available
Figma screens, animation, interaction, desktop composition and overall aesthetic
quality take priority over building a live content platform. Static curated data
is intentional and sufficient for the prototype.

Figma may continue evolving during the course. Each implemented surface should
follow the latest approved reference available for that scope while keeping the
site coherent and deployable between design iterations.

## Implemented routes

| Route                | Experience                                                   |
| -------------------- | ------------------------------------------------------------ |
| `/`                  | Editorial home and entry points into the exhibition.         |
| `/coleccion/`        | Curated eighteenth-century collection catalogue.             |
| `/coleccion/[slug]/` | Generated object detail and immersive viewer.                |
| `/explorar/`         | Interactive reconstruction of the Rococo room.               |
| `/historia/`         | Curatorial story about Rococo and the _robe à la française_. |
| `/linea-de-tiempo/`  | Fashion silhouette timeline from 1870 to 1929.               |
| `/muestra/`          | Digital exhibition about Dior's New Look.                    |
| `/agenda/`           | Static academic program for June 2026.                       |

## Stack

| Concern         | Tool                                                           |
| --------------- | -------------------------------------------------------------- |
| Framework       | Astro 5, static output and no UI framework                     |
| Language        | TypeScript in strict mode                                      |
| Styling         | Tailwind CSS 4 plus component CSS and shared custom properties |
| Motion          | GSAP with ScrollTrigger and Lenis smooth scrolling             |
| SEO             | Canonical metadata, OpenGraph and `@astrojs/sitemap`           |
| Build output    | `@playform/compress` asset compression                         |
| Quality         | ESLint and Prettier                                            |
| Package manager | npm                                                            |

## Requirements

Astro's locked runtime accepts:

- Node.js `18.20.8`, `^20.3.0` or `>=22.0.0`;
- npm `>=9.6.5`.

Node 22 is the recommended development runtime.

## Setup

```bash
npm install
```

Create a local `.env` from `.env.example` and set the public production origin:

```dotenv
PUBLIC_SITE_URL="https://example.com"
```

The value is used for canonical URLs, OpenGraph metadata and the sitemap. It is
public configuration, not a secret. Local `.env*` files remain ignored by Git.

Start the development server:

```bash
npm run dev
```

The default local URL is `http://localhost:4321`.

## Commands

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Start the Astro development server.                      |
| `npm run build`        | Run `astro check` and create the static site in `dist/`. |
| `npm run preview`      | Serve the generated production build locally.            |
| `npm run lint`         | Lint JavaScript, TypeScript and Astro files.             |
| `npm run lint:fix`     | Apply ESLint's automatic fixes.                          |
| `npm run format`       | Format supported source and documentation files.         |
| `npm run format:check` | Verify Prettier formatting without writing.              |

## Repository map

| Path                     | Responsibility                                                   |
| ------------------------ | ---------------------------------------------------------------- |
| `src/pages/`             | File-based routes and route-specific editorial composition.      |
| `src/components/`        | Shared navigation, layout and transition components.             |
| `src/layouts/`           | HTML/SEO shell and the shared site layout.                       |
| `src/data/collection.ts` | Collection records, periods and object relationships.            |
| `src/data/navigation.ts` | Shared navigation links.                                         |
| `src/data/site.ts`       | Site metadata and default SEO values.                            |
| `src/lib/`               | Central GSAP registration, motion helpers and Lenis integration. |
| `src/styles/`            | Global entry point, shared tokens, typography and CSS motion.    |
| `public/images/`         | Active image assets grouped by experience.                       |
| `src/assets/`            | Reserved build-processed assets; currently placeholders only.    |

Some editorial data remains inside its route file. In particular,
`src/pages/agenda.astro` currently owns the rendered agenda; the separate
`src/data/agenda.ts` module is not imported by the application.

This static model is appropriate for the current prototype. A database, CMS or
live museum API is not required unless the scope of the academic delivery
changes.

Path aliases are defined in `tsconfig.json`:

| Alias           | Target             |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@layouts/*`    | `src/layouts/*`    |
| `@styles/*`     | `src/styles/*`     |
| `@lib/*`        | `src/lib/*`        |
| `@utils/*`      | `src/utils/*`      |
| `@data/*`       | `src/data/*`       |
| `@assets/*`     | `src/assets/*`     |

## Visual system and motion

`src/styles/variables.css` defines the shared semantic palette, typography,
spacing, layout, radius, z-index and motion tokens. Components also use local
values for composition-specific geometry; not every visual value is expected to
be a global token.

The current typography is loaded from Google Fonts in `BaseLayout.astro`:
Bodoni Moda approximates IvyBodoni for display text, while Inter is used for UI
and body copy. `public/fonts/` is reserved for future local font files, and
`fonts.css` currently provides typography utility classes rather than active
`@font-face` declarations.

GSAP and ScrollTrigger are registered once in `src/lib/gsap.ts`. The implemented
shared motion layer in `src/lib/animations.ts` handles reveals, parallax,
page transitions and exhibition sequences. Lenis is initialized by
`MainLayout.astro`. Both CSS and JavaScript motion preserve reduced-motion
behavior.

## Content and assets

Visible editorial content is primarily Spanish and includes French fashion
terms. Preserve accents, punctuation and established object names. Internal code,
identifiers and technical documentation use English.

When a Figma reference is available, it is the visual source for the surface in
scope. Existing routes remain useful implementation evidence for behavior,
implemented states and interactions that may not be visible in a single frame.

Most active media is served directly from `public/images/`. When replacing an
asset, preserve its public path or update every reference. The collection detail
routes are generated from `src/data/collection.ts`; adding or renaming a slug
changes its public URL.

## Validation

Before handing off a change:

```bash
npm run lint
npm run build
npx prettier --check <changed-files>
```

`npm run format:check` performs the same formatting check across the complete
repository and may also expose unrelated existing drift.

For visual changes, inspect every affected route at its intended viewport,
including navigation, image loading, internal links, keyboard focus and
`prefers-reduced-motion` behavior. There is currently no automated browser or
unit-test suite.

## Deployment

`npm run build` produces a static `dist/` directory suitable for Vercel or any
static host. The intended delivery is a publicly accessible prototype. Set
`PUBLIC_SITE_URL` to its final origin before the production build so canonical
metadata and the sitemap do not use the local fallback.

## Maintenance guidance

Repository-specific implementation invariants live in [AGENTS.md](AGENTS.md).
This README remains the human-facing source for setup, routes and project
orientation.

## License

Academic project - Diseño 3, Universidad de Buenos Aires. Not licensed for
redistribution.
