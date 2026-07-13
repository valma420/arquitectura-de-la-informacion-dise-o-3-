/**
 * Shared domain types for the exhibition.
 *
 * These describe the core content model. They are intentionally minimal and
 * will grow as real data and views are implemented.
 */

/** A single object/piece on display in the collection. */
export interface ExhibitionObject {
  id: string;
  slug: string;
  title: string;
  author?: string;
  /** Creation year, or ISO date if the exact date is known. */
  year?: number;
  description?: string;
  /** Path or URL to the primary image. */
  image?: string;
  /** Free-form tags used by the collection filters. */
  tags?: string[];
  category?: string;
}

/** A grouping used to organize or filter the collection. */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** A single milestone rendered on the timeline. */
export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description?: string;
  relatedObjectIds?: string[];
}

/** An entry in the exhibition agenda / program. */
export interface AgendaEntry {
  id: string;
  title: string;
  /** ISO date-time string. */
  date: string;
  location?: string;
  description?: string;
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
  /** Absolute or site-relative path to the OpenGraph image. */
  ogImage?: string;
  /** Canonical path for the current page. */
  canonical?: string;
}
