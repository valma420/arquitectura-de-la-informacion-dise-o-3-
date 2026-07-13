/** Shared GSAP motion for editorial entrances, parallax and page navigation. */
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from '@utils/dom';

const TRANSITION_STORAGE_KEY = 'galliera:page-transition';

let activeSiteMotionCleanup: (() => void) | null = null;

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
  /** ScrollTrigger start position when `scroll` is enabled. */
  start?: string;
  /** Delay between targets for a staggered reveal, in seconds. */
  stagger?: number;
}

/** Fade + rise an element (or elements) into view. */
export function reveal(target: gsap.TweenTarget, options: RevealOptions = {}): void {
  if (prefersReducedMotion()) return;

  const elements = gsap.utils.toArray<HTMLElement>(target);
  if (elements.length === 0) return;

  const { delay = 0, duration = 0.8, y = 32, scroll = false, start = 'top 88%' } = options;

  gsap.fromTo(
    elements,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      delay,
      duration,
      ease: 'power3.out',
      clearProps: 'opacity,visibility,transform',
      overwrite: 'auto',
      scrollTrigger: scroll
        ? {
            trigger: elements[0],
            start,
            once: true,
          }
        : undefined,
    }
  );
}

/** Stagger-reveal a group of children (e.g. a gallery grid). */
export function revealStagger(targets: gsap.TweenTarget, options: RevealOptions = {}): void {
  if (prefersReducedMotion()) return;

  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (elements.length === 0) return;

  const {
    delay = 0,
    duration = 0.75,
    y = 28,
    scroll = false,
    start = 'top 88%',
    stagger = 0.08,
  } = options;

  gsap.fromTo(
    elements,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      delay,
      duration,
      ease: 'power3.out',
      stagger,
      clearProps: 'opacity,visibility,transform',
      overwrite: 'auto',
      scrollTrigger: scroll
        ? {
            trigger: elements[0],
            start,
            once: true,
          }
        : undefined,
    }
  );
}

/**
 * Build a reusable GSAP timeline for orchestrated sequences.
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

/** Initialize the shared motion layer. Safe to call more than once. */
export function initSiteMotion(): () => void {
  if (typeof window === 'undefined') return () => undefined;

  activeSiteMotionCleanup?.();

  const overlay = document.querySelector<HTMLElement>('[data-component="page-transition"]');
  const arrivedThroughTransition = consumeTransitionFlag();

  if (prefersReducedMotion()) {
    resetTransitionOverlay(overlay);
    activeSiteMotionCleanup = () => undefined;
    return activeSiteMotionCleanup;
  }

  const context = gsap.context(() => {
    animateTransitionIn(overlay, arrivedThroughTransition);
    initEditorialEntrances(arrivedThroughTransition ? 0.2 : 0.05);
    initHomeParallax();
  });

  const removeNavigationTransitions = initNavigationTransitions(overlay);
  const refreshFrame = window.requestAnimationFrame(refreshScrollTriggers);

  void document.fonts?.ready.then(refreshScrollTriggers);

  const cleanup = () => {
    window.cancelAnimationFrame(refreshFrame);
    removeNavigationTransitions();
    context.revert();
    resetTransitionOverlay(overlay);

    if (activeSiteMotionCleanup === cleanup) activeSiteMotionCleanup = null;
  };

  activeSiteMotionCleanup = cleanup;
  return cleanup;
}

function initEditorialEntrances(delay: number): void {
  const intro = document.querySelector<HTMLElement>(
    'main > section:first-child, main > article:first-child'
  );

  if (intro) {
    const introTargets = Array.from(intro.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          !element.matches('script, style, section, [hidden]') &&
          element.getAttribute('aria-hidden') !== 'true'
      )
      .slice(0, 4);

    revealStagger(introTargets, {
      delay,
      duration: 0.95,
      y: 38,
      stagger: 0.11,
    });
  }

  const followupSections = new Set(
    document.querySelectorAll<HTMLElement>(
      'main > section:not(:first-child), main > article section'
    )
  );

  followupSections.forEach((section) => {
    const children = Array.from(section.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && !element.matches('script, style, [hidden]')
    );

    if (children.length === 0) return;

    // Keep large catalogue/calendar grids brisk instead of producing a long cascade.
    const stagger = Math.min(0.09, 0.8 / Math.max(1, children.length - 1));
    revealStagger(children, {
      duration: 0.8,
      y: children.length > 12 ? 22 : 34,
      scroll: true,
      stagger,
    });
  });
}

