// 一次性脚本：将 src/assets 下的 PNG/JPG 批量转换为 WebP（quality 80）
// 输出 .webp 到原文件同目录，原文件保留（不再被 import 后不会进入构建产物）
// 用法：node scripts/convert-webp.mjs
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ASSETS_DIR = fileURLToPath(new URL('../src/assets', import.meta.url));
const exts = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) yield* walk(full);
    else if (exts.has(extname(entry).toLowerCase())) yield { full, size: s.size };
  }
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for await (const { full, size } of walk(ASSETS_DIR)) {
  const out = full.replace(/\.(png|jpe?g)$/i, '.webp');
  await sharp(full).webp({ quality: 80 }).toFile(out);
  const outSize = (await stat(out)).size;
  totalBefore += size;
  totalAfter += outSize;
  count++;
  console.log(
    `${full.replace(ASSETS_DIR, '')}: ${(size / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`
  );
}

console.log(
  `\n共转换 ${count} 张：${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB（-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%）`
);
