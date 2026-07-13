/**
 * Primary navigation model.
 * Single source of truth for the site's main menu — consumed by Navbar & Footer.
 */
import type { NavLink } from '@/types/index';

export const navigationLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Exhibition', href: '/exhibition' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About', href: '/about' },
];
