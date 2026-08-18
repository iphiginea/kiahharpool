import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = path.resolve('src/assets-hd');
const outputDir = path.resolve('public/images');

const images = [
  { name: 'duelcut-duel-hd.webp', expectedBytes: 41590 },
  { name: 'encore-duel-hd.webp', expectedBytes: 26164 },
  { name: 'encore-rankings-hd.webp', expectedBytes: 32294 },
];

await mkdir(outputDir, { recursive: true });
const available = await readdir(sourceDir);

for (const image of images) {
  const parts = available
    .filter((file) => file.startsWith(`${image.name}.b64.`))
    .sort();

  if (parts.length === 0) {
    throw new Error(`No encoded source parts found for ${image.name}`);
  }

  const encodedParts = await Promise.all(
    parts.map((file) => readFile(path.join(sourceDir, file), 'utf8')),
  );
  const base64 = encodedParts.join('').replace(/\s+/g, '');
  const bytes = Buffer.from(base64, 'base64');

  if (bytes.length !== image.expectedBytes) {
    throw new Error(
      `${image.name} decoded to ${bytes.length} bytes; expected ${image.expectedBytes}.`,
    );
  }

  if (
    bytes.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    bytes.subarray(8, 12).toString('ascii') !== 'WEBP'
  ) {
    throw new Error(`${image.name} did not decode to a valid WebP container.`);
  }

  await writeFile(path.join(outputDir, image.name), bytes);
  console.log(`Materialized ${image.name} (${bytes.length} bytes)`);
}
