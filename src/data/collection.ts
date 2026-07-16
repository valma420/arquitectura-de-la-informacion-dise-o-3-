/**
 * Collection content model — hardcoded data for the TP.
 * Periods, themes, document types and pieces of the Galliera acervo.
 */
import type { DocType, Period, Piece, Theme } from '@/types/index';

/* ------------------------------------------------------------------ */
/* Periods                                                             */
/* ------------------------------------------------------------------ */
export const periods: Period[] = [
  {
    id: 'siglo-xviii',
    year: 1730,
    name: 'Siglo XVIII',
    description:
      'Sedas de Lyon, brocados y la corte como escenario. Las piezas más antiguas del acervo: robes à la française, chalecos bordados y la moda del Antiguo Régimen.',
    image: '/images/prendas/1760.png',
  },
  {
    id: 'siglo-xix',
    year: 1815,
    name: 'Siglo XIX',
    description:
      'Del talle imperio a la crinolina y el polisón. Un siglo en que la silueta femenina se transformó década a década, entre el romanticismo y la era industrial.',
    image: '/images/prendas/1850.png',
  },
  {
    id: 'belle-epoque',
    year: 1900,
    name: 'Belle Époque',
    description:
      'París capital de la moda. La silueta en S, los grandes salones y el nacimiento de la alta costura moderna en vísperas de la Gran Guerra.',
    image: '/images/prendas/1900.png',
  },
  {
    id: 'annees-folles',
    year: 1925,
    name: 'Années Folles',
    description:
      'La liberación del cuerpo: talles bajos, flecos y charleston. La moda de los años locos abandona el corsé y acorta las faldas.',
    image: '/images/prendas/1925.png',
  },
  {
    id: 'new-look',
    year: 1947,
    name: 'El New Look',
    description:
      'La década en que la silueta femenina se reinventó. Recorré las piezas del acervo que documentan el New Look y su difusión.',
    image: '/images/catalogo/c01.png',
  },
  {
    id: 'fin-era-dior',
    year: 1957,
    name: 'Fin era Dior',
    description:
      'La muerte de Dior y la llegada de Yves Saint Laurent. La línea trapecio anuncia el fin de una era y el comienzo de otra.',
    image: '/images/prendas/1959.png',
  },
  {
    id: 'pret-a-porter',
    year: 1968,
    name: 'Prêt-à-porter',
    description:
      'La calle entra a la moda. El prêt-à-porter democratiza el diseño y la alta costura pierde su monopolio sobre la silueta.',
    image: '/images/prendas/1968.png',
  },
  {
    id: 'posmoderno',
    year: 1985,
    name: 'Posmoderno',
    description:
      'Alaïa, el cuerpo como estructura y la moda como espectáculo global. Las últimas décadas del siglo XX en el acervo Galliera.',
    image: '/images/prendas/alaia.png',
  },
];

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */
export const themes: Theme[] = [
  { id: 'la-silueta', name: 'La silueta' },
  { id: 'el-atelier', name: 'El atelier' },
  { id: 'la-imagen', name: 'La imagen' },
  { id: 'los-disenadores', name: 'Los diseñadores' },
  { id: 'el-cuerpo-vestido', name: 'El cuerpo vestido' },
  { id: 'el-color', name: 'El color' },
];

