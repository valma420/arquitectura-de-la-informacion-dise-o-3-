/**
 * Smooth-scroll setup (Lenis).
 *
 * Provides a single, app-wide Lenis instance and wires its RAF loop into GSAP's
 * ticker so scroll-driven animations stay perfectly in sync with ScrollTrigger.
 *
 * Usage (client-side only):
 *   import { initSmoothScroll } from '@lib/lenis';
 *   initSmoothScroll();
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from '@utils/dom';

let lenis: Lenis | null = null;

/** Returns the active Lenis instance, if smooth scroll has been initialized. */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Initialize smooth scrolling. Safe to call once on page load.
 * Skips entirely when the user prefers reduced motion.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (prefersReducedMotion()) return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    // Duration and easing mirror the scroll tokens in variables.css.
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Keep ScrollTrigger in sync with Lenis.
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker (single RAF source of truth).
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** Tear down the Lenis instance (e.g. before a full page transition). */
export function destroySmoothScroll(): void {
  lenis?.destroy();
  lenis = null;
}
