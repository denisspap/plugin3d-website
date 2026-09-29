import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Pass the folder containing the original PNG images.');
await mkdir('public/projects', { recursive: true });
for (const file of await readdir(source)) {
  const match = file.match(/^(.+) \((\d+)\)\.png$/i);
  if (!match) continue;
  const name = `${match[1]}-${match[2]}`;
  await sharp(path.join(source, file)).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public/projects/${name}.webp`);
  await sharp(path.join(source, file)).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/projects/${name}-small.webp`);
  console.log(name);
}
await mkdir('public/tools', { recursive: true });
for (const name of ['pointfocus', 'proxybody', 'ezdepth']) await sharp(`work/product-assets/${name}.png`).webp({ quality: 90 }).toFile(`public/tools/${name}.webp`);
