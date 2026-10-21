# Latent Labs / Field Studio

A bespoke, editorial website for Latent Labs, a creative and AI systems studio. The design combines tactile print-inspired art direction, a custom procedural WebGL “Latent Field”, restrained motion, and clear service storytelling. It is built as a dependency-free static site generator so the source is portable and the production output is ordinary HTML, CSS, JavaScript and SVG.

## Design idea

**The Latent Field** is a visual metaphor for the studio: a surface where creative intent, engineering and repeated process intersect. The visual system uses mineral paper, deep ink, vermilion and restrained chartreuse, with an editorial grid, local provisional artwork, a nine-cell aperture mark, and purposeful motion. It is an original direction, not a reproduction of any reference website.

## What is included

- Home page with one-time loader, interactive WebGL contour field, editorial statement, concept-study gallery, three service offerings, interactive workflow diagram, method, studio note and project brief.
- Service detail routes for Latent Creative, Latent Convert and Latent Flow.
- Field Notes / work archive, About, Privacy, Terms and a custom 404 page.
- Custom cursor for fine pointers only, reduced-motion support, keyboard-accessible mobile navigation, focus styles, form validation and honest project-brief fallback.
- Local SVG concept artwork, custom favicon, web manifest, Open Graph artwork, metadata, and static route output.
- Vercel and Netlify configuration plus a zero-dependency Node build and preview server.

## Run locally

Requires Node.js 20 or later. No package installation is needed because the build uses Node's standard library only.

```bash
npm run dev
```

Open `http://localhost:4173`.

To build the production output:

```bash
npm run build
```

The site is generated into `dist/`. To preview the generated output separately:

```bash
npm run preview
```

## Deploy

### Vercel

Import the repository in Vercel. The included `vercel.json` uses `npm run build` and the `dist` directory as the output. Static route folders are generated for service pages, work, about, privacy and terms.

### Netlify

Import the repository in Netlify. The included `netlify.toml` uses `npm run build` and publishes `dist/`.

## Content and image curation

All initial visuals in `public/images/work/` are locally authored SVG concept treatments, not stock photos and not client claims. The homepage and `/work` label them **Independent concept study** to avoid presenting speculative work as commissioned client projects.

The authoritative media map is `src/data/media.mjs`. For each slot it documents:

- current path
- intended aspect ratio
- visual subject suggestion
- alt-text replacement reminder
- intended placement and recommended export size

### Replace a provisional artwork

1. Choose an image or video still that you own or have explicit permission to use.
2. Export a web-optimized file (WebP or AVIF is preferred for photographs; SVG is suitable for vector artwork).
3. Put it under `public/images/work/`, for example `public/images/work/city-campaign.webp`.
4. Update the matching `image` entry in `src/data/site.mjs` and `path` entry in `src/data/media.mjs`.
5. Update alt text to describe the real image, not the placeholder.
6. Run `npm run build`, check desktop and mobile crops, and inspect the page with images disabled.

Pinterest should be treated as a discovery and moodboarding source, not as a licence. Do not hotlink Pinterest assets or publish images found there unless the rights holder has granted permission. Keep a small internal reference board separate from production assets. Confirm that client-supplied logos, products, music, people and marks can be used in the intended media and channels.

The hero uses a custom procedural shader instead of a remote video or stock image. `src/app.js` contains the shader, a low-power renderer, pointer and scroll response, a static fallback, and the reduced-motion handling. The page remains understandable if WebGL is unavailable.

## Fonts

The page requests Switzer and Boska from Fontshare's stylesheet service and includes local system fallbacks. The font files are not bundled into this repository. Confirm the current applicable licence and delivery terms before production; self-host licensed font files if you need tighter performance or privacy control. If the external stylesheet cannot load, the page falls back to system sans and serif fonts.

## Contact routing: REQUIRED BEFORE PUBLIC LAUNCH

Open `src/data/site.mjs` and set:

```js
contactEmail: 'your-real-studio-inbox@example.com',
siteUrl: 'https://your-verified-production-domain.example',
```

Use a real inbox and domain that the studio controls. Do not publish with the example values above. When `contactEmail` is empty, the project form validates input and offers to copy a formatted brief locally. It does **not** silently transmit data or pretend a CRM is connected. When a valid address is configured, the form opens a prefilled email draft for the visitor to review and send manually. This is intentionally not a backend form submission.

For a stronger production setup, replace the mailto path with a verified form endpoint or CRM integration and add appropriate spam protection, validation, privacy disclosure and delivery monitoring. Never put provider secrets in client-side JavaScript.

## Owner launch checklist

- [ ] Replace the provisional concept images with curated, properly licensed assets.
- [ ] If any study remains speculative, keep the “Independent concept study” disclosure. Replace it only when you have permission to share actual commissioned work.
- [ ] Set the verified contact email and production domain in `src/data/site.mjs`.
- [ ] Review the service descriptions, pricing strategy and delivery commitments against actual studio capacity.
- [ ] Replace the starter Privacy and Terms content with documents reviewed for the business's actual jurisdiction and data practices. The included pages are not legal advice and do not guarantee compliance.
- [ ] Verify font licensing and any third-party media licensing.
- [ ] Test the enquiry workflow on desktop and mobile. Check that mailto opens the correct draft or that the configured form endpoint receives a test enquiry.
- [ ] Test keyboard-only navigation, 200% zoom, reduced motion, high contrast, the mobile menu and a browser with WebGL disabled.
- [ ] Run `npm run build` and inspect all routes, asset paths and browser console output.
- [ ] Configure the production domain, canonical URL, sitemap and social preview before submitting to search engines.
- [ ] Configure custom email delivery and a monitored inbox; do not rely on a mailto draft as a lead-management system if leads are business-critical.
- [ ] Add analytics only if genuinely needed, and update the privacy notice before enabling tracking.

## Technical notes

- No runtime framework or UI library is required. The source generator uses native ES modules and Node's built-in APIs.
- No database, analytics, tracking pixels or API keys are present by default.
- The workflow diagram describes how the studio works; it is not connected to a live client system.
- `src/app.js` is progressively enhanced. Reveal classes are only hidden after JavaScript starts, and reduced-motion users see static content.
- The service pages and all legal routes are pre-rendered as separate HTML files by `scripts/build.mjs`.
- `scripts/serve.mjs` is a lightweight preview server for local checking. Use a proper static host for production.

## Project structure

```text
latent-labs-studio/
├── public/
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── images/
│       ├── og-latent.svg
│       └── work/                 # Replaceable local concept artwork
├── scripts/
│   ├── build.mjs                 # Generates static HTML into dist/
│   └── serve.mjs                 # Zero-dependency local preview server
├── src/
│   ├── data/
│   │   ├── media.mjs             # Image-slot manifest and curation notes
│   │   └── site.mjs              # Brand, service and content configuration
│   ├── app.js                    # WebGL field and interaction layer
│   ├── pages.mjs                 # Shared page-shell and route templates
│   └── styles.css                # Design system and responsive layout
├── vercel.json
├── netlify.toml
└── package.json
```
#   l a t e n t . l a b s . f u n k  
 