import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.webp':'image/webp', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.txt':'text/plain' };
http.createServer(async (req, res) => {
  try {
    let url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (base && !(url === base || url.startsWith(base + '/'))) { res.writeHead(404).end(); return; }
    url = base ? url.slice(base.length) : url;
    let file = path.resolve(root, '.' + url);
    if (!(file === root || file.startsWith(root + path.sep))) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(body);
  } catch { res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(await readFile(path.join(root, '404.html')).catch(() => 'Not found')); }
}).listen(4173, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:4173${base}/`));
