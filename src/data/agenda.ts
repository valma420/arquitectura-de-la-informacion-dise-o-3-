/**
 * Agenda — Junio 2026. Hardcoded program of the exhibition.
 */
import type { AgendaEvent } from '@/types/index';

export const agendaMonth = 'Agenda Junio 2026';

/** June 2026: the 1st is a Monday — a clean 5-week grid (1–30). */
export const agendaEvents: AgendaEvent[] = [
  { day: 2, kind: 'Charla', title: 'El New Look', time: '16 h', image: '/images/muestra/m14.jpeg' },
  { day: 4, kind: 'Visita temática', title: 'Recorrido por el eje La silueta', time: '18 h' },
  { day: 6, kind: 'Charla', title: 'La construcción de la silueta', time: '13 h · Entrada libre' },
  { day: 9, kind: 'Conferencia', title: 'El atelier Dior', time: '17 h · Entrada libre' },
  { day: 11, kind: 'Taller', title: 'Introducción al figurín de moda', time: '17 h · Cupos limitados' },
  { day: 12, kind: 'Muestra abierta', title: '', span: 3, image: '/images/site/vogue-expo.jpg' },
  {
    day: 16,
    kind: 'Reserva previa',
    title: 'Encuentro con conservadores',
    span: 2,
    image: '/images/site/musee.png',
  },
  { day: 19, kind: 'Proyección', title: 'Vogue y la posguerra' },
  { day: 23, kind: 'Visita temática', title: 'Salas del jardín bajo', time: '16 h' },
  { day: 25, kind: 'Taller', title: 'Patrones históricos', time: '17 h · Cupos limitados' },
  { day: 27, kind: 'Charla', title: 'Moda y fotografía editorial', time: '13 h · Entrada libre' },
  { day: 30, kind: 'Cierre de mes', title: 'Visita nocturna', time: '20 h · Reserva previa' },
];

export const agendaInfo = {
  hours: 'mar–dom, 10–18 h.',
  note: 'Visita guiada general todos los sábados 16 h.',
};