/* ------------------------------------------------------------------ */
/* Document types                                                      */
/* ------------------------------------------------------------------ */
export const docTypes: DocType[] = [
  { id: 'pieza', name: 'Piezas' },
  { id: 'figurin', name: 'Figurines' },
  { id: 'prensa', name: 'Prensa' },
  { id: 'fotografia', name: 'Fotografía' },
  { id: 'correspondencia', name: 'Correspondencia' },
  { id: 'patron', name: 'Patrones' },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */
const d = (
  slug: string,
  title: string,
  year: number,
  yearLabel: string,
  periodId: string,
  image: string,
  imageKind: 'cutout' | 'photo',
  extra: Partial<Piece> = {}
): Piece => ({
  slug,
  title,
  year,
  yearLabel,
  periodId,
  themeIds: extra.themeIds ?? ['la-silueta'],
  docTypeId: extra.docTypeId ?? 'pieza',
  image,
  imageKind,
  designer: extra.designer,
  house: extra.house,
  description:
    extra.description ??
    'Pieza del acervo del Palais Galliera. Documentación en proceso de catalogación.',
  technique: extra.technique ?? 'Confección a mano',
  material: extra.material ?? 'Seda',
  origin: extra.origin ?? 'París, Francia',
  inv: extra.inv ?? `GAL.${year}.${((slug.length * 7) % 90) + 10}`,
  line: extra.line,
  acquisition: extra.acquisition ?? 'Donación',
  state: extra.state ?? 'En reserva',
  section: extra.section ?? 'Indumentaria',
  dimensions: extra.dimensions ?? '—',
  featured: extra.featured,
});

export const pieces: Piece[] = [
  /* -------------------------------- Siglo XVIII ------------------- */
  d(
    'casaca-bordada',
    'Casaca bordada',
    1740,
    'c. 1700–1750',
    'siglo-xviii',
    '/images/prendas/1700s.png',
    'cutout',
    {
      themeIds: ['el-cuerpo-vestido', 'el-color'],
      material: 'Seda · hilo metálico',
      technique: 'Bordado a mano',
      inv: 'GAL.1920.551',
    }
  ),
  d(
    'robe-francaise-1730',
    'Robe à la française',
    1730,
    'c. 1730',
    'siglo-xviii',
    '/images/prendas/1730.png',
    'cutout',
    {
      material: 'Brocado de seda',
      inv: 'GAL.1965.17',
    }
  ),
  d(
    'robe-francaise-1760',
    'Robe à la française',
    1760,
    'c. 1760',
    'siglo-xviii',
    '/images/prendas/1760.png',
    'cutout',
    {
      themeIds: ['la-silueta', 'el-color'],
      material: 'Seda de Lyon',
      inv: 'GAL.1959.7',
    }
  ),
  d(
    'robe-polonaise',
    'Robe à la polonaise',
    1775,
    'c. 1775',
    'siglo-xviii',
    '/images/prendas/1775.png',
    'cutout',
    {
      inv: 'GAL.1960.24',
    }
  ),
  d(
    'vestido-corte',
    'Vestido de corte',
    1775,
    'c. 1775',
    'siglo-xviii',
    '/images/prendas/1775-b.png',
    'cutout',
    {
      material: 'Seda brochada · encaje',
      inv: 'GAL.1978.78',
    }
  ),
  d(
    'caraco-falda',
    'Caraco y falda',
    1785,
    'c. 1775–1790',
    'siglo-xviii',
    '/images/prendas/1775-90.png',
    'cutout',
    {
      inv: 'GAL.1980.179',
    }
  ),
  d(
    'robe-anglaise',
    "Robe à l'anglaise",
    1780,
    'c. 1780',
    'siglo-xviii',
    '/images/prendas/1780.png',
    'cutout',
    {
      inv: 'GAL.1980.185',
    }
  ),
  d(
    'redingote',
    'Redingote',
    1785,
    'c. 1785',
    'siglo-xviii',
    '/images/prendas/1785.png',
    'cutout',
    {
      themeIds: ['el-cuerpo-vestido'],
      inv: 'GAL.1982.91',
    }
  ),
  d(
    'chaleco-courtois',
    'Chaleco',
    1790,
    'entre 1790 y 1795',
    'siglo-xviii',
    '/images/prendas/1790.png',
    'cutout',
    {
      designer: 'Courtois, Gaston',
      themeIds: ['el-atelier', 'el-color'],
      material: 'Seda bordada',
      technique: 'Bordado a mano',
      inv: 'GAL.1987.91',
      description:
        'Chaleco masculino de seda bordada, atribuido al taller de Gaston Courtois. El gilet fue la pieza de exhibición del vestuario masculino del siglo XVIII.',
    }
  ),
  d(
    'vestido-gasa-1790',
    'Vestido de gasa',
    1790,
    'c. 1790',
    'siglo-xviii',
    '/images/prendas/1790-b.png',
    'cutout',
    {
      material: 'Gasa de algodón',
      inv: 'GAL.1994.234',
    }
  ),

  /* -------------------------------- Siglo XIX --------------------- */
  d(
    'vestido-imperio',
    'Vestido Imperio',
    1815,
    'c. 1815',
    'siglo-xix',
    '/images/prendas/1815.png',
    'cutout',
    {
      inv: 'GAL.1969.33',
    }
  ),
  d(
    'vestido-romantico',
    'Vestido de día',
    1830,
    'c. 1830',
    'siglo-xix',
    '/images/prendas/1830.png',
    'cutout',
    {
      themeIds: ['la-silueta', 'el-color'],
      inv: 'GAL.1985.63',
    }
  ),
  d(
    'vestido-crinolina',
    'Vestido de crinolina',
    1850,
    'c. 1850',
    'siglo-xix',
    '/images/prendas/1850.png',
    'cutout',
    {
      description:
        'La crinolina llevó la amplitud de la falda a su máximo histórico: una estructura de aros que sostenía metros de tela.',
      inv: 'GAL.1985.322',
    }
  ),
  d(
    'vestido-polison',
    'Vestido de polisón',
    1870,
    'c. 1870',
    'siglo-xix',
    '/images/prendas/1870.png',
    'cutout',
    {
      inv: 'GAL.2000.81',
    }
  ),

  /* -------------------------------- Belle Époque ------------------ */
  d(
    'vestido-recepcion',
    'Vestido de recepción',
    1900,
    'c. 1900',
    'belle-epoque',
    '/images/prendas/1900.png',
    'cutout',
    {
      description:
        'La silueta en S de la Belle Époque: pecho proyectado, talle mínimo y cola. París era la capital indiscutida de la moda.',
      inv: 'GAL.1978.47',
    }
  ),
  d(
    'conjunto-paseo',
    'Conjunto de paseo',
    1905,
    'c. 1905',
    'belle-epoque',
    '/images/prendas/photo-05.jpg',
    'photo',
    {
      docTypeId: 'fotografia',
      themeIds: ['la-imagen'],
      inv: 'GAL.2013.38',
    }
  ),

  /* -------------------------------- Années Folles ----------------- */
  d(
    'vestido-charleston',
    'Vestido Charleston',
    1925,
    'c. 1925',
    'annees-folles',
    '/images/prendas/1925.png',
    'cutout',
    {
      themeIds: ['el-cuerpo-vestido', 'la-silueta'],
      material: 'Seda · flecos',
      description:
        'El talle bajo y el movimiento: la moda de los años locos abandona el corsé, sube el ruedo y libera el gesto.',
      inv: 'GAL.1980.55',
    }
  ),
  d(
    'vestido-noche-1930',
    'Vestido de noche',
    1930,
    'c. 1930',
    'annees-folles',
    '/images/prendas/1930.png',
    'cutout',
    {
      material: 'Satén al bies',
      inv: 'GAL.1959.44',
    }
  ),

  /* -------------------------------- El New Look ------------------- */
  d('traje-bar', 'Traje «Bar»', 1947, '1947', 'new-look', '/images/muestra/m14.jpeg', 'photo', {
    designer: 'Christian Dior',
    house: 'Maison Dior',
    line: 'Corolle',
    themeIds: ['la-silueta', 'los-disenadores'],
    technique: 'Alta costura',
    material: 'Shantung de seda · lana',
    section: 'Alta costura',
    inv: 'GAL.1983.40',
    featured: true,
    description:
      'Una sola pieza definió el día: el tailleur «Bar». Chaqueta de shantung ceñida en la cintura, pollera de lana negra plisada hasta media pantorrilla. La modelo entró y la sala se quedó en silencio.',
  }),
  d('firmament', 'Firmament', 1947, '1947', 'new-look', '/images/muestra/m02.jpg', 'photo', {
    designer: 'Christian Dior',
    house: 'Maison Dior',
    line: 'Corolle',
    themeIds: ['la-silueta', 'el-atelier'],
    technique: 'Bordado a mano',
    material: 'Seda · tul',
    section: 'Alta costura',
    inv: 'GAL.1983.45',
    featured: true,
    description:
      'Vestido de gala de la primera época de la maison Dior. Seda y tul bordado con motivos de estrellas —el «firmamento» que da nombre a la pieza—. Silueta New Look: hombros suaves, cintura ceñida y falda amplia sostenida por enaguas de tul.',
  }),
  d(
    'vestido-bonbon',
    'Vestido «Bonbon»',
    1947,
    '1947',
    'new-look',
    '/images/muestra/m07.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      line: 'Corolle',
      themeIds: ['la-silueta', 'el-color'],
      section: 'Alta costura',
      inv: 'GAL.1983.47',
      description: 'Vestido de día, silueta New Look. Falda amplia, cinturón.',
    }
  ),
  d('corolle', 'Vestido «Corolle»', 1947, '1947', 'new-look', '/images/muestra/m09.jpg', 'photo', {
    designer: 'Christian Dior',
    house: 'Maison Dior',
    line: 'Corolle',
    section: 'Alta costura',
    inv: 'GAL.1983.49',
    description:
      'Corola, como el cáliz de una flor: la falda amplia dada vuelta que dio nombre a la primera colección de la maison.',
  }),
  d(
    'tailleur-dia',
    'Tailleur de día',
    1948,
    '1948',
    'new-look',
    '/images/muestra/m12.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.52',
    }
  ),
  d(
    'vestido-gala-1949',
    'Vestido de gala',
    1949,
    '1949',
    'new-look',
    '/images/muestra/m13.jpeg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.55',
    }
  ),
  d(
    'chaqueta-lapa',
    'Chaqueta y vestido «Lapa»',
    1950,
    '1950–51',
    'new-look',
    '/images/muestra/m15.webp',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      themeIds: ['la-silueta', 'el-atelier'],
      section: 'Alta costura',
      inv: 'GAL.1983.58',
      description: 'Chaqueta peplum + falda lápiz. Evolución de la silueta.',
    }
  ),
  d(
    'vestido-dior-1951',
    'Vestido de cóctel',
    1951,
    '1951',
    'new-look',
    '/images/muestra/m08.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.61',
    }
  ),
  d(
    'vestido-tarde-1952',
    'Vestido de tarde',
    1952,
    '1952',
    'new-look',
    '/images/muestra/m11.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.63',
    }
  ),
  d(
    'clavel-negro',
    'Vestido «Clavel Negro»',
    1953,
    '1953–54',
    'new-look',
    '/images/muestra/m03.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      themeIds: ['la-imagen', 'el-color'],
      section: 'Alta costura',
      inv: 'GAL.1983.66',
      description: 'Vestido de noche, estampado floral blanco y negro.',
    }
  ),
  d('maillot', 'Maillot', 1954, '1954', 'new-look', '/images/muestra/m01.jpg', 'photo', {
    designer: 'Christian Dior',
    house: 'Maison Dior',
    section: 'Alta costura',
    inv: 'GAL.1983.68',
  }),
  d(
    'abrigo-1955',
    'Abrigo de noche',
    1955,
    '1955',
    'new-look',
    '/images/muestra/m06.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.71',
    }
  ),
  d(
    'traje-sastre-1956',
    'Traje sastre',
    1956,
    '1956',
    'new-look',
    '/images/muestra/m04.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.74',
    }
  ),
  d('gasa-rosa', 'Gasa rosa', 1957, '1957', 'new-look', '/images/muestra/m05.jpg', 'photo', {
    designer: 'Christian Dior',
    house: 'Maison Dior',
    themeIds: ['el-color', 'la-silueta'],
    material: 'Gasa de seda',
    section: 'Alta costura',
    inv: 'GAL.1983.77',
  }),
  d(
    'capa-noche-1957',
    'Capa de noche',
    1957,
    '1957',
    'new-look',
    '/images/muestra/m10.jpg',
    'photo',
    {
      designer: 'Christian Dior',
      house: 'Maison Dior',
      section: 'Alta costura',
      inv: 'GAL.1983.79',
    }
  ),

  /* -------------------------------- Fin era Dior ------------------ */
  d(
    'vestido-trapecio',
    'Vestido trapecio',
    1959,
    '1959',
    'fin-era-dior',
    '/images/prendas/1959.png',
    'cutout',
    {
      designer: 'Yves Saint Laurent',
      house: 'Maison Dior',
      themeIds: ['los-disenadores', 'la-silueta'],
      description:
        'La sucesión cayó en un asistente de 21 años: Yves Saint Laurent. La línea trapecio liberó la cintura y anunció los sesenta.',
      inv: 'GAL.1988.12',
    }
  ),

  /* -------------------------------- Prêt-à-porter ----------------- */
  d(
    'conjunto-1968',
    'Conjunto prêt-à-porter',
    1968,
    '1968',
    'pret-a-porter',
    '/images/prendas/1968.png',
    'cutout',
    {
      themeIds: ['el-cuerpo-vestido'],
      section: 'Prêt-à-porter',
      inv: 'GAL.1990.31',
    }
  ),

  /* -------------------------------- Posmoderno -------------------- */
  d(
    'vestido-alaia-1983',
    'Vestido de punto',
    1983,
    '1983',
    'posmoderno',
    '/images/prendas/1983.png',
    'cutout',
    {
      designer: 'Azzedine Alaïa',
      themeIds: ['el-cuerpo-vestido', 'los-disenadores'],
      material: 'Punto elástico',
      section: 'Prêt-à-porter',
      inv: 'GAL.1998.44',
    }
  ),
  d(
    'vestido-alaia-escultura',
    'Vestido escultura',
    1986,
    'c. 1986',
    'posmoderno',
    '/images/prendas/alaia.png',
    'cutout',
    {
      designer: 'Azzedine Alaïa',
      themeIds: ['el-cuerpo-vestido', 'los-disenadores'],
      description:
        'El cuerpo como estructura: Alaïa construye la prenda directamente sobre la anatomía, sin dibujo previo.',
      section: 'Prêt-à-porter',
      inv: 'GAL.1998.51',
    }
  ),
  d('conjunto-1992', 'Conjunto', 1992, '1992', 'posmoderno', '/images/prendas/1992.png', 'cutout', {
    section: 'Prêt-à-porter',
    inv: 'GAL.2002.17',
  }),
  d(
    'vestido-gala-1995',
    'Vestido de gala',
    1995,
    '1995',
    'posmoderno',
    '/images/prendas/1995.png',
    'cutout',
    {
      section: 'Alta costura',
      inv: 'GAL.2004.23',
    }
  ),
  d(
    'vestido-2011',
    'Vestido contemporáneo',
    2011,
    '2011',
    'posmoderno',
    '/images/prendas/2011.png',
    'cutout',
    {
      section: 'Contemporáneo',
      inv: 'GAL.2011.8',
    }
  ),
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const getPiece = (slug: string): Piece | undefined => pieces.find((p) => p.slug === slug);

export const piecesByPeriod = (periodId: string): Piece[] =>
  pieces.filter((p) => p.periodId === periodId).sort((a, b) => a.year - b.year);

export const getPeriod = (id: string): Period | undefined => periods.find((p) => p.id === id);

/** Neighbours of a piece inside its period (for the object viewer). */
export const pieceNeighbours = (slug: string) => {
  const piece = getPiece(slug);
  if (!piece) return { prev: [], next: [] };
  const group = piecesByPeriod(piece.periodId);
  const i = group.findIndex((p) => p.slug === slug);
  return {
    group,
    index: i,
    prev: group.slice(Math.max(0, i - 2), i),
    next: group.slice(i + 1, i + 3),
  };
};
