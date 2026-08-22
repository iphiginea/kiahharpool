import path from 'node:path';
import sharp from 'sharp';

const imageDir = path.resolve('public/images');

const renditions = [
  { source: 'duelcut-duel.webp', target: 'duelcut-duel-hd.webp', width: 1200 },
  { source: 'encore-duel.webp', target: 'encore-duel-hd.webp', width: 1260 },
  { source: 'encore-rankings.webp', target: 'encore-rankings-hd.webp', width: 1260 },
];

for (const { source, target, width } of renditions) {
  const sourcePath = path.join(imageDir, source);
  const targetPath = path.join(imageDir, target);

  await sharp(sourcePath)
    .resize({
      width,
      fit: 'inside',
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen()
    .webp({ lossless: true, effort: 4 })
    .toFile(targetPath);

  console.log(`Prepared retina rendition ${target} at ${width}px wide from ${source}`);
}
