/**
 * Small, dependency-free DOM helpers shared across client scripts.
 */

/** True when the user has requested reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Typed `querySelector` scoped to an optional root. */
export function qs<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T | null {
  return root.querySelector<T>(selector);
}

/** Typed `querySelectorAll` returned as a real array. */
export function qsa<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
