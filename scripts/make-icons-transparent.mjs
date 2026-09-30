/* One-off script: converts the white-background JPG icons in public/icons
   to transparent PNGs (white -> alpha). Run: node scripts/make-icons-transparent.mjs */
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('public/icons');
const files = await readdir(dir);

for (const file of files.filter((f) => f.endsWith('.jpg'))) {
  const src = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.jpg$/, '.png'));

  const img = sharp(src);
  const { width, height } = await img.metadata();
  const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // alpha = 255 - luminance-ish whiteness: white (255,255,255) -> 0, dark -> 255
  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const whiteness = Math.min(r, g, b); // 255 for pure white
    alpha[i] = 255 - whiteness;
  }

  await sharp(src)
    .ensureAlpha()
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(out);

  console.log(`✓ ${file} -> ${path.basename(out)}`);
}
