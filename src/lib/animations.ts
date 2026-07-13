/**
 * Reusable animation helpers.
 *
 * This module is the home for shared, GSAP-powered motion used across the site
 * (entrance reveals, scroll-driven sequences, page transitions, etc.).
 *
 * SCAFFOLDING ONLY — the functions below define the intended API surface but do
 * not implement animations yet. Fill them in as the UI is built.
 */
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from '@utils/dom';

/** Options accepted by most reveal helpers. */
export interface RevealOptions {
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Animation duration, in seconds. */
  duration?: number;
  /** Distance to travel on the Y axis, in pixels. */
  y?: number;
  /** Whether the animation should be tied to a ScrollTrigger. */
  scroll?: boolean;
}

/**
 * Fade + rise an element (or elements) into view.
 * TODO: implement with gsap.from / ScrollTrigger.
 */
export function reveal(_target: gsap.TweenTarget, _options: RevealOptions = {}): void {
  if (prefersReducedMotion()) return;
  // TODO: implement reveal animation.
}

/**
 * Stagger-reveal a group of children (e.g. a gallery grid).
 * TODO: implement staggered entrance.
 */
export function revealStagger(_targets: gsap.TweenTarget, _options: RevealOptions = {}): void {
  if (prefersReducedMotion()) return;
  // TODO: implement staggered reveal.
}

/**
 * Build a reusable GSAP timeline for orchestrated sequences.
 * TODO: return a configured timeline once sequences are defined.
 */
export function createTimeline(_config?: gsap.TimelineVars): gsap.core.Timeline {
  return gsap.timeline(_config);
}

/**
 * Refresh ScrollTrigger measurements — call after layout changes
 * (route transitions, dynamic content, font load).
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}

/** Kill all active ScrollTriggers — useful on teardown / page transitions. */
export function clearScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
