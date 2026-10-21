import http from 'node:http';
import { createReadStream, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', process.argv[2] || 'dist');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8'
};
const notFound = path.join(root, '404.html');

http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  let candidate = path.resolve(root, `.${pathname}`);
  if (!candidate.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (existsSync(candidate) && statSync(candidate).isDirectory()) candidate = path.join(candidate, 'index.html');
  if (!existsSync(candidate) || !statSync(candidate).isFile()) {
    if (pathname.endsWith('/') && existsSync(path.join(root, pathname, 'index.html'))) candidate = path.join(root, pathname, 'index.html');
    else {
      if (existsSync(notFound)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        createReadStream(notFound).pipe(res);
      } else { res.writeHead(404); res.end('Not found'); }
      return;
    }
  }
  const ext = path.extname(candidate).toLowerCase();
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' };
  if (['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(ext)) headers['Cache-Control'] = 'public, max-age=604800, stale-while-revalidate=86400';
  res.writeHead(200, headers);
  createReadStream(candidate).pipe(res);
}).listen(port, () => console.log(`Latent Labs preview: http://localhost:${port}`));
