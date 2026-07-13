/**
 * Shared domain types for the exhibition.
 */

/** A period of the collection, rendered on the timeline & explorer. */
export interface Period {
  id: string;
  /** Anchor year shown on the timeline scrubber (e.g. 1947). */
  year: number;
  /** Display name (e.g. "El New Look"). */
  name: string;
  /** Short editorial intro shown on the timeline page. */
  description: string;
  /** Representative image for the timeline thumbnails. */
  image: string;
}

/** Curatorial theme used to group pieces transversally. */
export interface Theme {
  id: string;
  name: string;
}

/** Document typology (pieza, figurín, prensa…). */
export interface DocType {
  id: string;
  name: string;
}

/** A single object/piece of the collection. */
export interface Piece {
  slug: string;
  title: string;
  designer?: string;
  house?: string;
  /** Sort year. */
  year: number;
  /** Display date (e.g. "entre 1790 y 1795"). */
  yearLabel: string;
  periodId: string;
  themeIds: string[];
  docTypeId: string;
  /** Path to the image under /public. */
  image: string;
  /** 'cutout' = transparent PNG, 'photo' = museum photo with background. */
  imageKind: 'cutout' | 'photo';
  description?: string;
  technique?: string;
  material?: string;
  origin?: string;
  inv?: string;
  line?: string;
  acquisition?: string;
  state?: string;
  section?: string;
  dimensions?: string;
  /** Featured pieces get highlighted in home/muestra. */
  featured?: boolean;
}

/** An entry in the agenda calendar (June 2026). */
export interface AgendaEvent {
  /** Day of month (June 2026). */
  day: number;
  kind: string;
  title: string;
  time?: string;
  note?: string;
  image?: string;
  /** Cell spans (for the "muestra abierta" photo strips). */
  span?: number;
}

/** A single link in the primary navigation. */
export interface NavLink {
  label: string;
  href: string;
}

/** Per-page SEO / metadata surface consumed by the base layout. */
export interface SeoMeta {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}
