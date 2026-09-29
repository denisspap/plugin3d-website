import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
async function walk(dir) { const result = []; for (const entry of await readdir(dir, { withFileTypes: true })) { const file = path.join(dir, entry.name); if (entry.isDirectory()) result.push(...await walk(file)); else if (file.endsWith('.html')) result.push(file); } return result; }
const files = await walk(root);
const errors = [];
let references = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    if (base && !url.startsWith(base + '/')) { errors.push(`${file}: wrong base path ${url}`); continue; }
    const local = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
    let target = path.join(root, local);
    try { if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html'); await stat(target); references++; }
    catch { errors.push(`${file}: missing ${url}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${files.length} HTML pages, ${references} local asset/link references, base path "${base}".`);
