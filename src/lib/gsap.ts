/**
 * Centralized GSAP instance & plugin registration.
 *
 * Import GSAP from here (never directly from 'gsap') so plugins are registered
 * exactly once and configuration stays consistent across the app.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins a single time. Add more here as they are introduced.
gsap.registerPlugin(ScrollTrigger);

// Sensible global defaults; individual tweens can override them.
gsap.defaults({
  ease: 'power3.out',
  duration: 0.7,
});

export { gsap, ScrollTrigger };
