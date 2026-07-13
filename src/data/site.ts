/**
 * Global site configuration & default SEO metadata.
 * Update these values with the final copy before launch.
 */
export const siteConfig = {
  name: 'Digital Exhibition',
  shortName: 'Exhibition',
  description:
    'An interactive digital exhibition exploring graphic design — a project for Universidad de Buenos Aires.',
  /** Default OpenGraph image (place the real asset in `public/images`). */
  ogImage: '/images/og-default.jpg',
  locale: 'en',
  themeColor: '#0e0e0e',
} as const;
