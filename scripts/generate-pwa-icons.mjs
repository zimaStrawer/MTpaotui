import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = `${root}/favicon.png`;
const output = `${root}/public/icons`;
const background = '#1b1d21';

async function createIcon(filename, canvasSize, logoSize) {
  const logo = await sharp(source)
    .resize(logoSize, logoSize, { fit: 'contain' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(`${output}/${filename}`);
}

await Promise.all([
  createIcon('pwa-192x192.png', 192, 148),
  createIcon('pwa-512x512.png', 512, 392),
  createIcon('pwa-maskable-512x512.png', 512, 300),
  createIcon('apple-touch-icon.png', 180, 138),
]);

console.log('PWA icons generated in public/icons');
