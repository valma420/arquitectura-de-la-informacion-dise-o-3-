# AGENTS.md

## Project

Palais Galliera is a production-oriented, semi-functional prototype for Diseno 3,
an advanced Graphic Design course. It translates evolving Figma work into a
static Astro exhibition inspired by the fashion museum. It is not the museum's
official site or a live source of program data.

- Preserve the static Astro output and the current no-UI-framework architecture.
- Within correctness and safety, prioritize front-end fidelity, motion,
  interaction, desktop 16:9 composition, and aesthetic polish.
- Static curated data is sufficient for this prototype. Do not introduce a
  database, CMS, or backend unless the academic scope explicitly requires it.
- Treat visible Spanish and French copy as product content, not internal code.
- The project is desktop-only in a 16:9 format. Responsive behavior and mobile
  layouts are out of scope; use the exact approved desktop Figma viewport when
  one is supplied.

## Source of truth

- `src/pages/` owns route composition and route-local editorial content.
- `src/data/collection.ts` owns collection records, periods, slugs, and generated
  object-detail routes.
- `src/data/navigation.ts` owns shared navigation links.
- `src/data/site.ts` owns site metadata and default SEO values.
- `src/pages/agenda.astro` currently owns the rendered agenda.
  `src/data/agenda.ts` is not imported by the application and is not an active
  source until it is wired deliberately.
- `public/images/` contains the active public media. `src/assets/` currently
  contains placeholders only.
- `src/styles/variables.css` owns shared semantic tokens; route and component CSS
  may retain composition-specific geometry.
- `package.json` and `package-lock.json` define the dependency and runtime state.
- When a current Figma reference is supplied for a surface, it is the visual
  source of truth for that scope. The repository remains authoritative for
  implemented behavior, routes, and integration details not represented in a
  static frame.

## Critical invariants

- Preserve the implemented routes and generated collection slugs unless a route
  or content migration is explicitly requested.
- Keep the build static. Do not add SSR, a database, backend, auth, CMS, or UI
  framework without explicit scope and production-dependency approval.
- Import GSAP and ScrollTrigger through `src/lib/gsap.ts`; do not register plugins
  independently in pages or components.
- Preserve Lenis/GSAP synchronization, transition cleanup, and
  `prefers-reduced-motion` behavior.
- Do not add breakpoints or mobile-specific UI unless the academic scope is
  explicitly expanded. Keep basic overflow safeguards and keyboard access.
- Use shared tokens for reusable semantic values. Do not force one-off layout
  measurements into the global token set merely to avoid a local CSS value.
- Preserve established Spanish/French UI copy, accents, punctuation, object
  names, public paths, and slugs. Use English/ASCII for new internal identifiers,
  filenames, comments, and technical documentation.
- The June 2026 agenda and museum content are static project content. Do not
  present them as live or invent current museum facts.

## Scope boundaries

- Do not treat installed-but-unused packages as implemented features. Swiper is
  currently unused by `src/`.
- Do not reorganize public asset paths, collection slugs, route structure, or the
  motion layer as incidental cleanup.
- Figma designs may evolve during delivery. Use the latest approved reference
  available for the affected surface, and do not infer exact visual intent from
  filenames or unrelated screens.
- Preserve unrelated visual and content work in the worktree.

## Project rules

- Follow the aliases in `tsconfig.json`; prefer them over deep relative imports
  when the surrounding code does so.
- Keep reusable components in the existing `common`, `layout`, and `navigation`
  groups. Add a new domain group only when multiple reusable components justify
  it.
- Current fonts are Bodoni Moda and Inter loaded by `BaseLayout.astro` from Google
  Fonts. `public/fonts/` is reserved and `fonts.css` does not currently declare
  active local font faces.
- Keep page metadata accurate through `MainLayout`/`BaseLayout` and
  `PUBLIC_SITE_URL`.
- Preserve semantic HTML, keyboard access, visible focus, image alternatives,
  and reduced-motion fallbacks.

## External systems

- `PUBLIC_SITE_URL` is public build configuration, not a secret.
- A production build must use the actual deployment origin rather than the
  `https://example.com` fallback.
- Deployment, changes to hosted environment variables, and writes to external
  Figma files require an explicit request.

## Validation

For source changes, run the applicable checks:

```sh
npm run lint
npm run build
```

- Check formatting on touched files with
  `npx prettier --check <changed-files>`. Use `npm run format:check` only when a
  repository-wide formatting audit is relevant; it may expose unrelated drift.
- Run focused checks first when only one area changed.
- For visual changes, inspect affected routes at the approved 16:9 desktop
  viewport. Mobile-width inspection is not required.
- Check navigation, assets, keyboard behavior, and reduced motion when relevant.
- There is no automated browser or unit-test suite; do not claim runtime or
  visual correctness from the build alone.