function initHomeParallax(): void {
  const galleryHero = document.querySelector<HTMLElement>('.home-hero');

  if (galleryHero) {
    const frames = galleryHero.querySelectorAll<HTMLElement>('.orbit__frame');
    const pattern = galleryHero.querySelector<HTMLElement>('.home-hero__pattern');
    const distance = window.innerWidth < 768 ? 5 : 10;
    const galleryTrigger = {
      trigger: galleryHero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
    } as const;

    if (frames.length > 0) {
      gsap.to(frames, {
        yPercent: (index) => (index % 2 === 0 ? -distance : distance * 0.7),
        rotate: (index) => (index - 2) * 1.4,
        ease: 'none',
        scrollTrigger: galleryTrigger,
      });
    }

    if (pattern) {
      gsap.to(pattern, {
        yPercent: -4,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: galleryTrigger,
      });
    }

    return;
  }

  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const vitrinas = hero.querySelectorAll<HTMLElement>('.hero__vitrina');
  const notes = hero.querySelectorAll<HTMLElement>('.hero__note');
  const wordmark = hero.querySelector<HTMLElement>('.hero__wordmark');
  const distance = window.innerWidth < 768 ? 4 : 8;
  const scrollTrigger = {
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    invalidateOnRefresh: true,
  } as const;

  if (vitrinas.length > 0) {
    gsap.to(vitrinas, {
      yPercent: (index) => (index % 2 === 0 ? -distance : distance),
      ease: 'none',
      scrollTrigger,
    });
  }

  if (notes.length > 0) {
    gsap.to(notes, {
      yPercent: -distance * 1.5,
      ease: 'none',
      scrollTrigger,
    });
  }

  if (wordmark) {
    gsap.to(wordmark, {
      yPercent: -distance,
      ease: 'none',
      scrollTrigger,
    });
  }
}

function animateTransitionIn(overlay: HTMLElement | null, arrivedThroughTransition: boolean): void {
  if (!overlay) return;

  gsap.killTweensOf(overlay);

  if (!arrivedThroughTransition) {
    resetTransitionOverlay(overlay);
    return;
  }

  gsap.set(overlay, {
    autoAlpha: 1,
    scaleY: 1,
    transformOrigin: 'top center',
    pointerEvents: 'all',
  });
  gsap.to(overlay, {
    scaleY: 0,
    duration: 0.75,
    ease: 'power4.inOut',
    pointerEvents: 'none',
    clearProps: 'visibility',
  });
}

function initNavigationTransitions(overlay: HTMLElement | null): () => void {
  if (!overlay) return () => undefined;

  let navigating = false;

  const handleClick = (event: MouseEvent) => {
    if (!isTransitionableClick(event)) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>('a[href]');
    if (!anchor || !isTransitionableAnchor(anchor)) return;

    if (navigating) {
      event.preventDefault();
      return;
    }

    const url = new URL(anchor.href, window.location.href);
    if (isSameDocumentHash(url) || url.href === window.location.href) return;

    event.preventDefault();
    navigating = true;
    storeTransitionFlag();

    gsap.killTweensOf(overlay);
    gsap.set(overlay, {
      autoAlpha: 1,
      scaleY: 0,
      transformOrigin: 'bottom center',
      pointerEvents: 'all',
    });
    gsap.to(overlay, {
      scaleY: 1,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => window.location.assign(url.href),
      onInterrupt: () => {
        navigating = false;
        clearTransitionFlag();
        resetTransitionOverlay(overlay);
      },
    });
  };

  const handlePageShow = (event: PageTransitionEvent) => {
    if (!event.persisted) return;
    navigating = false;
    resetTransitionOverlay(overlay);
  };

  document.addEventListener('click', handleClick);
  window.addEventListener('pageshow', handlePageShow);

  return () => {
    document.removeEventListener('click', handleClick);
    window.removeEventListener('pageshow', handlePageShow);
    gsap.killTweensOf(overlay);
  };
}

function isTransitionableClick(event: MouseEvent): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function isTransitionableAnchor(anchor: HTMLAnchorElement): boolean {
  if (
    anchor.hasAttribute('download') ||
    anchor.hasAttribute('data-no-transition') ||
    anchor.relList.contains('external') ||
    (anchor.target && anchor.target !== '_self')
  ) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);
  return (
    (url.protocol === 'http:' || url.protocol === 'https:') && url.origin === window.location.origin
  );
}

function isSameDocumentHash(url: URL): boolean {
  return (
    url.hash.length > 0 &&
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  );
}

function resetTransitionOverlay(overlay: HTMLElement | null): void {
  if (!overlay) return;
  gsap.killTweensOf(overlay);
  gsap.set(overlay, {
    autoAlpha: 1,
    scaleY: 0,
    transformOrigin: 'bottom center',
    pointerEvents: 'none',
  });
}

function storeTransitionFlag(): void {
  try {
    window.sessionStorage.setItem(TRANSITION_STORAGE_KEY, '1');
  } catch {
    // Storage may be unavailable in privacy modes; the exit transition still works.
  }
}

function clearTransitionFlag(): void {
  try {
    window.sessionStorage.removeItem(TRANSITION_STORAGE_KEY);
  } catch {
    // Storage may be unavailable in privacy modes.
  }
}

function consumeTransitionFlag(): boolean {
  try {
    const stored = window.sessionStorage.getItem(TRANSITION_STORAGE_KEY) === '1';
    window.sessionStorage.removeItem(TRANSITION_STORAGE_KEY);
    return stored;
  } catch {
    return false;
  }
}
