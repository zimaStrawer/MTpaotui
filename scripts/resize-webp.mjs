// 一次性脚本：按 2x 显示宽度对超大 webp 原地降采样（文件名不变，import 无需修改）
// 用法：node scripts/resize-webp.mjs
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ASSETS = fileURLToPath(new URL('../src/assets', import.meta.url));

// 目标宽 = 组件中实际显示宽（CSS px）× 2（DPR），已逐个核实消费组件
const TARGETS = [
  ['home/hero-express-mascot.webp', 420], // HeroPromo 显示 201px
  ['home/hero-art-mascot.webp', 600], // HeroPromo 显示 294px
  ['home/extra-service-icons.webp', 620], // AdditionalServices 雪碧图显示 310px
  ['address/map-pickup.webp', 750], // MapPreview/OrderMap 满铺 375px
  ['address/map-delivery.webp', 750], // 同上
  ['tracking/map-clear.webp', 830], // TrackingMap 显示约 411px（100%+36px）
  ['tracking/courier-scooter.webp', 260], // CourierSprite 显示 128px
  ['tracking/proof-delivery-confirmed.webp', 200], // 凭证缩略图 48px
  ['tracking/proof-pickup-confirmed.webp', 200],
  ['tracking/proof-delivery.webp', 200],
  ['tracking/proof-pickup.webp', 200],
  ['tracking/courier-avatar.webp', 560], // 雪碧裁剪显示约 280px
  ['item-info/photo-delivery-box.webp', 250], // VolumeCard 显示 122px
  ['item-info/photo-bouquet.webp', 150], // TypeSummaryCard 缩略图 48px
  ['item-info/illust-courier-default.webp', 200], // VolumeIllustration SVG image 85px
  ['item-info/illust-courier-large.webp', 200],
  ['item-info/illust-courier.webp', 200],
  ['item-info/illust-box-ref.webp', 150], // VolumeIllustration SVG image 56px
  ['showcase/iphone-16-pro-black-titanium.webp', 1200], // showcase 桌面展示页机框
];

let totalBefore = 0;
let totalAfter = 0;

for (const [rel, width] of TARGETS) {
  const file = `${ASSETS}/${rel}`;
  const before = (await stat(file)).size;
  const buf = await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  await sharp(buf).toFile(file);
  const after = (await stat(file)).size;
  totalBefore += before;
  totalAfter += after;
  console.log(`${rel}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

console.log(
  `\n合计: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB（-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%）`
);
