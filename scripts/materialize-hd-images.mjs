import { copyFile } from 'node:fs/promises';
import path from 'node:path';

const imageDir = path.resolve('public/images');

const fallbacks = [
  ['duelcut-duel.webp', 'duelcut-duel-hd.webp'],
  ['encore-duel.webp', 'encore-duel-hd.webp'],
  ['encore-rankings.webp', 'encore-rankings-hd.webp'],
];

for (const [source, target] of fallbacks) {
  await copyFile(path.join(imageDir, source), path.join(imageDir, target));
  console.log(`Prepared ${target} from ${source}`);
}
