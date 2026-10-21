import { rm, mkdir, readFile, writeFile, cp, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPages } from '../src/pages.mjs';
import { SITE } from '../src/data/site.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');
const publicDir = path.join(root, 'public');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const page of getPages()) {
  const outPath = page.path === '/404'
    ? path.join(dist, '404.html')
    : page.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, page.path.replace(/^\//, ''), 'index.html');
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, page.html, 'utf8');
}

await cp(src, path.join(dist, 'src'), { recursive: true });
await cp(publicDir, dist, { recursive: true });
await copyFile(path.join(root, 'README.md'), path.join(dist, 'README.md')).catch(() => {});

const routes = ['/', '/work', '/about', '/privacy', '/terms', '/services/creative', '/services/convert', '/services/flow'];
const siteUrl = String(SITE.siteUrl || '').replace(/\/$/, '');
if (siteUrl && /^https:\/\//i.test(siteUrl)) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(p => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
} else {
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n# Configure siteUrl in src/data/site.mjs to generate sitemap.xml before launch.\n`, 'utf8');
}
console.log(`Built Latent Labs static site to ${dist}`);
console.log(`Generated ${getPages().length} routes, local artwork, styles and interaction scripts.`);
