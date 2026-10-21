/**
 * CURATED MEDIA MANIFEST
 * Replace the local provisional SVGs with image/video assets you own or have licensed.
 * Pinterest is useful for discovery and moodboarding, but a pin is not a usage licence.
 * Keep paths local under /public/images/ for predictable deployment and performance.
 */
export const MEDIA_SLOTS = [
  {
    id: 'work-city',
    path: '/images/work/a-city-reframed.svg',
    intendedAspectRatio: '4:5',
    suggestedSubject: 'Fashion editorial, city texture, human silhouette, concrete and warm flash photography.',
    alt: 'Replace with an accurate description of the curated fashion-film artwork.',
    placement: 'Selected Field Notes, large first artwork',
    recommendedExport: '1600 × 2000 WebP or AVIF; keep a high quality source file separately.',
  },
  {
    id: 'work-machine',
    path: '/images/work/the-useful-machine.svg',
    intendedAspectRatio: '5:4',
    suggestedSubject: 'Abstract system maps, interesting printed diagrams, human-scale workspaces, paper records, technical details.',
    alt: 'Replace with an accurate description of the curated operational-systems artwork.',
    placement: 'Selected Field Notes, wide second artwork',
    recommendedExport: '1800 × 1440 WebP or AVIF.',
  },
  {
    id: 'work-objects',
    path: '/images/work/objects-with-gravity.svg',
    intendedAspectRatio: '4:5',
    suggestedSubject: 'Sculptural product still life, unusual shadows, tactile materials, close-cropped objects.',
    alt: 'Replace with an accurate description of the curated product-creative artwork.',
    placement: 'Selected Field Notes, third artwork',
    recommendedExport: '1600 × 2000 WebP or AVIF.',
  },
  {
    id: 'hero-field',
    path: 'procedural canvas in src/app.js',
    intendedAspectRatio: '4:5 desktop; 1:1 mobile crop',
    suggestedSubject: 'No image required by default. The hero uses a custom procedural WebGL field so the brand has an original signature visual.',
    alt: 'Decorative procedural field artwork; adjacent copy carries the full brand message.',
    placement: 'Hero signature visual',
    recommendedExport: 'If replacing the live field later, use an original short loop/poster, provide a static fallback, and respect reduced motion.',
  },
];
