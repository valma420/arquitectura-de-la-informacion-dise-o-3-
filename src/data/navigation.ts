/**
 * Primary navigation model.
 * Single source of truth for the site's main menu — consumed by Navbar & Footer.
 */
import type { NavLink } from '@/types/index';

export const navigationLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Muestra', href: '/muestra' },
  { label: 'Colección', href: '/coleccion' },
  { label: 'Linea de tiempo', href: '/linea-de-tiempo' },
  { label: 'Historia', href: '/historia' },
  { label: 'Agenda', href: '/agenda' },
];
