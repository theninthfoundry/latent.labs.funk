export const SITE = {
  name: 'Latent Labs',
  shortName: 'LATENT',
  line: 'We build inevitables.',
  description: 'Latent Labs builds distinctive campaigns and intelligent digital systems for brands ready to move beyond the expected.',
  locationLine: 'Independent creative + systems studio / Hyderabad ↔ everywhere',
  contactEmail: '', // Set a real studio inbox before launch. An empty value enables the copy-brief fallback.
  siteUrl: '', // Add the verified production domain before launch for canonical URLs and Open Graph metadata.
};

export const NAV = [
  { label: 'Field notes', href: '/work' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Approach', href: '/about' },
];

export const SERVICES = [
  {
    id: 'creative',
    number: '01',
    name: 'Latent Creative',
    short: 'Campaigns with a point of view.',
    description: 'Art-directed product films, short-form advertising and creative systems built to hold attention without losing the plot.',
    deliverables: ['Campaign concepts and visual direction', 'Short-form product films and social ads', 'Creative variations for structured testing', 'Production-ready assets and handover'],
    bestFor: 'Brands and agencies that need original campaign thinking and a dependable stream of polished creative.',
    href: '/services/creative',
    label: 'Creative production',
  },
  {
    id: 'convert',
    number: '02',
    name: 'Latent Convert',
    short: 'Good enquiries deserve a system.',
    description: 'Lead capture, routing, follow-up reminders and operational visibility that help teams respond with more consistency.',
    deliverables: ['Enquiry capture and data validation', 'Lead assignment and status tracking', 'Follow-up reminders and exception alerts', 'Operational reporting and documentation'],
    bestFor: 'Enquiry-driven teams where timely follow-up and a clear view of the pipeline matter.',
    href: '/services/convert',
    label: 'Lead systems',
  },
  {
    id: 'flow',
    number: '03',
    name: 'Latent Flow',
    short: 'Less busywork. More signal.',
    description: 'Document and back-office workflows that move information between tools, validate it, and make exceptions visible.',
    deliverables: ['Document and spreadsheet processing', 'Schema and business-rule validation', 'Human review for uncertain records', 'Failure handling, logs and handover'],
    bestFor: 'Teams repeating the same administrative work across documents, spreadsheets and business tools.',
    href: '/services/flow',
    label: 'Operational automation',
  },
];

export const PROJECT_STUDIES = [
  {
    id: 'city',
    number: 'F–01',
    title: 'A City, Reframed',
    type: 'Fashion film / visual narrative',
    status: 'Independent concept study',
    image: '/images/work/a-city-reframed.svg',
    alt: 'Graphic concept artwork combining a vermilion sun, architectural lines and an editorial fashion composition.',
    className: 'study--city',
    note: 'A moving portrait of a place, told through form, texture and pace.',
  },
  {
    id: 'machine',
    number: 'S–02',
    title: 'The Useful Machine',
    type: 'Lead system / interaction study',
    status: 'Independent concept study',
    image: '/images/work/the-useful-machine.svg',
    alt: 'Abstract routing diagram with chartreuse nodes and fine technical lines on a dark field.',
    className: 'study--machine',
    note: 'A messy stream of enquiries becomes a legible, accountable process.',
  },
  {
    id: 'objects',
    number: 'F–03',
    title: 'Objects With Gravity',
    type: 'Product film / art direction',
    status: 'Independent concept study',
    image: '/images/work/objects-with-gravity.svg',
    alt: 'Experimental product-art concept with sculptural shapes, paper texture and a vivid orange accent.',
    className: 'study--objects',
    note: 'An exercise in making the ordinary feel worth a second look.',
  },
];
